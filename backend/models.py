from pydantic import BaseModel
from typing import List, Dict

class Insight(BaseModel):
    statement: str
    evidence: str
    source_url: str
    impact_on_business: str
    threat_level: str
    verification: Dict = None

class Theme(BaseModel):
    name: str
    insights: List[Insight]

class FinalReport(BaseModel):
    themes: List[Theme]