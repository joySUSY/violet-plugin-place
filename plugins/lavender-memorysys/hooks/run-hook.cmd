:; exec uv run --directory "$(dirname "$0")/.." python "$(dirname "$0")/../src/session_hook.py" "$@"
@echo off
cd /d "%~dp0.."
uv run python src\session_hook.py %*
