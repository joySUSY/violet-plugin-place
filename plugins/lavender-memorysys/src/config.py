# Authors: Joysusy & Violet Klaudia 💖
"""Lavender-MemorySys configuration loader."""
from __future__ import annotations

import os
from pathlib import Path
from pydantic import BaseModel, Field


DEFAULT_DB_DIR = Path.home() / ".violet" / "lavender"


class ProviderConfig(BaseModel):
    primary: str = Field(default="gemini", description="Primary embedding provider")
    fallback: str = Field(default="local", description="Fallback provider")
    claude_api_key: str = Field(default="")
    gemini_api_key: str = Field(default="")
    openai_api_key: str = Field(default="")


class StorageConfig(BaseModel):
    db_dir: Path = Field(default=DEFAULT_DB_DIR)
    encryption_enabled: bool = Field(default=True)


class LavenderConfig(BaseModel):
    provider: ProviderConfig = Field(default_factory=ProviderConfig)
    storage: StorageConfig = Field(default_factory=StorageConfig)
    port: int = Field(default=15698, description="Reserved port if needed")


def load_config() -> LavenderConfig:
    cfg = LavenderConfig()
    cfg.provider.claude_api_key = (
        os.environ.get("LAVENDER_CLAUDE_API_KEY")
        or os.environ.get("ANTHROPIC_API_KEY", "")
    )
    cfg.provider.gemini_api_key = (
        os.environ.get("LAVENDER_GEMINI_API_KEY")
        or os.environ.get("GEMINI_API_KEY", "")
    )
    cfg.provider.openai_api_key = (
        os.environ.get("LAVENDER_OPENAI_API_KEY")
        or os.environ.get("OPENAI_API_KEY", "")
    )
    soul_key = os.environ.get("VIOLET_SOUL_KEY", "")
    if soul_key:
        cfg.storage.encryption_enabled = True
    return cfg
