// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [competitors, setCompetitors] = useState("");
//   const [urls, setUrls] = useState("");
//   const [data, setData] = useState(null);

//   const handleSubmit = async () => {
//     const res = await axios.post("http://127.0.0.1:8000/analyze", {
//       competitors: competitors.split(","),
//       urls: urls.split(","),
//     });

//     setData(res.data);
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Market Intelligence Dashboard</h1>

//       <input
//         placeholder="Competitors (comma separated)"
//         onChange={(e) => setCompetitors(e.target.value)}
//       />

//       <br /><br />

//       <textarea
//         placeholder="URLs (comma separated)"
//         onChange={(e) => setUrls(e.target.value)}
//       />

//       <br /><br />

//       <button onClick={handleSubmit}>Analyze</button>

//       {data && data.themes.map((theme, i) => (
//         <div key={i}>
//           <h2>{theme.name}</h2>

//           {theme.insights.map((insight, j) => (
//             <div key={j} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
//               <p><b>Insight:</b> {insight.statement}</p>
//               <p><b>Impact:</b> {insight.impact_on_business}</p>
//               <p><b>Threat:</b> {insight.threat_level}</p>
//               <p><b>Source:</b> {insight.source_url}</p>
//               <p><b>Verification:</b> {insight.verification?.verdict}</p>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [competitors, setCompetitors] = useState("");
  const [urls, setUrls] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setData(null);

    try {
      const res = await axios.post("https://progress-software.onrender.com/analyze", {
        competitors: competitors.split(",").map(c => c.trim()),
        urls: urls.split(",").map(u => u.trim()),
      });

      setData(res.data);
    } catch (err) {
      alert("Error connecting to backend");
    }

    setLoading(false);
  };

  const getThreatColor = (level) => {
    if (!level) return "#999";
    if (level.toLowerCase() === "high") return "#ff4d4f";
    if (level.toLowerCase() === "medium") return "#faad14";
    return "#52c41a";
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "30px", background: "#f5f7fa" }}>
      
      <h1 style={{ textAlign: "center" }}>📊 Market Intelligence Dashboard</h1>

      {/* Input Section */}
      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <input
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          placeholder="Competitors (comma separated)"
          onChange={(e) => setCompetitors(e.target.value)}
        />

        <textarea
          style={{ width: "100%", padding: "10px", height: "80px" }}
          placeholder="URLs (comma separated)"
          onChange={(e) => setUrls(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            background: "#1890ff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Analyze
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p style={{ textAlign: "center" }}>⏳ Analyzing data... please wait</p>
      )}

      {/* Results */}
      {data && data.themes.map((theme, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          
          <h2 style={{ borderBottom: "2px solid #ddd" }}>{theme.name}</h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "15px"
          }}>
            
            {theme.insights.map((insight, j) => (
              <div key={j} style={{
                background: "white",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}>
                
                <p><b>💡 Insight:</b> {insight.statement}</p>
                <p><b>📈 Impact:</b> {insight.impact_on_business}</p>

                <p>
                  <b>⚠️ Threat:</b>{" "}
                  <span style={{
                    color: "white",
                    background: getThreatColor(insight.threat_level),
                    padding: "3px 8px",
                    borderRadius: "5px"
                  }}>
                    {insight.threat_level}
                  </span>
                </p>

                <p><b>🔗 Source:</b> 
                  <a href={insight.source_url} target="_blank" rel="noreferrer">
                    {" "}View
                  </a>
                </p>

                <p>
                  <b>✅ Verification:</b>{" "}
                  {insight.verification?.verdict}
                </p>

              </div>
            ))}
          </div>
        </div>
      ))}

    </div>
  );
}

export default App;