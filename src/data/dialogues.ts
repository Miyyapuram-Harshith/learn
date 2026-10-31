import { Dialogue } from '@/types';

export const SEED_DIALOGUES: Dialogue[] = [
  // Category 1: Hazard & Warning Flirt
  {
    id: 'hazard_1',
    category: 'HAZARD_FLIRT',
    trigger_event: 'onSyntaxError',
    tone_level: 'flirty',
    text: 'Caution: Sharp turns ahead. I think my heart just did a flip when you walked by.',
    mascot_pose: 'flirty',
    weight: 10
  },
  {
    id: 'hazard_2',
    category: 'HAZARD_FLIRT',
    trigger_event: 'onIndexError',
    tone_level: 'flirty',
    text: 'Fragile: Handle with care. My heart is easily broken, and you just made it skip a beat.',
    mascot_pose: 'flirty',
    weight: 10
  },
  {
    id: 'hazard_3',
    category: 'HAZARD_FLIRT',
    trigger_event: 'onRecursionError',
    tone_level: 'flirty',
    text: 'Warning: High voltage. The chemistry between us is genuinely shocking.',
    mascot_pose: 'flirty',
    weight: 10
  },
  {
    id: 'hazard_4',
    category: 'HAZARD_FLIRT',
    trigger_event: 'onTrapWarning',
    tone_level: 'flirty',
    text: "Slippery when wet? More like slippery when you're around, because I am completely sliding into your DMs.",
    mascot_pose: 'wink',
    weight: 10
  },
  {
    id: 'hazard_5',
    category: 'HAZARD_FLIRT',
    trigger_event: 'onRuntimeError',
    tone_level: 'flirty',
    text: "Danger: Falling objects. Specifically, me. I'm falling hard for you.",
    mascot_pose: 'flirty',
    weight: 10
  },

  // Category 2: Weather & Rain Flirt
  {
    id: 'rain_1',
    category: 'WEATHER_FLIRT',
    trigger_event: 'onHintUsed',
    tone_level: 'flirty',
    text: "I know the streets are slippery, but I'd risk them any day for a chance at you.",
    mascot_pose: 'wink',
    weight: 10
  },
  {
    id: 'rain_2',
    category: 'WEATHER_FLIRT',
    trigger_event: 'onSlowRun',
    tone_level: 'flirty',
    text: "I know the rain is falling, but you’re making me fall way harder.",
    mascot_pose: 'flirty',
    weight: 10
  },
  {
    id: 'rain_3',
    category: 'WEATHER_FLIRT',
    trigger_event: 'onRainyTheme',
    tone_level: 'flirty',
    text: 'Is it raining, or are you just making this atmosphere dangerously attractive?',
    mascot_pose: 'flirty',
    weight: 10
  },
  {
    id: 'rain_4',
    category: 'WEATHER_FLIRT',
    trigger_event: 'onRainyTheme',
    tone_level: 'flirty',
    text: "I'd gladly get caught in a storm if it meant sharing an umbrella with you.",
    mascot_pose: 'wink',
    weight: 10
  },

  // Category 3: Smooth & Playful Logic
  {
    id: 'smooth_1',
    category: 'SMOOTH_LOGIC',
    trigger_event: 'onPassOptimal',
    tone_level: 'playful',
    text: 'Are you a bank loan? Because you’ve definitely got my interest.',
    mascot_pose: 'wink',
    weight: 10
  },
  {
    id: 'smooth_2',
    category: 'SMOOTH_LOGIC',
    trigger_event: 'onGitHubPush',
    tone_level: 'playful',
    text: 'Let’s flip a coin. Heads, I’m yours. Tails, you’re mine.',
    mascot_pose: 'smug',
    weight: 10
  },
  {
    id: 'smooth_3',
    category: 'SMOOTH_LOGIC',
    trigger_event: 'onStreakExtend',
    tone_level: 'playful',
    text: 'Do you have a map? Because I just got completely lost in your eyes.',
    mascot_pose: 'flirty',
    weight: 10
  },
  {
    id: 'smooth_4',
    category: 'SMOOTH_LOGIC',
    trigger_event: 'onPassOptimal',
    tone_level: 'playful',
    text: 'Are you Google? Because you are everything I’ve been searching for.',
    mascot_pose: 'wink',
    weight: 10
  },
  {
    id: 'smooth_5',
    category: 'SMOOTH_LOGIC',
    trigger_event: 'onStreakExtend',
    tone_level: 'playful',
    text: 'If being beautiful was a crime, you’d be serving a life sentence.',
    mascot_pose: 'proud',
    weight: 10
  },

  // Category 4: Classic Duo-Style Coding Roasts
  {
    id: 'roast_1',
    category: 'DUO_ROAST',
    trigger_event: 'onPassBruteForce',
    tone_level: 'playful',
    text: 'Did I teach you that? Because I explicitly remember showing you a Hash Map 3 minutes ago.',
    mascot_pose: 'smug',
    weight: 10
  },
  {
    id: 'roast_2',
    category: 'DUO_ROAST',
    trigger_event: 'onTimeout',
    tone_level: 'playful',
    text: 'Nested loops again? Bold strategy. Let’s see if your CPU survives.',
    mascot_pose: 'shocked',
    weight: 10
  },
  {
    id: 'roast_3',
    category: 'DUO_ROAST',
    trigger_event: 'onIdle60s',
    tone_level: 'playful',
    text: "Still staring at the screen? The array won't sort itself, bestie.",
    mascot_pose: 'thinking',
    weight: 10
  },
  {
    id: 'roast_4',
    category: 'DUO_ROAST',
    trigger_event: 'onPassBruteForce',
    tone_level: 'playful',
    text: 'That O(N²) loop is so slow it just asked me for retirement benefits.',
    mascot_pose: 'smug',
    weight: 10
  },
  {
    id: 'roast_5',
    category: 'DUO_ROAST',
    trigger_event: 'onMissingColon',
    tone_level: 'playful',
    text: 'Did Python offend you? Because skipping colons is a direct personal insult to Guido van Rossum.',
    mascot_pose: 'smug',
    weight: 10
  },

  // Gentle Tone Fallbacks & Frustration Guard Lines
  {
    id: 'gentle_1',
    category: 'SMOOTH_LOGIC',
    trigger_event: 'onPassOptimal',
    tone_level: 'gentle',
    text: 'Incredible work! Your algorithmic intuition is sharpening by the minute. Keep shining! ✨',
    mascot_pose: 'proud',
    weight: 10
  },
  {
    id: 'gentle_2',
    category: 'SMOOTH_LOGIC',
    trigger_event: 'onStreakExtend',
    tone_level: 'gentle',
    text: 'Another day, another step forward. Your consistency is your superpower!',
    mascot_pose: 'proud',
    weight: 10
  },
  {
    id: 'gentle_support_1',
    category: 'HAZARD_FLIRT',
    trigger_event: 'onFrustrationGuard',
    tone_level: 'gentle',
    text: "Take a deep breath! Bugs are just proof that you're tackling hard problems. Check your base case or pointer increment.",
    mascot_pose: 'thinking',
    weight: 10
  },
  {
    id: 'gentle_support_2',
    category: 'HAZARD_FLIRT',
    trigger_event: 'onFrustrationGuard',
    tone_level: 'gentle',
    text: 'Even senior engineers get stuck here. Try dry-running with a 2-element example on paper!',
    mascot_pose: 'wink',
    weight: 10
  }
];
