PRAGMA foreign_keys = ON;

-- 1. Learners & Profile Table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone_number TEXT UNIQUE NOT NULL,
  dob TEXT NOT NULL,                          -- YYYY-MM-DD
  place TEXT NOT NULL,                        -- City / College
  password_hash TEXT,
  avatar_r2_url TEXT,
  
  -- Gamification & Streak Economy
  xp_total INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_active_local_date TEXT,                -- YYYY-MM-DD
  streak_freezes INTEGER DEFAULT 1,           -- Max 3
  combo_max_reached INTEGER DEFAULT 1,
  timezone TEXT DEFAULT 'Asia/Kolkata',
  mascot_tone TEXT DEFAULT 'playful',         -- 'gentle' | 'playful' | 'flirty'
  active_theme TEXT DEFAULT 'default',        -- 'default' | 'rainy_lofi' | 'cyberpunk'
  is_public_profile INTEGER DEFAULT 1,
  
  -- GitHub Auto-Commit Integration
  github_id TEXT UNIQUE,
  github_username TEXT,
  github_access_token_enc TEXT,               -- AES-GCM encrypted token
  github_repo_name TEXT DEFAULT 'articlarity-dsa-solutions',
  github_auto_commit INTEGER DEFAULT 1,
  
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- 2. 365-Day Heatmap Activity Table
CREATE TABLE IF NOT EXISTS user_daily_activity (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activity_date TEXT NOT NULL,                -- YYYY-MM-DD
  dsa_solved_count INTEGER DEFAULT 0,
  gate_pyq_solved_count INTEGER DEFAULT 0,
  steps_completed_count INTEGER DEFAULT 0,
  github_commits_count INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  used_streak_freeze INTEGER DEFAULT 0,       -- 1 = Ice Blue freeze day on heatmap
  PRIMARY KEY (user_id, activity_date)
);

-- 3. Badges & Streak Rewards Master + User Unlocks
CREATE TABLE IF NOT EXISTS badges (
  id TEXT PRIMARY KEY,                        -- e.g., 'first_run', 'git_linked', 'pyq_50'
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  category TEXT NOT NULL,                     -- 'Onboarding' | 'GitHub' | 'DSA' | 'GATE' | 'Streak'
  xp_bonus INTEGER DEFAULT 50,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS user_badges (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_id TEXT NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  unlocked_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, badge_id)
);

-- 4. Curriculum Tree (Tracks -> Units -> Topics -> Lessons -> Steps)
CREATE TABLE IF NOT EXISTS tracks (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,                  -- 'dsa-python', 'gate-cs-2027'
  title TEXT NOT NULL,
  icon TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  status TEXT DEFAULT 'published',
  seo_json TEXT NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS units (
  id TEXT PRIMARY KEY,
  track_id TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  theme_color TEXT NOT NULL,
  leetcode_tag_url TEXT,
  sort_order INTEGER NOT NULL,
  UNIQUE(track_id, slug)
);

CREATE TABLE IF NOT EXISTS topics (
  id TEXT PRIMARY KEY,
  unit_id TEXT NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  leetcode_pattern_links_json TEXT DEFAULT '[]',
  gate_avg_marks REAL DEFAULT 0,
  sort_order INTEGER NOT NULL,
  UNIQUE(unit_id, slug)
);

CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY,
  topic_id TEXT NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  kind TEXT NOT NULL,                         -- 'dsa_problem' | 'concept_guide' | 'gate_chapter' | 'boss_fight'
  difficulty TEXT NOT NULL,                   -- 'Easy' | 'Medium' | 'Hard'
  leetcode_problem_number INTEGER,
  leetcode_url TEXT,
  related_leetcode_json TEXT DEFAULT '[]',
  github_folder_path TEXT,
  time_complexity TEXT,
  space_complexity TEXT,
  approaches_json TEXT DEFAULT '[]',
  cheat_sheet_json TEXT DEFAULT '[]',
  status TEXT DEFAULT 'draft',
  seo_json TEXT NOT NULL DEFAULT '{}',
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS steps (
  id TEXT PRIMARY KEY,
  lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  step_order INTEGER NOT NULL,
  step_type TEXT NOT NULL,                    -- 'INTUITION'|'DRY_RUN'|'SPOT_BUG'|'PARSONS'|'FILL_BLANK'|'FULL_CODE'|'GATE_MCQ'|'GATE_MSQ'|'GATE_NAT'
  content_md TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  starter_code TEXT,
  solution_code TEXT,
  leetcode_example_link TEXT,
  tests_json TEXT DEFAULT '[]',
  hints_json TEXT DEFAULT '[]',
  xp_reward INTEGER DEFAULT 10
);

-- 5. Submissions & GitHub Sync Queue Log
CREATE TABLE IF NOT EXISTS user_submissions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  language TEXT DEFAULT 'python',
  source_code TEXT NOT NULL,
  status TEXT NOT NULL,
  runtime_ms INTEGER,
  github_commit_sha TEXT,
  github_commit_url TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- 6. Official GATE PYQ Vault (2007-2026)
CREATE TABLE IF NOT EXISTS gate_pyqs (
  id TEXT PRIMARY KEY,
  unit_id TEXT NOT NULL REFERENCES units(id),
  topic_id TEXT NOT NULL REFERENCES topics(id),
  exam_year INTEGER NOT NULL,
  organizing_institute TEXT NOT NULL,
  paper_set TEXT DEFAULT 'Set-1',
  section_name TEXT NOT NULL,                 -- 'GA' | 'CS'
  question_number INTEGER NOT NULL,
  question_type TEXT NOT NULL,                -- 'MCQ' | 'MSQ' | 'NAT'
  marks INTEGER NOT NULL,
  negative_marks REAL NOT NULL,
  official_answer_key_json TEXT NOT NULL,
  question_md TEXT NOT NULL,
  diagram_r2_url TEXT,
  c_code_snippet TEXT,
  shortcut_30s_md TEXT NOT NULL,
  full_solution_md TEXT NOT NULL,
  official_pdf_url TEXT NOT NULL
);

-- 7. Mascot Dialogues & Stealth Admin Audit Log
CREATE TABLE IF NOT EXISTS dialogues (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,                     -- 'HAZARD_FLIRT'|'WEATHER_FLIRT'|'SMOOTH_LOGIC'|'DUO_ROAST'|'STREAK_HYPE'
  trigger_event TEXT NOT NULL,
  tone_level TEXT NOT NULL,
  text TEXT NOT NULL,
  mascot_pose TEXT DEFAULT 'wink',
  weight INTEGER DEFAULT 10,
  is_active INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS admin_audit_log (
  id TEXT PRIMARY KEY,
  admin_email TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  before_json TEXT,
  after_json TEXT,
  ip_address TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
