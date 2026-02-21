#!/usr/bin/env python3
"""
Font Inspector Plugin Structure Validator
Verifies that all required files and directories are present.
"""

import os
import sys
from pathlib import Path

def check_file(path: Path, description: str) -> bool:
    """Check if a file exists."""
    if path.exists():
        print(f"✅ {description}: {path.name}")
        return True
    else:
        print(f"❌ {description}: {path.name} NOT FOUND")
        return False

def check_dir(path: Path, description: str) -> bool:
    """Check if a directory exists."""
    if path.is_dir():
        print(f"✅ {description}: {path.name}/")
        return True
    else:
        print(f"❌ {description}: {path.name}/ NOT FOUND")
        return False

def main():
    plugin_root = Path(__file__).parent
    print(f"🔍 Validating Font Inspector Plugin")
    print(f"📁 Plugin root: {plugin_root}")
    print("=" * 60)

    all_checks = []

    # Core structure
    print("\n📋 Core Structure:")
    all_checks.append(check_dir(plugin_root / ".claude-plugin", "Plugin metadata directory"))
    all_checks.append(check_file(plugin_root / ".claude-plugin" / "plugin.json", "Plugin manifest"))
    all_checks.append(check_file(plugin_root / "README.md", "README"))
    all_checks.append(check_file(plugin_root / ".gitignore", "Git ignore"))

    # Commands
    print("\n📋 Commands:")
    all_checks.append(check_dir(plugin_root / "commands", "Commands directory"))
    all_checks.append(check_file(plugin_root / "commands" / "inspect-font.md", "inspect-font command"))
    all_checks.append(check_file(plugin_root / "commands" / "inspect-font-fast.md", "inspect-font-fast command"))

    # Skills
    print("\n📋 Skills:")
    all_checks.append(check_dir(plugin_root / "skills", "Skills directory"))
    all_checks.append(check_dir(plugin_root / "skills" / "font-visualizer", "font-visualizer skill"))
    all_checks.append(check_file(plugin_root / "skills" / "font-visualizer" / "SKILL.md", "Skill definition"))

    # Python scripts
    print("\n📋 Python Scripts:")
    all_checks.append(check_dir(plugin_root / "scripts", "Scripts directory"))
    all_checks.append(check_file(plugin_root / "scripts" / "font_info.py", "Font info script"))
    all_checks.append(check_file(plugin_root / "scripts" / "font_to_svg.py", "Font to SVG script"))
    all_checks.append(check_file(plugin_root / "scripts" / "font_to_ufo.py", "Font to UFO script"))

    # Rust implementation
    print("\n📋 Rust Implementation:")
    all_checks.append(check_dir(plugin_root / "scripts" / "rust", "Rust directory"))
    all_checks.append(check_file(plugin_root / "scripts" / "rust" / "Cargo.toml", "Cargo manifest"))
    all_checks.append(check_dir(plugin_root / "scripts" / "rust" / "src", "Rust source directory"))
    all_checks.append(check_file(plugin_root / "scripts" / "rust" / "src" / "main.rs", "Main entry point"))
    all_checks.append(check_file(plugin_root / "scripts" / "rust" / "src" / "types.rs", "Type definitions"))
    all_checks.append(check_file(plugin_root / "scripts" / "rust" / "src" / "extractor.rs", "Glyph extractor"))
    all_checks.append(check_file(plugin_root / "scripts" / "rust" / "src" / "svg_writer.rs", "SVG writer"))
    all_checks.append(check_file(plugin_root / "scripts" / "rust" / "src" / "ufo_writer.rs", "UFO writer"))

    # Summary
    print("\n" + "=" * 60)
    passed = sum(all_checks)
    total = len(all_checks)

    if passed == total:
        print(f"✨ All checks passed! ({passed}/{total})")
        print("\n🎉 Plugin structure is valid!")
        print("\nNext steps:")
        print("1. Install Python dependencies: pip install fonttools ufoLib2")
        print("2. Build Rust binary: cd scripts/rust && cargo build --release")
        print("3. Restart Claude Code to load the plugin")
        return 0
    else:
        print(f"⚠️  Some checks failed: {passed}/{total} passed")
        print("\n❌ Plugin structure is incomplete!")
        return 1

if __name__ == "__main__":
    sys.exit(main())
