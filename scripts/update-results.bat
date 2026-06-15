@echo off
REM Стартира скрипта за обновяване на резултатите от api-football.com
REM Изисква инсталиран Node.js (https://nodejs.org)

cd /d "%~dp0"
node update-results.js

REM Ако искаш да виждаш резултата при ръчно стартиране, разкоментирай реда отдолу:
REM pause
