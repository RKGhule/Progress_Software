# 📊 GenAI Market Intelligence Platform

A full-stack GenAI application that helps Product and GTM teams track competitor activity and market trends by analyzing publicly available content from blogs, news, and announcements.

![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-3.png)













---

## 🚀 Live Demo

- 🌐 Frontend: https://your-app.vercel.app  
- ⚙️ Backend API: https://your-backend.onrender.com/docs  

---

## 🧠 Problem Statement

Product and GTM teams struggle to stay updated on competitor activity because relevant information is scattered across multiple sources.

This platform aggregates, analyzes, and summarizes market intelligence into structured, actionable insights.

---

## ✨ Features

- 🔍 Multi-source data ingestion (blogs, articles, announcements)
- 🧠 AI-powered insight generation using OpenAI
- 📊 Thematic grouping of market trends
- 🏢 Competitor activity tracking
- 📈 Business impact analysis
- ⚠️ Threat level classification (Low / Medium / High)
- ✅ Hallucination detection using LLM-as-a-judge
- 🌐 Interactive dashboard UI

---

## 🏗️ Architecture

1. **Data Ingestion**
   - Fetch content from multiple URLs

2. **Processing**
   - Clean and prepare text data

3. **LLM Analysis**
   - Generate structured insights (themes, activities, impacts)

4. **Validation Layer**
   - LLM verifies insights against source content

5. **Frontend Dashboard**
   - Displays insights in structured format

---

## 🛠️ Tech Stack

- **Backend:** FastAPI (Python)
- **Frontend:** React (JavaScript)
- **AI Models:** OpenAI GPT
- **Web Scraping:** BeautifulSoup, Requests
- **Deployment:**
  - Backend → Render
  - Frontend → Vercel

---

## 📂 Project Structure
project-root/
│
├── backend/
│ ├── app.py
│ ├── requirements.txt
│
├── frontend/
│ ├── src/
│ ├── public/
│
└── README.md


---

## ⚙️ Setup Instructions

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload

cd frontend
npm install
npm start

#Create your own .env file for OPEN API KEY
OPENAI_API_KEY=your_api_key_here

#Example Input
{
  "competitors": ["Databricks", "ServiceNow"],
  "urls": [
    "https://venturebeat.com/category/ai/",
    "https://www.databricks.com/blog"
  ]
}