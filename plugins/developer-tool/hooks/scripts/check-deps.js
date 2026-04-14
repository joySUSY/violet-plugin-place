// Authors: Joysusy & Violet Klaudia
const { execSync } = require("child_process");
process.stdin.resume(); process.stdin.on("end", () => {});
const isWin = process.platform === "win32";
const missing = [];
try { execSync("cass --version", { stdio: "ignore" }); } catch { missing.push("cass (cargo install coding-agent-session-search)"); }
try { execSync("uv --version", { stdio: "ignore" }); } catch {
  missing.push(isWin
    ? "uv (powershell -c \"irm https://astral.sh/uv/install.ps1 | iex\")"
    : "uv (curl -LsSf https://astral.sh/uv/install.sh | sh)");
}
if (missing.length) {
  process.stdout.write(JSON.stringify({ continue: true, suppressOutput: false, systemMessage: "developer-tool optional deps missing: " + missing.join(", ") }) + "\n");
} else {
  process.stdout.write(JSON.stringify({ continue: true, suppressOutput: true }) + "\n");
}
