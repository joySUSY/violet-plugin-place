# Authors: Joysusy & Violet Klaudia 💖
"""AES-256-GCM encryption layer for Lavender-MemorySys.

Provides key derivation (PBKDF2/Argon2), authenticated encryption,
and helpers for encrypting SQLite database files and individual
memory content strings.
"""

from __future__ import annotations

import base64
import os
from pathlib import Path
from typing import Final

from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

LOCAL_SALT: Final[str] = "violet-soul-salt-local-2026"
GIT_SALT: Final[str] = "violet-soul-salt-git-2026"

_NONCE_SIZE: Final[int] = 12
_KEY_SIZE: Final[int] = 32
_PBKDF2_ITERATIONS: Final[int] = 600_000
_HAS_ARGON2: bool
try:
    from argon2.low_level import hash_secret_raw, Type  # type: ignore[import-untyped]
    _HAS_ARGON2 = True
except ImportError:
    _HAS_ARGON2 = False


def _default_passphrase() -> str:
    key = os.environ.get("VIOLET_SOUL_KEY")
    if not key:
        raise EnvironmentError(
            "VIOLET_SOUL_KEY is not set. "
            "Export it or pass a passphrase explicitly."
        )
    return key


class EncryptionLayer:
    """AES-256-GCM encryption with PBKDF2 (or Argon2) key derivation."""

    def __init__(
        self,
        passphrase: str | None = None,
        salt: str = LOCAL_SALT,
    ) -> None:
        self._passphrase = passphrase or _default_passphrase()
        self._salt = salt
        self._key = self.derive_key(self._passphrase, self._salt)
        self._aesgcm = AESGCM(self._key)

    def derive_key(self, passphrase: str, salt: str) -> bytes:
        salt_bytes = salt.encode("utf-8")
        passphrase_bytes = passphrase.encode("utf-8")

        if _HAS_ARGON2:
            return hash_secret_raw(
                secret=passphrase_bytes,
                salt=salt_bytes.ljust(16, b"\x00")[:16],
                time_cost=3,
                memory_cost=65536,
                parallelism=4,
                hash_len=_KEY_SIZE,
                type=Type.ID,
            )

        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=_KEY_SIZE,
            salt=salt_bytes,
            iterations=_PBKDF2_ITERATIONS,
        )
        return kdf.derive(passphrase_bytes)

    # --- raw bytes encrypt / decrypt ---

    def encrypt(self, plaintext: bytes) -> bytes:
        nonce = os.urandom(_NONCE_SIZE)
        ciphertext_and_tag = self._aesgcm.encrypt(nonce, plaintext, None)
        return nonce + ciphertext_and_tag

    def decrypt(self, data: bytes) -> bytes:
        if len(data) < _NONCE_SIZE + 16:
            raise ValueError("Ciphertext too short to contain nonce + tag")
        nonce = data[:_NONCE_SIZE]
        ciphertext_and_tag = data[_NONCE_SIZE:]
        return self._aesgcm.decrypt(nonce, ciphertext_and_tag, None)

    # --- file encrypt / decrypt ---

    def encrypt_file(self, src: Path, dst: Path) -> None:
        plaintext = src.read_bytes()
        encrypted = self.encrypt(plaintext)
        dst.parent.mkdir(parents=True, exist_ok=True)
        dst.write_bytes(encrypted)

    def decrypt_file(self, src: Path, dst: Path) -> None:
        encrypted = src.read_bytes()
        plaintext = self.decrypt(encrypted)
        dst.parent.mkdir(parents=True, exist_ok=True)
        dst.write_bytes(plaintext)

    # --- string encrypt / decrypt (base64-encoded) ---

    def encrypt_string(self, text: str) -> str:
        raw = self.encrypt(text.encode("utf-8"))
        return base64.urlsafe_b64encode(raw).decode("ascii")

    def decrypt_string(self, data: str) -> str:
        raw = base64.urlsafe_b64decode(data.encode("ascii"))
        return self.decrypt(raw).decode("utf-8")
