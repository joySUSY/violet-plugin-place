: << 'CMDBLOCK'
@echo off
REM Polyglot wrapper — cmd.exe on Windows, bash on Unix
REM Runs a sibling .js file with node, passing through all extra args
if "%~1"=="" exit /b 0
set "HOOK_DIR=%~dp0"
set "SCRIPT=%~1"
shift
set "ARGS="
:loop
if "%~1"=="" goto :endloop
set "ARGS=%ARGS% %~1"
shift
goto :loop
:endloop
where node.exe >/dev/null 2>/dev/null
if %ERRORLEVEL% equ 0 (
    for /f "delims=" %%i in ('where node.exe') do (
        "%%i" "%HOOK_DIR%%SCRIPT%" %ARGS%
        exit /b %ERRORLEVEL%
    )
)
exit /b 0
CMDBLOCK

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SCRIPT="$1"
shift
exec node "${SCRIPT_DIR}/${SCRIPT}" "$@"
