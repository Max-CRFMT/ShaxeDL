import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp4");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  const handleDownload = async () => {
    const videoId = url.trim();

    if (!videoId) {
      setMessage("Entre un identifiant YouTube.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: videoId,
          format: format,
        }),
      });

      if (!response.ok) {
        throw new Error("Le téléchargement a échoué.");
      }

      setMessage("Téléchargement lancé.");
    } catch (error) {
      console.error(error);

      setMessage(
        "Impossible de contacter le backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <button
        className="theme-button"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Changer de thème"
      >
        <span className="theme-icon">
          {darkMode ? "☀" : "☾"}
        </span>
      </button>

      <main className="main">
        <div className="brand">
          <div className="logo">
            ↓
          </div>

          <span>Downloader</span>
        </div>

        <section className="content">
          <h1>
            Télécharge ce que<br />
            tu veux, simplement.
          </h1>

          <p className="description">
            Entre un identifiant YouTube et choisis ton format.
          </p>

          <div className="form">
            <div className="input-section">
              <label htmlFor="youtube-id">
                Identifiant YouTube
              </label>

              <input
                id="youtube-id"
                type="text"
                placeholder="jIxs89D9MDY"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleDownload();
                  }
                }}
              />

              <span className="hint">
                Exemple : <strong>jIxs89D9MDY</strong> — uniquement
                l'identifiant, pas l'URL complète.
              </span>
            </div>

            <div className="format-section">
              <label htmlFor="format">
                Format
              </label>

              <select
                id="format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
              >
                <option value="mp4">MP4 — Vidéo</option>
                <option value="mp3">MP3 — Audio</option>
              </select>
            </div>

            <button
              className="download-button"
              onClick={handleDownload}
              disabled={loading || !url.trim()}
            >
              <span>
                {loading ? "Téléchargement..." : "Télécharger"}
              </span>

              {!loading && <span className="arrow">→</span>}
            </button>
          </div>

          {message && (
            <p className="message">
              {message}
            </p>
          )}
        </section>

        <footer>
          Backend par <strong>Le Légendaire Bytouille</strong>
        </footer>
      </main>
    </div>
  );
}

export default App;