from services.llm import call_llm_json

def generate_insights(text: str, competitors: list, url: str):

    prompt = f"""
    Analyze the content for competitors: {competitors}

    Extract:
    - Themes
    - Insights
    - Impact on business
    - Threat level (Low, Medium, High)

    STRICT JSON:
    {{
      "themes": [
        {{
          "name": "",
          "insights": [
            {{
              "statement": "",
              "evidence": "",
              "impact_on_business": "",
              "threat_level": ""
            }}
          ]
        }}
      ]
    }}

    Content:
    {text[:6000]}
    """

    result = call_llm_json(prompt)

    for theme in result.get("themes", []):
        for insight in theme.get("insights", []):
            insight["source_url"] = url

    return result