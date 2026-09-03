@echo off
setlocal

title YouTube Downloader

echo ========================================
echo        YouTube Downloader
echo ========================================
echo.

REM ========================================
REM Vérification de Python
REM ========================================

echo [1/6] Verification de Python...

python --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERREUR : Python n'est pas installe.
    echo Installe Python depuis https://www.python.org/
    echo.
    pause
    exit /b 1
)

echo Python OK
echo.

REM ========================================
REM Vérification de Node.js
REM ========================================

echo [2/6] Verification de Node.js...

node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERREUR : Node.js n'est pas installe.
    echo Installe Node.js depuis https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Node.js OK
echo.

REM ========================================
REM Vérification de FFmpeg
REM ========================================

echo [3/6] Verification de FFmpeg...

ffmpeg -version >nul 2>&1

if errorlevel 1 (
    echo FFmpeg n'est pas installe.
    echo Installation de FFmpeg via winget...
    echo.

    winget install --id Gyan.FFmpeg.Shared -e

    if errorlevel 1 (
        echo.
        echo ERREUR : Impossible d'installer FFmpeg.
        echo Installe-le manuellement puis relance le script.
        echo.
        pause
        exit /b 1
    )

    echo.
    echo FFmpeg vient d'etre installe.
    echo Ferme puis relance ce script si FFmpeg n'est pas encore reconnu.
    echo.
) else (
    echo FFmpeg OK
)

echo.

REM ========================================
REM Création de l'environnement Python
REM ========================================

echo [4/6] Preparation de Python...

if not exist "venv\Scripts\python.exe" (
    echo Creation de l'environnement virtuel...
    python -m venv venv

    if errorlevel 1 (
        echo.
        echo ERREUR : Impossible de creer le venv.
        pause
        exit /b 1
    )
)

echo Installation des dependances Python...

venv\Scripts\python.exe -m pip install --upgrade pip >nul
venv\Scripts\python.exe -m pip install -r backend\requirements.txt

if errorlevel 1 (
    echo.
    echo ERREUR : Installation des dependances Python impossible.
    pause
    exit /b 1
)

echo Dependances Python OK
echo.

REM ========================================
REM Installation des dépendances Frontend
REM ========================================

echo [5/6] Preparation du frontend...

if not exist "frontend\node_modules" (
    echo Installation des dependances npm...
    cd frontend
    call npm install

    if errorlevel 1 (
        echo.
        echo ERREUR : npm install a echoue.
        cd ..
        pause
        exit /b 1
    )

    cd ..
) else (
    echo node_modules deja present.
)

echo Frontend OK
echo.

REM ========================================
REM Lancement
REM ========================================

echo [6/6] Lancement de l'application...
echo.

echo Demarrage du backend...
start "Downloader - Backend" cmd /k "cd /d %~dp0backend && ..\venv\Scripts\python.exe -m uvicorn main:app --reload"

echo Demarrage du frontend...
start "Downloader - Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Serveurs en cours de demarrage...
echo.

REM Attente du démarrage de Vite
timeout /t 3 /nobreak >nul

echo Ouverture du navigateur...
start http://localhost:5173

echo.
echo ========================================
echo Application lancee !
echo.
echo Frontend : http://localhost:5173
echo Backend  : http://127.0.0.1:8000
echo ========================================
echo.
echo Tu peux fermer cette fenetre.
echo Les deux autres fenetres contiennent les serveurs.
echo.

exit /b 0