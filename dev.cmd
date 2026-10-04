@echo off
REM Starts the local preview at http://localhost:3000
REM
REM Calls node directly instead of going through "npm run dev". npm rebuilds
REM PATH internally and Command Prompt splits it at the "&" in this folder's
REM path. %~dp0 is this file's own folder, quoted, so the ampersand is safe.
echo.
echo   Starting preview...  open http://localhost:3000 in your browser
echo   Press Ctrl+C here to stop it.
echo.
node "%~dp0node_modules\next\dist\bin\next" dev
