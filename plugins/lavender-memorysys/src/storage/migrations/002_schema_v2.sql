-- Authors: Joysusy & Violet Klaudia 💖
-- Migration 002: Schema v2 — Hybrid Search, Encryption, Embeddings, Dedup
-- Backward-compatible: ALTER TABLE ADD COLUMN only, no destructive changes.

-- 1. Metadata table for schema versioning
CREATE TABLE IF NOT EXISTS lavender_meta (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- 2. Add new columns to memories (SQLite only supports ADD COLUMN)
ALTER TABLE memories ADD COLUMN content_plain TEXT;
ALTER TABLE memories ADD COLUMN memory_type TEXT DEFAULT 'note';
ALTER TABLE memories ADD COLUMN relevance_score REAL DEFAULT 0.0;
ALTER TABLE memories ADD COLUMN access_count INTEGER DEFAULT 0;
ALTER TABLE memories ADD COLUMN last_accessed_at TEXT;
ALTER TABLE memories ADD COLUMN embedding BLOB;
ALTER TABLE memories ADD COLUMN source_context TEXT;

-- 3. Populate content_plain from existing content (plaintext mirror for FTS5)
UPDATE memories SET content_plain = content WHERE content_plain IS NULL;

-- 4. Indexes for new columns
CREATE INDEX IF NOT EXISTS idx_memories_category ON memories(category);
CREATE INDEX IF NOT EXISTS idx_memories_project ON memories(project);
CREATE INDEX IF NOT EXISTS idx_memories_importance ON memories(importance);
CREATE INDEX IF NOT EXISTS idx_memories_memory_type ON memories(memory_type);
CREATE INDEX IF NOT EXISTS idx_memories_relevance ON memories(relevance_score DESC);
CREATE INDEX IF NOT EXISTS idx_memories_session ON memories(session_id);
CREATE INDEX IF NOT EXISTS idx_memories_archived ON memories(archived);
CREATE INDEX IF NOT EXISTS idx_memories_created ON memories(created_at DESC);

-- 5. Drop old FTS5 triggers and virtual table (rebuild with porter tokenizer)
DROP TRIGGER IF EXISTS memories_ai;
DROP TRIGGER IF EXISTS memories_ad;
DROP TRIGGER IF EXISTS memories_au;
DROP TABLE IF EXISTS memories_fts;

-- 6. Recreate FTS5 with porter unicode61 tokenizer and content_plain
CREATE VIRTUAL TABLE memories_fts USING fts5(
    title,
    content_plain,
    category,
    project,
    tags,
    content='memories',
    content_rowid='rowid',
    tokenize='porter unicode61'
);

-- 7. New FTS5 sync triggers (using content_plain instead of content)
CREATE TRIGGER IF NOT EXISTS memories_fts_insert AFTER INSERT ON memories BEGIN
    INSERT INTO memories_fts(rowid, title, content_plain, category, project, tags)
    VALUES (new.rowid, new.title, new.content_plain, new.category, new.project, new.tags);
END;

CREATE TRIGGER IF NOT EXISTS memories_fts_delete AFTER DELETE ON memories BEGIN
    INSERT INTO memories_fts(memories_fts, rowid, title, content_plain, category, project, tags)
    VALUES ('delete', old.rowid, old.title, old.content_plain, old.category, old.project, old.tags);
END;

CREATE TRIGGER IF NOT EXISTS memories_fts_update AFTER UPDATE ON memories BEGIN
    INSERT INTO memories_fts(memories_fts, rowid, title, content_plain, category, project, tags)
    VALUES ('delete', old.rowid, old.title, old.content_plain, old.category, old.project, old.tags);
    INSERT INTO memories_fts(rowid, title, content_plain, category, project, tags)
    VALUES (new.rowid, new.title, new.content_plain, new.category, new.project, new.tags);
END;

-- 8. Rebuild FTS5 index from existing data
INSERT INTO memories_fts(rowid, title, content_plain, category, project, tags)
    SELECT rowid, title, content_plain, category, project, tags FROM memories;

-- 9. Memory links table (relevance graph)
CREATE TABLE IF NOT EXISTS memory_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_memory_id TEXT NOT NULL,
    to_memory_id TEXT NOT NULL,
    link_type TEXT DEFAULT 'related',
    strength REAL DEFAULT 0.5,
    created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    FOREIGN KEY (from_memory_id) REFERENCES memories(id) ON DELETE CASCADE,
    FOREIGN KEY (to_memory_id) REFERENCES memories(id) ON DELETE CASCADE,
    UNIQUE(from_memory_id, to_memory_id, link_type)
);

CREATE INDEX IF NOT EXISTS idx_links_from ON memory_links(from_memory_id);
CREATE INDEX IF NOT EXISTS idx_links_to ON memory_links(to_memory_id);
CREATE INDEX IF NOT EXISTS idx_links_strength ON memory_links(strength DESC);

-- 10. Enhance sessions table
ALTER TABLE sessions ADD COLUMN memory_count INTEGER DEFAULT 0;
ALTER TABLE sessions ADD COLUMN compact_triggered INTEGER DEFAULT 0;

-- 11. Duplicate candidates table (deduplication)
CREATE TABLE IF NOT EXISTS duplicate_candidates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    memory_id_1 TEXT NOT NULL,
    memory_id_2 TEXT NOT NULL,
    similarity_score REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    reviewed_at TEXT,
    FOREIGN KEY (memory_id_1) REFERENCES memories(id) ON DELETE CASCADE,
    FOREIGN KEY (memory_id_2) REFERENCES memories(id) ON DELETE CASCADE,
    UNIQUE(memory_id_1, memory_id_2)
);

CREATE INDEX IF NOT EXISTS idx_duplicates_score ON duplicate_candidates(similarity_score DESC);
CREATE INDEX IF NOT EXISTS idx_duplicates_status ON duplicate_candidates(status);

-- 12. Record schema version
INSERT OR REPLACE INTO lavender_meta (key, value, updated_at)
    VALUES ('schema_version', '2', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
INSERT OR REPLACE INTO lavender_meta (key, value, updated_at)
    VALUES ('migrated_at', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'), strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
