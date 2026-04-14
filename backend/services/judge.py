from services.llm import call_llm_json

def verify_insight(statement: str, evidence: str):

    prompt = f"""
    You are a strict fact checker.

    Claim: {statement}
    Evidence: {evidence}

    Return:
    {{
      "verdict": "SUPPORTED or NOT_SUPPORTED",
      "confidence": 0-1
    }}
    """

    return call_llm_json(prompt)