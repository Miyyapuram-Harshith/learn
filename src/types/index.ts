export type MascotTone = 'gentle' | 'playful' | 'flirty';
export type ActiveTheme = 'default' | 'rainy_lofi' | 'cyberpunk';
export type MascotPose = 'wink' | 'smug' | 'flirty' | 'shocked' | 'thinking' | 'proud';

export interface UserProfile {
  id: string;
  username: string;
  name: string;
  email: string;
  phone_number: string;
  dob: string; // YYYY-MM-DD
  place: string; // City / College
  xp_total: number;
  current_streak: number;
  longest_streak: number;
  last_active_local_date: string;
  streak_freezes: number;
  combo_max_reached: number;
  timezone: string;
  mascot_tone: MascotTone;
  active_theme: ActiveTheme;
  is_public_profile: boolean;
  github_id?: string;
  github_username?: string;
  github_repo_name: string;
  github_auto_commit: boolean;
  created_at: string;
  updated_at: string;
}

export interface DailyActivity {
  user_id: string;
  activity_date: string; // YYYY-MM-DD
  dsa_solved_count: number;
  gate_pyq_solved_count: number;
  steps_completed_count: number;
  github_commits_count: number;
  xp_earned: number;
  used_streak_freeze: boolean;
  is_boss_day?: boolean;
}

export type BadgeCategory = 'Onboarding' | 'GitHub' | 'DSA Mastery' | 'GATE 2027' | 'Skill' | 'Accuracy' | 'Lifestyle' | 'Resilience' | 'Special';

export interface Badge {
  id: string;
  title: string;
  icon_name: string;
  category: BadgeCategory;
  description: string;
  xp_bonus: number;
  sort_order: number;
  unlocked_at?: string;
}

export interface StreakRewardTier {
  days: number;
  name: string;
  icon: string;
  unlocks: string[];
  badgeId?: string;
  themeUnlock?: ActiveTheme;
  multiplier?: number;
}

export type DialogueCategory = 'HAZARD_FLIRT' | 'WEATHER_FLIRT' | 'SMOOTH_LOGIC' | 'DUO_ROAST' | 'STREAK_HYPE';

export interface Dialogue {
  id: string;
  category: DialogueCategory;
  trigger_event: string;
  tone_level: MascotTone;
  text: string;
  mascot_pose: MascotPose;
  weight: number;
}

export interface Track {
  id: string;
  slug: string;
  title: string;
  icon: string;
  sort_order: number;
  status: 'published' | 'draft';
  description: string;
}

export interface Unit {
  id: string;
  track_id: string;
  slug: string;
  title: string;
  theme_color: string;
  leetcode_tag_url?: string;
  sort_order: number;
  description?: string;
  total_problems?: number;
}

export interface LeetCodePatternLink {
  step_order: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  target_complexity: string;
  leetcode_url: string;
  problem_slug: string;
}

export interface Topic {
  id: string;
  unit_id: string;
  slug: string;
  title: string;
  leetcode_pattern_links: LeetCodePatternLink[];
  gate_avg_marks?: number;
  sort_order: number;
}

export type StepType = 
  | 'INTUITION'
  | 'DRY_RUN'
  | 'SPOT_BUG'
  | 'PARSONS'
  | 'FILL_BLANK'
  | 'FULL_CODE'
  | 'GATE_MCQ'
  | 'GATE_MSQ'
  | 'GATE_NAT';

export interface Step {
  id: string;
  lesson_id: string;
  step_order: number;
  step_type: StepType;
  title: string;
  content_md: string;
  payload: Record<string, unknown>;
  starter_code?: string;
  solution_code?: string;
  leetcode_example_link?: string;
  hints: string[];
  xp_reward: number;
}

export interface Lesson {
  id: string;
  topic_id: string;
  unit_slug: string;
  slug: string;
  title: string;
  kind: 'dsa_problem' | 'concept_guide' | 'gate_chapter' | 'boss_fight';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  leetcode_problem_number?: number;
  leetcode_url?: string;
  time_complexity?: string;
  space_complexity?: string;
  description: string;
  steps: Step[];
}

export type GateQuestionType = 'MCQ' | 'MSQ' | 'NAT';

export interface GatePYQ {
  id: string;
  unit_id: string;
  unit_name: string;
  topic_id: string;
  exam_year: number;
  organizing_institute: string;
  paper_set: string;
  section_name: 'GA' | 'CS';
  question_number: number;
  question_type: GateQuestionType;
  marks: number;
  negative_marks: number;
  official_answer_key: string[] | { min: number; max: number }[];
  question_md: string;
  options?: { key: string; text: string }[];
  c_code_snippet?: string;
  diagram_svg?: string;
  shortcut_30s_md: string;
  full_solution_md: string;
  official_pdf_url: string;
}

export interface AdminAuditLogEntry {
  id: string;
  admin_email: string;
  action: string;
  entity_type: string;
  entity_id: string;
  before_json?: string;
  after_json?: string;
  ip_address: string;
  created_at: string;
}
