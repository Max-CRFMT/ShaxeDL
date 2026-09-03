from fastapi import FastAPI
import yt_dlp
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class DownloadRequest(BaseModel):
    url: str
    format: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/download")
def Download(request: DownloadRequest, output_path=Path.home()/"Downloads") :
    print(request.url)
    print(request.format)
    
    if request.format == "mp4" :
        ydl_options = {
            'outtmpl': f'{output_path}/%(title)s.%(ext)s',
            "merge_output_format": f"{request.format}"
        }
    
    else :
        ydl_options = {
            "format": "bestaudio/best",
            "outtmpl": f"{output_path}/%(title)s.%(ext)s",
            "postprocessors": [
                {
                    "key": "FFmpegExtractAudio",
                    "preferredcodec": "mp3",
                    "preferredquality": "320",
                }
            ],
        }

    with yt_dlp.YoutubeDL(ydl_options) as ydl :
        ydl.download([request.url])
    
    return {
        "success":True,
        "message":"Téléchargement terminé."
    }