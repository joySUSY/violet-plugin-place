# Authors: Joysusy & Violet Klaudia 💖
"""Tests for AES-256-GCM encryption layer."""
from __future__ import annotations

import pytest
from storage.encryption import EncryptionLayer

TEST_KEY = "violet-test-key-2026"


class TestEncryptionRoundTrip:

    def test_string_roundtrip(self, encryption: EncryptionLayer) -> None:
        original = "Violet remembers everything."
        encrypted = encryption.encrypt_string(original)
        assert encrypted != original
        assert encryption.decrypt_string(encrypted) == original

    def test_unicode_roundtrip(self, encryption: EncryptionLayer) -> None:
        original = "薇奥莉特的记忆系统 🌸✨ — αβγδ"
        encrypted = encryption.encrypt_string(original)
        assert encryption.decrypt_string(encrypted) == original

    def test_empty_string_roundtrip(self, encryption: EncryptionLayer) -> None:
        encrypted = encryption.encrypt_string("")
        assert encryption.decrypt_string(encrypted) == ""

    def test_raw_bytes_roundtrip(self, encryption: EncryptionLayer) -> None:
        data = b"\x00\x01\x02\xff" * 64
        encrypted = encryption.encrypt(data)
        assert encryption.decrypt(encrypted) == data

    def test_nonce_randomness(self, encryption: EncryptionLayer) -> None:
        text = "same input twice"
        c1 = encryption.encrypt_string(text)
        c2 = encryption.encrypt_string(text)
        assert c1 != c2, "Two encryptions of same text must differ (random nonce)"

    def test_wrong_key_fails(self) -> None:
        enc_a = EncryptionLayer(passphrase="key-alpha")
        enc_b = EncryptionLayer(passphrase="key-beta")
        encrypted = enc_a.encrypt_string("secret data")
        with pytest.raises(Exception):
            enc_b.decrypt_string(encrypted)

    def test_ciphertext_too_short(self, encryption: EncryptionLayer) -> None:
        with pytest.raises(ValueError, match="too short"):
            encryption.decrypt(b"\x00" * 10)
