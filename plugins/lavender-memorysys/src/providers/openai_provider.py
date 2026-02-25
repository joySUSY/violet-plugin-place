# Authors: Joysusy & Violet Klaudia 💖
"""OpenAI text-embedding-3-small provider for Lavender-MemorySys."""

from __future__ import annotations

import httpx

from .base import EmbeddingProvider

_ENDPOINT = "https://api.openai.com/v1/embeddings"
_MODEL = "text-embedding-3-small"
_DIMENSIONS = 1536
_TIMEOUT = 30.0


class OpenAIProvider(EmbeddingProvider):
    """Async embedding provider backed by OpenAI text-embedding-3-small."""

    def __init__(self, api_key: str) -> None:
        self._api_key = api_key
        self._client = httpx.AsyncClient(timeout=_TIMEOUT)

    @property
    def name(self) -> str:
        return "openai-text-embedding-3-small"

    def _headers(self) -> dict[str, str]:
        return {
            "Authorization": f"Bearer {self._api_key}",
            "Content-Type": "application/json",
        }

    async def embed(self, text: str) -> list[float]:
        payload = {"input": text, "model": _MODEL}
        try:
            resp = await self._client.post(
                _ENDPOINT, headers=self._headers(), json=payload
            )
            resp.raise_for_status()
            return resp.json()["data"][0]["embedding"]
        except (httpx.HTTPStatusError, KeyError, IndexError):
            return [0.0] * _DIMENSIONS

    async def embed_batch(self, texts: list[str]) -> list[list[float]]:
        payload = {"input": texts, "model": _MODEL}
        try:
            resp = await self._client.post(
                _ENDPOINT, headers=self._headers(), json=payload
            )
            resp.raise_for_status()
            data = resp.json()["data"]
            data.sort(key=lambda d: d["index"])  # OpenAI may return unordered
            return [d["embedding"] for d in data]
        except (httpx.HTTPStatusError, KeyError):
            return [[0.0] * _DIMENSIONS for _ in texts]

    async def health_check(self) -> bool:
        try:
            result = await self.embed("ping")
            return len(result) == _DIMENSIONS and any(v != 0.0 for v in result)
        except Exception:
            return False

    async def close(self) -> None:
        await self._client.aclose()
