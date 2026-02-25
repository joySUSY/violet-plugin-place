// Authors: Joysusy & Violet Klaudia

/**
 * Font Inspector — PostToolUse Hook: SVG Validation
 *
 * Reads Claude Code hook protocol JSON from stdin ({ tool_name, tool_result }).
 * If tool_result contains SVG content, validates structure:
 *   - xmlns="http://www.w3.org/2000/svg"
 *   - viewBox attribute present
 *   - At least one path element with d attribute
 * Outputs validation result as systemMessage.
 * Always exits 0 (never blocks).
 *
 * @event PostToolUse
 * @matcher mcp__plugin_font-inspector_.*
 */

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

function extractSvgContent(toolResult) {
  if (!toolResult) return null;
  const text = typeof toolResult === 'string'
    ? toolResult
    : JSON.stringify(toolResult);
  if (!/<svg[\s>]/i.test(text)) return null;
  return text;
}

function validateSvg(svgText) {
  const issues = [];

  const hasXmlns = /xmlns\s*=\s*["']http:\/\/www\.w3\.org\/2000\/svg["']/i.test(svgText);
  if (!hasXmlns) {
    issues.push('Missing xmlns="http://www.w3.org/2000/svg"');
  }

  const hasViewBox = /viewBox\s*=\s*["'][^"']+["']/i.test(svgText);
  if (!hasViewBox) {
    issues.push('Missing viewBox attribute');
  }

  const hasPathWithD = /<path\b[^>]*\bd\s*=\s*["'][^"']+["'][^>]*\/?>/i.test(svgText);
  if (!hasPathWithD) {
    issues.push('No <path> element with d attribute found');
  }

  return { valid: issues.length === 0, issues };
}

async function main() {
  try {
    const input = await readStdin();
    if (!input) {
      process.exit(0);
    }

    const toolResult = input.tool_result;
    const svgContent = extractSvgContent(toolResult);

    if (!svgContent) {
      process.exit(0);
    }

    const { valid, issues } = validateSvg(svgContent);

    if (valid) {
      const result = JSON.stringify({
        systemMessage: "SVG validation passed: xmlns, viewBox, and path elements all present."
      });
      console.log(result);
    } else {
      const result = JSON.stringify({
        systemMessage: `SVG validation issues: ${issues.join('; ')}.`
      });
      console.log(result);
    }

    process.exit(0);
  } catch {
    process.exit(0);
  }
}

main();
