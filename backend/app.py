from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

from services.scraper import extract_content
from services.analyzer import generate_insights
from services.judge import verify_insight
from services.aggregator import merge_results

from fastapi.middleware.cors import CORSMiddleware

import os
import uvicorn


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequestModel(BaseModel):
    competitors: List[str]
    urls: List[str]

@app.get("/")
def home():
    return {"message": "Market Intelligence API running"}

@app.post("/analyze")
def analyze(request: RequestModel):

    all_results = []

    for url in request.urls:
        text = extract_content(url)

        insights = generate_insights(text, request.competitors, url)

        for theme in insights.get("themes", []):
            for insight in theme.get("insights", []):
                insight["verification"] = verify_insight(
                    insight["statement"],
                    insight["evidence"]
                )

        all_results.append(insights)

    final_report = merge_results(all_results)

    return final_report

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))  # Render provides PORT
    uvicorn.run(app, host="0.0.0.0", port=port)