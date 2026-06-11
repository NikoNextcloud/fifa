@echo off
cd /d "%~dp0"
start http://127.0.0.1:8026/
python -m http.server 8026 --bind 127.0.0.1
