import { Badge } from '@/types';

export const MASTER_BADGES: Badge[] = [
  {
    id: 'first_run',
    title: 'Hello World',
    icon_name: '🚀',
    category: 'Onboarding',
    description: 'Run your first Python or C program in the compiler.',
    xp_bonus: 20,
    sort_order: 1
  },
  {
    id: 'git_linked',
    title: 'Octocat Ally',
    icon_name: '🐙',
    category: 'GitHub',
    description: 'Connect your GitHub account and push your first automated commit.',
    xp_bonus: 50,
    sort_order: 2
  },
  {
    id: 'git_50',
    title: 'Green Wall',
    icon_name: '🟩',
    category: 'GitHub',
    description: 'Push 50 solved problems to your GitHub repository via Articlarity.',
    xp_bonus: 250,
    sort_order: 3
  },
  {
    id: 'opt_wizard',
    title: 'Big-O Sniper',
    icon_name: '⚡',
    category: 'DSA Mastery',
    description: 'Solve 10 DSA problems with optimal O(N) or O(log N) time on the first try.',
    xp_bonus: 150,
    sort_order: 4
  },
  {
    id: 'two_ptr_boss',
    title: 'Pointer Master',
    icon_name: '🏹',
    category: 'DSA Mastery',
    description: 'Complete 100% of the Arrays, Hashing & Two Pointers units + Boss Fight.',
    xp_bonus: 200,
    sort_order: 5
  },
  {
    id: 'tree_whisperer',
    title: 'Tree Whisperer',
    icon_name: '🌲',
    category: 'DSA Mastery',
    description: 'Complete all Trees, BST & Heap lessons without using a Level-3 Hint.',
    xp_bonus: 200,
    sort_order: 6
  },
  {
    id: 'dp_conqueror',
    title: 'Memoization God',
    icon_name: '🧠',
    category: 'DSA Mastery',
    description: 'Conquer the Dynamic Programming unit and its Boss Fight.',
    xp_bonus: 300,
    sort_order: 7
  },
  {
    id: 'no_hints_10',
    title: 'Solo Carry',
    icon_name: '🕶️',
    category: 'Skill',
    description: 'Complete 10 consecutive lessons with 0 hints opened.',
    xp_bonus: 100,
    sort_order: 8
  },
  {
    id: 'combo_8x',
    title: 'Unstoppable 8x',
    icon_name: '🔥',
    category: 'Accuracy',
    description: 'Hit the maximum 8x Combo Multiplier (8 first-try correct steps in a row).',
    xp_bonus: 80,
    sort_order: 9
  },
  {
    id: 'gate_starter',
    title: 'GATE Initiate',
    icon_name: '📐',
    category: 'GATE 2027',
    description: 'Complete your first GATE CS chapter test with ≥ 70% accuracy.',
    xp_bonus: 50,
    sort_order: 10
  },
  {
    id: 'pyq_50',
    title: 'PYQ Archaeologist',
    icon_name: '📚',
    category: 'GATE 2027',
    description: 'Solve 50 official GATE CS Previous Year Questions (2021–2026 vault).',
    xp_bonus: 150,
    sort_order: 11
  },
  {
    id: 'pyq_200',
    title: 'IIT Pattern Breaker',
    icon_name: '🏛️',
    category: 'GATE 2027',
    description: 'Solve 200 official GATE CS PYQs across all 11 syllabus units.',
    xp_bonus: 400,
    sort_order: 12
  },
  {
    id: 'nat_sniper',
    title: 'Keypad Virtuoso',
    icon_name: '🎯',
    category: 'GATE 2027',
    description: 'Answer 15 Numerical Answer Type (NAT) questions in a row without rounding errors.',
    xp_bonus: 150,
    sort_order: 13
  },
  {
    id: 'msq_perfection',
    title: 'All-or-Nothing',
    icon_name: '☑️',
    category: 'GATE 2027',
    description: 'Get 10 Multiple Select Questions (MSQ) 100% right with zero partial-choice slips.',
    xp_bonus: 150,
    sort_order: 14
  },
  {
    id: 'mock_warrior',
    title: '180-Minute Titan',
    icon_name: '⏱️',
    category: 'GATE 2027',
    description: 'Complete a full 65-question, 3-hour GATE CS Mock Test.',
    xp_bonus: 250,
    sort_order: 15
  },
  {
    id: 'calc_ninja',
    title: 'TCS Calc Ninja',
    icon_name: '🧮',
    category: 'GATE 2027',
    description: 'Score 10/10 in the Virtual Scientific Calculator speed-drill mini-game.',
    xp_bonus: 75,
    sort_order: 16
  },
  {
    id: 'night_owl',
    title: 'Midnight Compiler',
    icon_name: '🌙',
    category: 'Lifestyle',
    description: 'Solve a problem or PYQ drill between 00:00 and 03:30 local time.',
    xp_bonus: 50,
    sort_order: 17
  },
  {
    id: 'early_bird',
    title: '5 AM Club',
    icon_name: '🌅',
    category: 'Lifestyle',
    description: 'Complete your daily XP goal before 06:30 local time.',
    xp_bonus: 50,
    sort_order: 18
  },
  {
    id: 'comeback_kid',
    title: 'Mistake Clinic Grad',
    icon_name: '🩹',
    category: 'Resilience',
    description: 'Clear 15 previously failed steps from your Mistake Clinic queue.',
    xp_bonus: 100,
    sort_order: 19
  },
  {
    id: 'birthday_star',
    title: 'Birthday Coder',
    icon_name: '🎂',
    category: 'Special',
    description: 'Log in and solve a problem on your registered Date of Birth (dob).',
    xp_bonus: 200,
    sort_order: 20
  }
];
