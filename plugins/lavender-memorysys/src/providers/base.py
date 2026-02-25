# Authors: Joysusy & Violet Klaudia 💖
"""Abstract base class for embedding providers in Lavender-MemorySys."""

from abc import ABC, abstractmethod


class EmbeddingProvider(ABC):
    """Base contract that every embedding provider must fulfill."""

    @property
    @abstractmethod
    def name(self) -> str:
        ...

    @abstractmethod
    async def embed(self, text: str) -> list[float]:
        ...

    @abstractmethod
    async def embed_batch(self, texts: list[str]) -> list[list[float]]:
        ...

    @abstractmethod
    async def health_check(self) -> bool:
        ...
