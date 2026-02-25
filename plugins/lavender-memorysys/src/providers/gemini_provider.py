# Authors: Joysusy & Violet Klaudia 💖
"""Gemini text-embedding-004 provider for Lavender-MemorySys."""

from __future__ import annotations

import httpx

from .base import EmbeddingProvider

_ENDPOINT = (
    "https://generativelanguage.googleapis.com/v1beta/"
    "models/text-embedding-004:embedContent"
)
_BATCH_ENDPOINT = (
    "https://generativelanguage.googleapis.com/v1beta/"
    "models/text-embedding-004:batchEmbedContents"
)
_DIMENSIONS = 768
_TIMEOUT = 30.0


class GeminiProvider(EmbeddingProvider):
    """Async embedding provider backed by Google Gemini text-embedding-004."""

    def __init__(self, api_key: str) -> None:
        self._api_key = api_key
        self._client = httpx.AsyncClient(timeout=_TIMEOUT)

    @property
    def name(self) -> str:
        return "gemini-text-embedding-004"

    async def embed(self, text: str) -> list[float]:
        payload = {
            "model": "models/text-embedding-004",
            "content": {"parts": [{"text": text}]},
        }
        try:
            resp = await self._client.post(
                _ENDPOINT,
                params={"key": self._api_key},
                json=payload,
            )
            resp.raise_for_status()
            return resp.json()["embedding"]["values"]
        except (httpx.HTTPStatusError, KeyError) as exc:
            return [0.0] * _DIMENSIONS  # graceful fallback

    async def embed_batch(self, texts: list[str]) -> list[list[float]]:
        requests = [
            {
                "model": "models/text-embedding-004",
                "content": {"parts": [{"text": t}]},
            }
            for t in texts
        ]
        try:
            resp = await self._client.post(
                _BATCH_ENDPOINT,
                params={"key": self._api_key},
                json={"requests": requests},
            )
            resp.raise_for_status()
            return [e["values"] for e in resp.json()["embeddings"]]
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
