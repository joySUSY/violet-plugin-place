-- Authors: Joysusy & Violet Klaudia 💖
-- Schema v6: Memory Links and Coordination Analytics
-- Phase 3.1: Advanced Mind Coordination Patterns

-- Drop old memory_links table from v2 (incompatible schema)
DROP TABLE IF EXISTS memory_links;

-- Memory Links Table: Track relationships between memories across Mind contexts
CREATE TABLE memory_links (
    id TEXT PRIMARY KEY,
    source_id TEXT NOT NULL,
    target_id TEXT NOT NULL,
    link_type TEXT NOT NULL CHECK(link_type IN ('coordination', 'continuation', 'contradiction', 'synthesis')),
    strength REAL DEFAULT 1.0 CHECK(strength >= 0.0 AND strength <= 1.0),
    minds_involved TEXT,
    context TEXT,
    created_at TEXT NOT NULL,
    UNIQUE(source_id, target_id, link_type)
);

CREATE INDEX IF NOT EXISTS idx_links_source ON memory_links(source_id);
CREATE INDEX IF NOT EXISTS idx_links_target ON memory_links(target_id);
CREATE INDEX IF NOT EXISTS idx_links_type ON memory_links(link_type);
CREATE INDEX IF NOT EXISTS idx_links_created ON memory_links(created_at);

-- Drop old coordination_analytics if exists (ensure clean schema)
DROP TABLE IF EXISTS coordination_analytics;

-- Coordination Analytics Table: Track Mind combination effectiveness
CREATE TABLE coordination_analytics (
    id TEXT PRIMARY KEY,
    mind_combination TEXT NOT NULL,
    task_type TEXT,
    success_score REAL CHECK(success_score >= 0.0 AND success_score <= 10.0),
    duration_ms INTEGER CHECK(duration_ms >= 0),
    memories_created INTEGER DEFAULT 0 CHECK(memories_created >= 0),
    context TEXT,
    session_id TEXT,
    created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_coord_combo ON coordination_analytics(mind_combination);
CREATE INDEX IF NOT EXISTS idx_coord_task ON coordination_analytics(task_type);
CREATE INDEX IF NOT EXISTS idx_coord_session ON coordination_analytics(session_id);
CREATE INDEX IF NOT EXISTS idx_coord_created ON coordination_analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_coord_score ON coordination_analytics(success_score);

UPDATE lavender_meta SET value = '6' WHERE key = 'schema_version';
INSERT OR IGNORE INTO lavender_meta (key, value) VALUES ('schema_version', '6');
