import { StreakRewardTier } from '@/types';

export const STREAK_REWARD_TIERS: StreakRewardTier[] = [
  {
    days: 3,
    name: 'Spark Starter',
    icon: '🔥',
    unlocks: [
      '+50 Bonus XP',
      '🥉 Bronze Flame Badge on profile'
    ],
    badgeId: 'spark_starter'
  },
  {
    days: 7,
    name: 'Weekly Warrior',
    icon: '🔥',
    unlocks: [
      '+1 Free Streak Freeze (🧊) (max inventory: 3)',
      '⚡ Neon Green Editor Cursor & Syntax Theme',
      '🦉 "Savage Roast+" Mascot Dialogue Pack'
    ],
    badgeId: 'weekly_warrior'
  },
  {
    days: 14,
    name: 'Fortnight Force',
    icon: '🔥',
    unlocks: [
      '+200 Bonus XP',
      '🌧️ Rainy Lo-Fi Focus Theme (animated rain overlay + built-in ambient coding synth)',
      '🛡️ Silver Shield Badge'
    ],
    themeUnlock: 'rainy_lofi',
    badgeId: 'fortnight_force'
  },
  {
    days: 30,
    name: 'Monthly Master',
    icon: '🔥',
    unlocks: [
      '+1 Free Streak Freeze (🧊) + +500 Bonus XP',
      '👑 Gold Crown Profile Avatar Frame',
      '1-Click High-Res Certificate/Brag Card for LinkedIn & Instagram Stories'
    ],
    badgeId: 'monthly_master'
  },
  {
    days: 50,
    name: 'Half-Century Hacker',
    icon: '🔥',
    unlocks: [
      '🎨 Cyberpunk & Retro-Terminal IDE Themes',
      'Permanent 1.25x XP multiplier while streak remains active'
    ],
    themeUnlock: 'cyberpunk',
    multiplier: 1.25,
    badgeId: 'half_century_hacker'
  },
  {
    days: 100,
    name: 'Centurion Legend',
    icon: '🔥',
    unlocks: [
      '💎 Diamond Animated Flame in navbar & public profile',
      'Hall of Fame Placement on learn.articlarity.com/hall-of-fame',
      'Permanent 1.5x XP multiplier'
    ],
    multiplier: 1.5,
    badgeId: 'centurion_legend'
  },
  {
    days: 365,
    name: 'Articlarity Immortal',
    icon: '🔥',
    unlocks: [
      '🌌 Cosmic Aurora Profile Theme + Exclusive "365 Club" Verified Badge'
    ],
    badgeId: 'articlarity_immortal'
  }
];
