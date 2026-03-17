-- Authors: Joysusy & Violet Klaudia 💖
-- Migration v5: Complete Mind-Aware Memory Storage schema for VioletCore Phase 3.0

ALTER TABLE memories ADD COLUMN mind_context TEXT;
ALTER TABLE memories ADD COLUMN violet_context TEXT;

UPDATE lavender_meta SET value = '5' WHERE key = 'schema_version';
INSERT OR IGNORE INTO lavender_meta (key, value) VALUES ('schema_version', '5');
