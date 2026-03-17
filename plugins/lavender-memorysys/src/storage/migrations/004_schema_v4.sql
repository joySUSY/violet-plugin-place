-- Authors: Joysusy & Violet Klaudia 💖
-- Migration v4: Add VioletCore Mind context columns for Phase 3.0 integration

ALTER TABLE memories ADD COLUMN mind_symbols TEXT;
ALTER TABLE memories ADD COLUMN mind_roles TEXT;
ALTER TABLE memories ADD COLUMN coordination_pattern TEXT;
ALTER TABLE memories ADD COLUMN style_metadata TEXT;

UPDATE lavender_meta SET value = '4' WHERE key = 'schema_version';
INSERT OR IGNORE INTO lavender_meta (key, value) VALUES ('schema_version', '4');
