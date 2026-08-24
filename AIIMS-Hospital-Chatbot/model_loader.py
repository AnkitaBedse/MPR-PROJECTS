# model_loader.py

import os
import pickle
import torch
import numpy as np
import pandas as pd

from pathlib import Path

from transformers import (
    BartForConditionalGeneration,
    BartTokenizer
)

from sentence_transformers import SentenceTransformer

from huggingface_hub import hf_hub_download


# ── Device ─────────────────────────────────────────────────────────────────────

# ── Device helper ──────────────────────────────────────────────────────────────

def get_device():
    """
    Determine the device only when it is actually needed.

    IMPORTANT:
    Do not call torch.cuda.is_available() at module import time
    because Hugging Face ZeroGPU must initialize `spaces` first.
    """
    return torch.device(
        "cuda" if torch.cuda.is_available() else "cpu"
    )


# ── Base Paths ─────────────────────────────────────────────────────────────────

# Automatically find the folder where this file is located.
# This keeps the project independent of any user's computer path.

PROJECT_DIR = Path(__file__).resolve().parent

# Local trained BioBART weights
WEIGHTS_DIR = PROJECT_DIR / "hospital_chatbot_models"

# Existing project model files
MODELS_DIR = PROJECT_DIR / "models"


# ── Hugging Face Model Repository ──────────────────────────────────────────────

# Repository containing the five trained BioBART weight files.
HF_MODEL_REPO = "ankitabedse/aiims-hospital-bart-models"


# ── BioBART Base Model ─────────────────────────────────────────────────────────

BART_MODEL_NAME = "GanjinZero/biobart-v2-base"


# ── Hugging Face Weight File Mapping ───────────────────────────────────────────

# These paths must exactly match the structure inside your
# Hugging Face model repository.

HF_WEIGHT_FILES = {

    "Admin":
        "admin/admin_biobart_weights.pt",

    "Billing":
        "billing/billing_biobart_weights.pt",

    "Doctor_Appointment":
        "doctor_appointment/da_biobart_weights.pt",

    "Emergency":
        "emergency/emergency_biobart_weights.pt",

    "Pharmacy":
        "pharmacy/pharma_biobart_weights.pt",
}


# ── All Local Project File Paths ───────────────────────────────────────────────

PATHS = {

    # ───────────── Router ─────────────

    "router": {

        "router": os.path.join(
            MODELS_DIR,
            "router",
            "hospital_router.pkl"
        ),

        "label_encoder": os.path.join(
            MODELS_DIR,
            "router",
            "hospital_label_encoder.pkl"
        ),
    },


    # ───────────── Admin ─────────────

    "Admin": {

        "weights": os.path.join(
            WEIGHTS_DIR,
            "admin",
            "admin_biobart_weights.pt"
        ),

        "embeddings": os.path.join(
            MODELS_DIR,
            "admin",
            "admin_qa_embeddings.npy"
        ),

        "qa_data": os.path.join(
            MODELS_DIR,
            "admin",
            "admin_qa_data.csv"
        ),
    },


    # ───────────── Billing ─────────────

    "Billing": {

        "weights": os.path.join(
            WEIGHTS_DIR,
            "billing",
            "billing_biobart_weights.pt"
        ),

        "embeddings": os.path.join(
            MODELS_DIR,
            "billing",
            "billing_qa_embeddings.npy"
        ),

        "qa_data": os.path.join(
            MODELS_DIR,
            "billing",
            "billing_qa_data.csv"
        ),
    },


    # ───────────── Doctor Appointment ─────────────

    "Doctor_Appointment": {

        "weights": os.path.join(
            WEIGHTS_DIR,
            "doctor_appointment",
            "da_biobart_weights.pt"
        ),

        "embeddings": os.path.join(
            MODELS_DIR,
            "doctor_appointment",
            "da_qa_embeddings.npy"
        ),

        "qa_data": os.path.join(
            MODELS_DIR,
            "doctor_appointment",
            "da_qa_data.csv"
        ),
    },


    # ───────────── Emergency ─────────────

    "Emergency": {

        "weights": os.path.join(
            WEIGHTS_DIR,
            "emergency",
            "emergency_biobart_weights.pt"
        ),

        "embeddings": os.path.join(
            MODELS_DIR,
            "emergency",
            "emergency_qa_embeddings.npy"
        ),

        "qa_data": os.path.join(
            MODELS_DIR,
            "emergency",
            "emergency_qa_data.csv"
        ),
    },


    # ───────────── Pharmacy ─────────────

    "Pharmacy": {

        "weights": os.path.join(
            WEIGHTS_DIR,
            "pharmacy",
            "pharma_biobart_weights.pt"
        ),

        "embeddings": os.path.join(
            MODELS_DIR,
            "pharmacy",
            "pharma_qa_embeddings.npy"
        ),

        "qa_data": os.path.join(
            MODELS_DIR,
            "pharmacy",
            "pharma_qa_data.csv"
        ),
    },
}


