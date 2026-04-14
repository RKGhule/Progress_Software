import requests
from bs4 import BeautifulSoup

def extract_content(url: str):
    try:
        headers = {"User-Agent": "Mozilla/5.0"}
        html = requests.get(url, headers=headers, timeout=10).text

        soup = BeautifulSoup(html, "html.parser")

        for tag in soup(["script", "style"]):
            tag.decompose()

        text = soup.get_text(separator=" ")
        return text[:8000]

    except Exception as e:
        return f"ERROR: {str(e)}"