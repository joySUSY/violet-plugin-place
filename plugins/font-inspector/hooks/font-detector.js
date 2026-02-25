// Authors: Joysusy & Violet Klaudia

/**
 * Font Inspector — PreToolUse Hook: Font Auto-Detection
 *
 * Reads Claude Code hook protocol JSON from stdin ({ tool_name, tool_input }).
 * Checks if tool_input references font files or font-face declarations.
 * Outputs an informational message when fonts are detected.
 * Always exits 0 (never blocks).
 *
 * @event PreToolUse
 * @matcher Bash|Read|Write|Edit
 */

const FONT_PATTERNS = [
  /\.ttf\b/i,
  /\.otf\b/i,
  /\.woff2?\b/i,
  /font-face/i,
  /@font-face/i,
];

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { data += chunk; });
    process.stdin.on('end', () => {
      try {
        resolve(JSON.parse(data));
      } catch {
        resolve(null);
      }
    });
    setTimeout(() => resolve(null), 3000);
  });
}

function extractSearchableText(toolInput) {
  if (!toolInput) return '';
  if (typeof toolInput === 'string') return toolInput;
  return JSON.stringify(toolInput);
}

function detectFontReferences(text) {
  return FONT_PATTERNS.some((pattern) => pattern.test(text));
}

async function main() {
  try {
    const input = await readStdin();
    if (!input) {
      process.exit(0);
    }

    const toolInput = input.tool_input;
    const searchable = extractSearchableText(toolInput);

    if (searchable && detectFontReferences(searchable)) {
      const result = JSON.stringify({
        systemMessage: "Detected font related resource! \u2022\u0300.\u032B\u2022\u0301\u2727 / Violet choose to use font plugin. [\u221A]/[\u00D7]"
      });
      console.log(result);
    }

    process.exit(0);
  } catch {
    process.exit(0);
  }
}

main();
