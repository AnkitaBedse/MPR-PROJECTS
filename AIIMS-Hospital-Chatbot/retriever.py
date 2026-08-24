# retriever.py
import numpy as np
import torch
import torch.nn.functional as F


def retrieve_top_k(query: str, embedder, embeddings: np.ndarray, qa_data, k: int = 3) -> list:
    """
    Given a raw query string, encode it with the embedder,
    compute cosine similarity against the domain's embedding index,
    and return the top-k matching Q&A rows as a list of dicts.

    Args:
        query      : raw user query string
        embedder   : loaded SentenceTransformer instance
        embeddings : np.ndarray of shape (N, 384) for the domain
        qa_data    : pd.DataFrame with columns [question, answer, topic]
        k          : number of top matches to return (default 3)

    Returns:
        list of dicts with keys: question, answer, topic, similarity
    """
    # Encode the query to a 384-dim vector
    query_emb = embedder.encode([query], convert_to_numpy=True)

    # Convert to tensors and normalise for cosine similarity
    q_tensor = F.normalize(torch.tensor(query_emb,    dtype=torch.float32), dim=-1)
    k_tensor = F.normalize(torch.tensor(embeddings,   dtype=torch.float32), dim=-1)

    # Cosine similarity: (1, 384) x (N, 384).T → (1, N)
    sims     = torch.matmul(q_tensor, k_tensor.T).squeeze(0)
    top_idx  = torch.topk(sims, k=k).indices.tolist()

    return [
        {
            'question'   : qa_data.iloc[i]['question'],
            'answer'     : qa_data.iloc[i]['answer'],
            'topic'      : qa_data.iloc[i]['topic'],
            'similarity' : round(sims[i].item(), 4)
        }
        for i in top_idx
    ]


def build_prompt(query: str, context_hits: list) -> str:
    """
    Build the BioBART input prompt from the query and retrieved contexts.
    Matches exactly the format used during training.

    Args:
        query        : raw user query string
        context_hits : list of dicts returned by retrieve_top_k

    Returns:
        prompt string ready to tokenise and feed to BioBART
    """
    context_str = ' '.join([
        f"Context {i + 1}: {hit['answer']}"
        for i, hit in enumerate(context_hits)
    ])
    return (
        f"Question: {query} "
        f"{context_str} "
        f"Compose a helpful hospital admin answer:"
    )