# ── Resolve BioBART Weight Path ────────────────────────────────────────────────

def get_weights_path(domain: str) -> str:
    """
    Resolve the trained BioBART weight file.

    Priority:
        1. Use local .pt file if it exists.
        2. Otherwise download the required file from Hugging Face.

    This allows the same code to work:
        - locally on your PC
        - inside a Hugging Face Space
    """

    if domain not in HF_WEIGHT_FILES:
        raise ValueError(
            f"Unknown domain '{domain}'. "
            f"Expected one of: {list(HF_WEIGHT_FILES.keys())}"
        )

    # ── First try local model ──────────────────────────────────────────────────

    local_path = Path(PATHS[domain]["weights"])

    if local_path.exists():

        print(
            f"✅ Using local {domain} BioBART weights"
        )

        return str(local_path)


    # ── Otherwise download from Hugging Face ───────────────────────────────────

    print(
        f"\n⬇️ Local {domain} weights not found."
    )

    print(
        f"   Downloading from Hugging Face:"
    )

    print(
        f"   {HF_MODEL_REPO}"
    )

    downloaded_path = hf_hub_download(
        repo_id=HF_MODEL_REPO,
        filename=HF_WEIGHT_FILES[domain]
    )

    print(
        f"✅ {domain} weights downloaded"
    )

    print(
        f"   Cached path: {downloaded_path}"
    )

    return downloaded_path


# ── Verify All Paths Exist ─────────────────────────────────────────────────────

def verify_paths():

    print(
        "\n── Verifying all file paths "
        "──────────────────────────────────────"
    )

    print(
        "\nProject directory:"
    )

    print(
        f"  {PROJECT_DIR}"
    )

    print(
        "\nWeights directory:"
    )

    print(
        f"  {WEIGHTS_DIR}"
    )

    print(
        "\nModels directory:"
    )

    print(
        f"  {MODELS_DIR}"
    )

    all_ok = True


    for domain, path_dict in PATHS.items():

        for file_type, path in path_dict.items():

            exists = os.path.exists(path)


            # ── Special case: BioBART weights ──────────────────────────────────
            #
            # If a local .pt file doesn't exist, that's okay because
            # get_weights_path() can download it from Hugging Face.

            if (
                domain != "router"
                and file_type == "weights"
                and not exists
            ):

                print(
                    f"\n   ☁️ [HF FALLBACK] "
                    f"[{domain}] {file_type}"
                )

                print(
                    f"        Local file not found:"
                )

                print(
                    f"        {path}"
                )

                print(
                    f"        Will download from Hugging Face when needed."
                )

                continue


            status = "✅" if exists else "❌ MISSING"


            print(
                f"\n   {status} [{domain}] {file_type}"
            )

            print(
                f"        {path}"
            )


            if not exists:

                all_ok = False


    if all_ok:

        print(
            "\n✅ All required local files found"
        )

        print(
            "✅ Missing BioBART weights can be downloaded from Hugging Face"
        )

    else:

        print(
            "\n❌ Some required local files are missing."
        )

        print(
            "   Check the paths above."
        )


    return all_ok


# ── Load Router ────────────────────────────────────────────────────────────────

