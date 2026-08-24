# main.py
import threading
import tkinter as tk
from tkinter import scrolledtext
from chatbot import HospitalChatbot

# ── Colour palette ─────────────────────────────────────────────────────────────
BG_DARK      = "#0f1117"
BG_PANEL     = "#181c27"
BG_INPUT     = "#1e2233"
ACCENT       = "#3b82f6"
ACCENT_DARK  = "#1d4ed8"
TEXT_PRIMARY = "#e8eaf6"
TEXT_MUTED   = "#6b7280"
TEXT_ANSWER  = "#c7d2fe"

DEPT_COLOURS = {
    "Admin"              : "#10b981",
    "Billing"            : "#f59e0b",
    "Doctor_Appointment" : "#8b5cf6",
    "Emergency"          : "#ef4444",
    "Pharmacy"           : "#06b6d4",
}

DEPT_LABELS = {
    "Admin"              : "🏥  Admin",
    "Billing"            : "💳  Billing & Insurance",
    "Doctor_Appointment" : "🩺  Doctor & Appointment",
    "Emergency"          : "🚨  Emergency",
    "Pharmacy"           : "💊  Pharmacy",
}

FONT_BODY   = ("Segoe UI",       11)
FONT_BOLD   = ("Segoe UI",       11, "bold")
FONT_SMALL  = ("Segoe UI",        9)
FONT_DEPT   = ("Segoe UI",        9, "bold")
FONT_TITLE  = ("Segoe UI",       15, "bold")
FONT_INPUT  = ("Segoe UI",       11)


