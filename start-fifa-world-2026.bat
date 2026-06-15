@echo off
cd /d "%~dp0"

where python >nul 2>nul
if %errorlevel%==0 (
    start http://127.0.0.1:8026/
    python -m http.server 8026 --bind 127.0.0.1
    goto end
)

where py >nul 2>nul
if %errorlevel%==0 (
    start http://127.0.0.1:8026/
    py -m http.server 8026 --bind 127.0.0.1
    goto end
)

echo ============================================
echo  ГРЕШКА: Python не е намерен на компютъра.
echo  Изтегли и инсталирай Python от:
echo  https://www.python.org/downloads/
echo  При инсталация задължително отбележи
echo  "Add Python to PATH"!
echo ============================================
pause

:end
