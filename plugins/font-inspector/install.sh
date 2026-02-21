#!/bin/bash
# Font Inspector Plugin Installation Script

set -e

echo "🎨 Font Inspector Plugin Installation"
echo "======================================"
echo ""

# Check Python
echo "Checking Python..."
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Please install Python 3.8+"
    exit 1
fi
echo "✅ Python found: $(python3 --version)"

# Check Rust
echo ""
echo "Checking Rust..."
if ! command -v cargo &> /dev/null; then
    echo "⚠️  Rust not found. Rust components will not be available."
    echo "   Install Rust from: https://rustup.rs/"
    RUST_AVAILABLE=false
else
    echo "✅ Rust found: $(rustc --version)"
    RUST_AVAILABLE=true
fi

# Install Python dependencies
echo ""
echo "Installing Python dependencies..."
pip3 install fonttools ufoLib2 || {
    echo "❌ Failed to install Python dependencies"
    exit 1
}
echo "✅ Python dependencies installed"

# Build Rust binary
if [ "$RUST_AVAILABLE" = true ]; then
    echo ""
    echo "Building Rust binary (this may take a few minutes)..."
    cd scripts/rust
    cargo build --release || {
        echo "❌ Failed to build Rust binary"
        exit 1
    }
    cd ../..
    echo "✅ Rust binary built successfully"
fi

# Make scripts executable
echo ""
echo "Making scripts executable..."
chmod +x scripts/*.py
echo "✅ Scripts are executable"

# Test installation
echo ""
echo "Testing installation..."

# Test Python
python3 scripts/font_info.py --help > /dev/null 2>&1 && echo "✅ Python scripts working" || echo "⚠️  Python scripts may have issues"

# Test Rust
if [ "$RUST_AVAILABLE" = true ]; then
    scripts/rust/target/release/font-inspector --help > /dev/null 2>&1 && echo "✅ Rust binary working" || echo "⚠️  Rust binary may have issues"
fi

echo ""
echo "======================================"
echo "✨ Installation complete!"
echo ""
echo "Available commands:"
echo "  /inspect-font       - Full-featured analysis (Python)"
echo "  /inspect-font-fast  - High-performance extraction (Rust)"
echo ""
echo "Try it:"
echo "  /inspect-font your-font.ttf --info"
if [ "$RUST_AVAILABLE" = true ]; then
    echo "  /inspect-font-fast your-font.ttf --preset cjk-common"
fi
echo ""
