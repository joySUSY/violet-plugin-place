# Authors: Joysusy & Violet Klaudia 💖
"""Shared fixtures for Lavender-MemorySys test suite."""
from __future__ import annotations

import hashlib
import sys
from pathlib import Path

import pytest

SRC_DIR = Path(__file__).resolve().parent.parent / "src"
sys.path.insert(0, str(SRC_DIR))

from providers.base import EmbeddingProvider
from storage.encryption import EncryptionLayer
from storage.sqlite_store import SQLiteStore
from memory.manager import MemoryManager
from memory.hybrid_search import HybridSearchEngine

TEST_PASSPHRASE = "violet-test-key-2026"
MOCK_DIMS = 8


class MockEmbeddingProvider(EmbeddingProvider):
    """Deterministic embedding provider for testing."""

    @property
    def name(self) -> str:
        return "mock-test-provider"

    async def embed(self, text: str) -> list[float]:
        return self._text_to_vector(text)

    async def embed_batch(self, texts: list[str]) -> list[list[float]]:
        return [self._text_to_vector(t) for t in texts]

    async def health_check(self) -> bool:
        return True

    @staticmethod
    def _text_to_vector(text: str, dims: int = MOCK_DIMS) -> list[float]:
        h = hashlib.sha256(text.encode()).digest()
        raw = [h[i] / 255.0 for i in range(dims)]
        norm = sum(x * x for x in raw) ** 0.5 or 1.0
        return [x / norm for x in raw]


@pytest.fixture
async def store(tmp_path: Path) -> SQLiteStore:
    db_path = tmp_path / "test_lavender.db"
    s = SQLiteStore(db_path)
    await s.initialize()
    yield s
    await s.close()


@pytest.fixture
def encryption() -> EncryptionLayer:
    return EncryptionLayer(passphrase=TEST_PASSPHRASE)


@pytest.fixture
def mock_provider() -> MockEmbeddingProvider:
    return MockEmbeddingProvider()


@pytest.fixture
async def manager(store: SQLiteStore, mock_provider: MockEmbeddingProvider, encryption: EncryptionLayer) -> MemoryManager:
    return MemoryManager(store, mock_provider, encryption=encryption)


@pytest.fixture
async def manager_plain(store: SQLiteStore, mock_provider: MockEmbeddingProvider) -> MemoryManager:
    return MemoryManager(store, mock_provider, encryption=None)


@pytest.fixture
async def search_engine(store: SQLiteStore, mock_provider: MockEmbeddingProvider) -> HybridSearchEngine:
    return HybridSearchEngine(store, mock_provider)
