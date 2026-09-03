import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp4");
  const [quality, setQuality] = useState("1080p");

  const handleDownload = () => {
    if (!url.trim()) {
      return;
    }

    console.log({
      url,
      format,
      quality,
    });

    // Plus tard :
    // appel à l'API FastAPI
  };

  return (
    <main className="app">
      <div className="download-container">
        <h1>Video Downloader</h1>

        <p className="subtitle">
          Télécharge une vidéo dans le format et la qualité de ton choix.
        </p>

        <div className="form">
          <input
            type="url"
            placeholder="Colle ton lien ici..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <div className="options">
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option value="mp4">MP4</option>
              <option value="mp3">MP3</option>
            </select>

            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
            >
              <option value="360p">360p</option>
              <option value="480p">480p</option>
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
              <option value="1440p">1440p</option>
              <option value="2160p">2160p (4K)</option>
            </select>
          </div>

          <button
            onClick={handleDownload}
            disabled={!url.trim()}
          >
            Télécharger
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;