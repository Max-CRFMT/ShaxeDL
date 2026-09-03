from fastapi import FastAPI
import yt_dlp
 

app = FastAPI()

@app.get("/download")
def Download(url:str, output_path='downloaded_videos') :
    ydl_options = {
        'outtmpl': f'{output_path}/%(title)s.%(ext)s',
        
    }

    with yt_dlp.YoutubeDL(ydl_options) as ydl :
        ydl.download([url])
    
    return None