class AIMSChatApp:
    def __init__(self, root: tk.Tk):
        self.root    = root
        self.chatbot = None          # loaded in background thread
        self._setup_window()
        self._build_ui()
        self._start_chatbot_load()

    # ── Window setup ───────────────────────────────────────────────────────────
    def _setup_window(self):
        self.root.title("AIIMS Micromodel — Hospital Query System")
        self.root.geometry("820x680")
        self.root.minsize(640, 480)
        self.root.configure(bg=BG_DARK)
        self.root.resizable(True, True)

    # ── UI construction ────────────────────────────────────────────────────────
    def _build_ui(self):
        # ── Header ────────────────────────────────────────────────────────────
        header = tk.Frame(self.root, bg=BG_PANEL, pady=14)
        header.pack(fill="x", side="top")

        tk.Label(
            header, text="AIIMS Hospital Query System",
            font=FONT_TITLE, bg=BG_PANEL, fg=TEXT_PRIMARY
        ).pack(side="left", padx=20)

        self.status_label = tk.Label(
            header, text="● Initialising...",
            font=FONT_SMALL, bg=BG_PANEL, fg=TEXT_MUTED
        )
        self.status_label.pack(side="right", padx=20)

        # ── Chat display ───────────────────────────────────────────────────────
        chat_frame = tk.Frame(self.root, bg=BG_DARK)
        chat_frame.pack(fill="both", expand=True, padx=16, pady=(12, 0))

        self.chat_display = scrolledtext.ScrolledText(
            chat_frame,
            wrap        = tk.WORD,
            state       = tk.DISABLED,
            bg          = BG_PANEL,
            fg          = TEXT_PRIMARY,
            font        = FONT_BODY,
            relief      = tk.FLAT,
            borderwidth = 0,
            padx        = 16,
            pady        = 12,
            cursor      = "arrow",
        )
        self.chat_display.pack(fill="both", expand=True)

        # Text tags
        self.chat_display.tag_config("user_label", font=FONT_BOLD,   foreground=ACCENT)
        self.chat_display.tag_config("user_text",  font=FONT_BODY,   foreground=TEXT_PRIMARY)
        self.chat_display.tag_config("bot_label",  font=FONT_BOLD,   foreground=TEXT_MUTED)
        self.chat_display.tag_config("answer",     font=FONT_BODY,   foreground=TEXT_ANSWER)
        self.chat_display.tag_config("thinking",   font=FONT_BODY,   foreground=TEXT_MUTED)
        self.chat_display.tag_config("divider",    foreground=BG_INPUT)
        self.chat_display.tag_config("error",      foreground="#ef4444", font=FONT_BODY)

        # Department colour tags
        for dept, colour in DEPT_COLOURS.items():
            self.chat_display.tag_config(
                f"dept_{dept}", font=FONT_DEPT, foreground=colour
            )

        # ── Input area ────────────────────────────────────────────────────────
        input_frame = tk.Frame(self.root, bg=BG_DARK, pady=12)
        input_frame.pack(fill="x", padx=16, pady=(8, 12))

        self.input_box = tk.Text(
            input_frame,
            height      = 3,
            font        = FONT_INPUT,
            bg          = BG_INPUT,
            fg          = TEXT_PRIMARY,
            insertbackground = TEXT_PRIMARY,
            relief      = tk.FLAT,
            borderwidth = 0,
            wrap        = tk.WORD,
            padx        = 12,
            pady        = 8,
        )
        self.input_box.pack(side="left", fill="x", expand=True, ipady=2)
        self.input_box.bind("<Return>",       self._on_enter)
        self.input_box.bind("<Shift-Return>", self._on_shift_enter)

        self.send_btn = tk.Button(
            input_frame,
            text            = "Send",
            font            = FONT_BOLD,
            bg              = ACCENT,
            fg              = "#ffffff",
            activebackground= ACCENT_DARK,
            activeforeground= "#ffffff",
            relief          = tk.FLAT,
            borderwidth     = 0,
            padx            = 22,
            pady            = 8,
            cursor          = "hand2",
            command         = self._send_query,
            state           = tk.DISABLED,
        )
        self.send_btn.pack(side="right", padx=(10, 0))

        hint = tk.Label(
            self.root,
            text="Enter  →  Send      Shift+Enter  →  New line",
            font=FONT_SMALL, bg=BG_DARK, fg=TEXT_MUTED
        )
        hint.pack(pady=(0, 6))

    # ── Chatbot loading (background thread) ───────────────────────────────────
    def _start_chatbot_load(self):
        self._append_system("Loading router and embedder — please wait...")
        t = threading.Thread(target=self._load_chatbot_thread, daemon=True)
        t.start()

    def _load_chatbot_thread(self):
        try:
            self.chatbot = HospitalChatbot()
            self.root.after(0, self._on_chatbot_ready)
        except Exception as e:
            self.root.after(0, lambda: self._on_load_error(str(e)))

    def _on_chatbot_ready(self):
        self.status_label.config(text="● Ready", fg="#10b981")
        self.send_btn.config(state=tk.NORMAL)
        self.input_box.focus_set()
        self._append_system("System ready. Ask any AIIMS-related question below.")

    def _on_load_error(self, error_msg):
        self.status_label.config(text="● Error", fg="#ef4444")
        self._append_error(f"Failed to load chatbot: {error_msg}")

    # ── Sending a query ────────────────────────────────────────────────────────
    def _on_enter(self, event):
        self._send_query()
        return "break"          # prevent newline on plain Enter

    def _on_shift_enter(self, event):
        return None             # allow Shift+Enter to insert newline

    def _send_query(self):
        query = self.input_box.get("1.0", tk.END).strip()
        if not query or self.chatbot is None:
            return

        self.input_box.delete("1.0", tk.END)
        self.send_btn.config(state=tk.DISABLED)
        self.status_label.config(text="● Thinking...", fg=ACCENT)

        self._append_user(query)
        self._append_thinking("Routing query...")

        t = threading.Thread(
            target=self._query_thread,
            args=(query,),
            daemon=True
        )
        t.start()

    def _query_thread(self, query: str):
        try:
            result = self.chatbot.ask(query)
            self.root.after(0, lambda: self._on_response(result))
        except Exception as e:
            self.root.after(0, lambda: self._on_query_error(str(e)))

    def _on_response(self, result: dict):
        self._remove_thinking()
        self._append_response(result["department"], result["answer"])
        self.send_btn.config(state=tk.NORMAL)
        self.status_label.config(text="● Ready", fg="#10b981")
        self.input_box.focus_set()

    def _on_query_error(self, error_msg: str):
        self._remove_thinking()
        self._append_error(f"Error: {error_msg}")
        self.send_btn.config(state=tk.NORMAL)
        self.status_label.config(text="● Ready", fg="#10b981")

    # ── Chat display helpers ───────────────────────────────────────────────────
    def _write(self, text, tag=None, newline=True):
        self.chat_display.config(state=tk.NORMAL)
        if tag:
            self.chat_display.insert(tk.END, text + ("\n" if newline else ""), tag)
        else:
            self.chat_display.insert(tk.END, text + ("\n" if newline else ""))
        self.chat_display.config(state=tk.DISABLED)
        self.chat_display.see(tk.END)

    def _append_system(self, text: str):
        self._write(f"  {text}", "thinking")

    def _append_user(self, text: str):
        self._write("")
        self._write("  You", "user_label")
        self._write(f"  {text}", "user_text")

    def _append_thinking(self, text: str):
        self.chat_display.config(state=tk.NORMAL)
        self.chat_display.insert(tk.END, f"\n  {text}\n", "thinking")
        self._thinking_index = self.chat_display.index(tk.END)
        self.chat_display.config(state=tk.DISABLED)
        self.chat_display.see(tk.END)

    def _remove_thinking(self):
        """Delete the last 'Routing query...' line before writing the answer."""
        try:
            self.chat_display.config(state=tk.NORMAL)
            end   = self.chat_display.index(tk.END)
            start = f"{float(self._thinking_index) - 1:.1f} linestart"
            self.chat_display.delete(start, end)
            self.chat_display.config(state=tk.DISABLED)
        except Exception:
            pass

    def _append_response(self, department: str, answer: str):
        dept_label = DEPT_LABELS.get(department, department)
        dept_tag   = f"dept_{department}"
        self._write("")
        self._write("  AIIMS", "bot_label", newline=False)
        self._write(f"   {dept_label}", dept_tag)
        self._write(f"  {answer}", "answer")
        self._write("  " + "─" * 72, "divider")

    def _append_error(self, text: str):
        self._write("")
        self._write(f"  {text}", "error")


# ── Entry point ────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    root = tk.Tk()
    app  = AIMSChatApp(root)
    root.mainloop()