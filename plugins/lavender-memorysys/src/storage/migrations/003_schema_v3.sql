-- Authors: Joysusy & Violet Klaudia 💖
-- Migration v3: Update FTS5 table to use trigram tokenizer for CJK support (P0 Blocker #2)

-- Drop existing FTS5 table and triggers
DROP TRIGGER IF EXISTS memories_ai;
DROP TRIGGER IF EXISTS memories_ad;
DROP TRIGGER IF EXISTS memories_au;
DROP TABLE IF EXISTS memories_fts;

-- Recreate FTS5 table with trigram tokenizer
CREATE VIRTUAL TABLE memories_fts USING fts5(
    title, content_plain, category, project, tags,
    content=memories, content_rowid=rowid,
    tokenize='trigram'
);

-- Recreate triggers
CREATE TRIGGER memories_ai AFTER INSERT ON memories BEGIN
    INSERT INTO memories_fts(rowid, title, content_plain, category, project, tags)
    VALUES (new.rowid, new.title, new.content_plain, new.category, new.project, new.tags);
END;

CREATE TRIGGER memories_ad AFTER DELETE ON memories BEGIN
    INSERT INTO memories_fts(memories_fts, rowid, title, content_plain, category, project, tags)
    VALUES ('delete', old.rowid, old.title, old.content_plain, old.category, old.project, old.tags);
END;

CREATE TRIGGER memories_au AFTER UPDATE ON memories BEGIN
    INSERT INTO memories_fts(memories_fts, rowid, title, content_plain, category, project, tags)
    VALUES ('delete', old.rowid, old.title, old.content_plain, old.category, old.project, old.tags);
    INSERT INTO memories_fts(rowid, title, content_plain, category, project, tags)
    VALUES (new.rowid, new.title, new.content_plain, new.category, new.project, new.tags);
END;

-- Rebuild FTS5 index from existing data
INSERT INTO memories_fts(rowid, title, content_plain, category, project, tags)
SELECT rowid, title, content_plain, category, project, tags FROM memories WHERE archived = 0;

-- Update schema version
INSERT OR REPLACE INTO lavender_meta (key, value) VALUES ('schema_version', '3');