def load_router():

    print(
        "\n── Loading Router "
        "───────────────────────────────────────────────"
    )


    with open(
        PATHS["router"]["router"],
        "rb"
    ) as f:

        router = pickle.load(f)


    with open(
        PATHS["router"]["label_encoder"],
        "rb"
    ) as f:

        le = pickle.load(f)


    print(
        "✅ Router loaded"
    )

    print(
        "✅ Label Encoder loaded"
    )

    print(
        f"   Classes : {le.classes_}"
    )


    return router, le


# ── Load Embedder ──────────────────────────────────────────────────────────────

def load_embedder():

    print(
        "\n── Loading Embedder "
        "─────────────────────────────────────────────"
    )


    embedder = SentenceTransformer(
        "all-MiniLM-L6-v2"
    )


    print(
        "✅ Embedder loaded"
    )


    return embedder


# ── Load Domain Model ─────────────────────────────────────────────────────────

def load_domain_model(domain):

    print(
        f"\n── Loading {domain} Model "
        "────────────────────────────────────────"
    )

    device = get_device()

    print(f"Model device: {device}")

    model = BartForConditionalGeneration.from_pretrained(
        BART_MODEL_NAME
    )

    weights_path = get_weights_path(domain)

    print(
        f"Loading trained {domain} weights..."
    )

    model.load_state_dict(
        torch.load(
            weights_path,
            map_location=device
        )
    )

    model.to(device)
    model.eval()

    print(
        f"✅ {domain} BioBART weights loaded"
    )

    tokenizer = BartTokenizer.from_pretrained(
        BART_MODEL_NAME
    )

    print(
        f"✅ {domain} Tokenizer loaded"
    )

    return model, tokenizer

# ── Load Domain Index ─────────────────────────────────────────────────────────

def load_domain_index(domain):

    print(
        f"\n── Loading {domain} Index "
        "───────────────────────────────────────"
    )


    # ── Load embeddings ────────────────────────────────────────────────────────

    embeddings = np.load(
        PATHS[domain]["embeddings"]
    )


    print(
        f"✅ {domain} embeddings loaded "
        f"— shape {embeddings.shape}"
    )


    # ── Load Q&A data ──────────────────────────────────────────────────────────

    qa_data = pd.read_csv(
        PATHS[domain]["qa_data"]
    )


    print(
        f"✅ {domain} Q&A data loaded "
        f"— {len(qa_data)} rows"
    )


    # ── Validate row count ─────────────────────────────────────────────────────

    assert embeddings.shape[0] == len(qa_data), (

        f"❌ MISMATCH — embeddings "
        f"{embeddings.shape[0]} rows "

        f"vs qa_data "
        f"{len(qa_data)} rows"
    )


    return embeddings, qa_data


# ── Quick Test ─────────────────────────────────────────────────────────────────

if __name__ == "__main__":

    print(
        "══════════════════════════════════════════════════════"
    )

    print(
        "  model_loader.py — Path Verification Test"
    )

    print(
        "══════════════════════════════════════════════════════"
    )


    # ── Check required paths ───────────────────────────────────────────────────

    paths_ok = verify_paths()


    if not paths_ok:

        print(
            "\n❌ Cannot continue because some required files "
            "are missing."
        )

        print(
            "Please check the paths above."
        )

        raise SystemExit(1)


    # ── Test Router Load ───────────────────────────────────────────────────────

    print(
        "\n── Testing Router Load "
        "───────────────────────────────────────────"
    )


    router, le = load_router()


    # ── Test Embedder ──────────────────────────────────────────────────────────

    print(
        "\n── Testing Embedder Load "
        "────────────────────────────────────────"
    )


    embedder = load_embedder()


    # ── Test Admin Index ───────────────────────────────────────────────────────

    print(
        "\n── Testing Index Load (Admin) "
        "───────────────────────────────────"
    )


    embeddings, qa_data = load_domain_index(
        "Admin"
    )


    print(
        "\n══════════════════════════════════════════════════════"
    )

    print(
        "  All tests passed — model_loader.py is ready"
    )

    print(
        "══════════════════════════════════════════════════════"
    )