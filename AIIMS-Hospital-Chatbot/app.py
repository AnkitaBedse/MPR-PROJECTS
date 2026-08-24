import spaces
import gradio as gr

from chatbot import HospitalChatbot



# ─────────────────────────────────────────────────────────────────────────────
# Load chatbot once when the application starts
# ─────────────────────────────────────────────────────────────────────────────

print("Starting AIIMS Hospital Chatbot...")

chatbot = HospitalChatbot()

print("✅ Web chatbot initialized")


# ─────────────────────────────────────────────────────────────────────────────
# Chat function
# ─────────────────────────────────────────────────────────────────────────────

@spaces.GPU
def ask_chatbot(message, history):
    if not message or not message.strip():
        return "Please enter a question."

    try:
        result = chatbot.ask(message.strip())

        department = result["department"]
        answer = result["answer"]

        return (
            f"**Department:** {department}\n\n"
            f"**Answer:** {answer}"
        )

    except Exception as e:
        print(f"Error: {e}")

        return (
            "Sorry, something went wrong while processing your question.\n\n"
            f"Error: `{str(e)}`"
        )

# ─────────────────────────────────────────────────────────────────────────────
# Gradio UI
# ─────────────────────────────────────────────────────────────────────────────

description = """
### AIIMS Hospital Query System

Ask questions related to hospital administration, billing,
doctor appointments, emergency services, or pharmacy.

The system uses a department router and specialized BioBART
models to generate domain-specific answers.
"""


demo = gr.ChatInterface(
    fn=ask_chatbot,
    title="🏥 AIIMS Hospital Chatbot",
    description=description,
    examples=[
        "What are the hospital visiting hours?",
        "How can I pay my hospital bill?",
        "How do I book a doctor appointment?",
        "What should I do during an emergency?",
        "How can I get medicines from the pharmacy?"
    ],
)


# ─────────────────────────────────────────────────────────────────────────────
# Start application
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    demo.launch()