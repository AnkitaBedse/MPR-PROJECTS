# chatbot.py

import gc
import torch

from model_loader import (
    load_router,
    load_embedder,
    load_domain_model,
    load_domain_index
)

from retriever import retrieve_top_k, build_prompt


class HospitalChatbot:
    """
    Core chatbot class for the AIIMS Micromodel system.

    Pipeline:
        Query
          ↓
        Department Router
          ↓
        Load selected department model
          ↓
        Retrieve top-k Q&A contexts
          ↓
        Build prompt
          ↓
        Generate answer

    Memory optimization:
        Only ONE BioBART department model is kept in memory.
        When the user switches department, the previous model
        is unloaded before the new one is loaded.
    """

    def __init__(self):

        print("\n══════════════════════════════════════════════════════")
        print("  AIIMS Hospital Chatbot — Initialising")
        print("══════════════════════════════════════════════════════")

        # Lightweight components
        self.router, self.le = load_router()
        self.embedder = load_embedder()

        # Only one department model is kept in memory.
        self._active_domain = None
        self._active_assets = None

        print(
            "\n✅ Chatbot ready — "
            "department models load on first query"
        )

        print(
            "✅ Memory mode: single-domain model cache"
        )

        print("══════════════════════════════════════════════════════\n")

    # ─────────────────────────────────────────────────────────────────────────
    # Routing
    # ─────────────────────────────────────────────────────────────────────────

    def _route(self, query: str) -> str:
        """
        Convert the query into an embedding and classify
        it into one of the five hospital departments.
        """

        embedding = self.embedder.encode(
            [query],
            convert_to_numpy=True
        )

        prediction = self.router.predict(embedding)

        department = self.le.inverse_transform(
            prediction
        )[0]

        return department

    # ─────────────────────────────────────────────────────────────────────────
    # Model cache handling
    # ─────────────────────────────────────────────────────────────────────────

    def _clear_domain_cache(self):
        """
        Remove the currently loaded department model from memory.
        """

        if self._active_assets is None:
            return

        domain = self._active_domain

        print(
            f"\n[Chatbot] Unloading '{domain}' model "
            "to free memory..."
        )

        model, tokenizer, embeddings, qa_data = (
            self._active_assets
        )

        # Move CUDA model back to CPU before deleting
        if torch.cuda.is_available():
            model.to("cpu")

        # Delete references
        del model
        del tokenizer
        del embeddings
        del qa_data
        del self._active_assets

        self._active_assets = None
        self._active_domain = None

        # Python garbage collection
        gc.collect()

        # Clear CUDA cache when applicable
        if torch.cuda.is_available():
            torch.cuda.empty_cache()

        print(
            f"✅ '{domain}' model unloaded"
        )

    # ─────────────────────────────────────────────────────────────────────────
    # Load selected department
    # ─────────────────────────────────────────────────────────────────────────

    def _get_domain_assets(self, domain: str):
        """
        Load a department's model and retrieval index.

        If the same department is already active, reuse it.

        If another department is active, unload it first.
        """

        # Already loaded
        if (
            self._active_domain == domain
            and self._active_assets is not None
        ):

            return self._active_assets

        # Another department is currently loaded
        if self._active_assets is not None:

            self._clear_domain_cache()

        print(
            f"\n[Chatbot] First query for "
            f"'{domain}' — loading model..."
        )

        # Load BioBART model + tokenizer
        model, tokenizer = load_domain_model(domain)

        # Load embeddings + Q&A data
        embeddings, qa_data = load_domain_index(domain)

        self._active_domain = domain

        self._active_assets = (
            model,
            tokenizer,
            embeddings,
            qa_data
        )

        print(
            f"[Chatbot] '{domain}' model cached "
            "for this session.\n"
        )

        return self._active_assets

    # ─────────────────────────────────────────────────────────────────────────
    # Generation
    # ─────────────────────────────────────────────────────────────────────────

    def _generate(
        self,
        prompt: str,
        model,
        tokenizer
    ) -> str:
        """
        Generate an answer using the selected BioBART model.
        """

        # Get the actual device of the model
        device = next(
            model.parameters()
        ).device

        inputs = tokenizer(
            prompt,
            max_length=1024,
            truncation=True,
            return_tensors="pt"
        ).to(device)

        with torch.no_grad():

            output = model.generate(
                input_ids=inputs["input_ids"],
                attention_mask=inputs["attention_mask"],
                max_new_tokens=256,
                num_beams=4,
                early_stopping=True,
                no_repeat_ngram_size=3,
                length_penalty=1.0
            )

        return tokenizer.decode(
            output[0],
            skip_special_tokens=True
        )

    # ─────────────────────────────────────────────────────────────────────────
    # Public API
    # ─────────────────────────────────────────────────────────────────────────

    def ask(self, query: str) -> dict:
        """
        Full chatbot pipeline.

        Args:
            query: User's raw question.

        Returns:
            Dictionary containing:
                department
                answer
                context
        """

        if not query or not query.strip():

            return {
                "department": "",
                "answer": "Please enter a question.",
                "context": []
            }

        query = query.strip()

        # 1. Route question
        department = self._route(query)

        # 2. Load department assets
        model, tokenizer, embeddings, qa_data = (
            self._get_domain_assets(
                department
            )
        )

        # 3. Retrieve top-3 relevant Q&A entries
        context_hits = retrieve_top_k(
            query,
            self.embedder,
            embeddings,
            qa_data,
            k=3
        )

        # 4. Build BioBART prompt
        prompt = build_prompt(
            query,
            context_hits
        )

        # 5. Generate answer
        answer = self._generate(
            prompt,
            model,
            tokenizer
        )

        return {
            "department": department,
            "answer": answer,
            "context": context_hits
        }

    # ─────────────────────────────────────────────────────────────────────────
    # Cleanup
    # ─────────────────────────────────────────────────────────────────────────

    def cleanup(self):
        """
        Manually unload the active department model.
        Useful when shutting down a server.
        """

        self._clear_domain_cache()