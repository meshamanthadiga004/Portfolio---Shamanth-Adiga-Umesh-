@echo off
REM Builds, commits and pushes. Site updates about a minute later.
node "%~dp0scripts\deploy.mjs" %*
