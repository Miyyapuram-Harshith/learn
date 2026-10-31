'use client';

import { UserProfile, DailyActivity, MascotTone, ActiveTheme, MascotPose, Dialogue } from '@/types';
import { SEED_DIALOGUES } from '@/data/dialogues';
import { MASTER_BADGES } from '@/data/badges';

const STORAGE_KEY_USER = 'articlarity_user_v7';
const STORAGE_KEY_ACTIVITY = 'articlarity_activity_v7';
const STORAGE_KEY_RECENT_DIALOGUES = 'articlarity_recent_dialogues_v7';

// Default guest profile
const DEFAULT_GUEST: UserProfile = {
  id: 'guest_user',
  username: 'harshith',
  name: 'Harshith',
  email: 'harshith@articlarity.com',
  phone_number: '+919876543210',
  dob: '2004-10-31',
  place: 'Jagtial · SR University',
  xp_total: 1450,
  current_streak: 15,
  longest_streak: 28,
  last_active_local_date: '2026-10-31',
  streak_freezes: 2,
  combo_max_reached: 8,
  timezone: 'Asia/Kolkata',
  mascot_tone: 'playful',
  active_theme: 'default',
  is_public_profile: true,
  github_username: 'Miyyapuram-Harshith',
  github_repo_name: 'articlarity-dsa-solutions',
  github_auto_commit: true,
  created_at: '2026-01-15T00:00:00Z',
  updated_at: '2026-10-31T00:00:00Z'
};

// Generate 365 days of activity for realistic heatmaps
export function generateInitial365Activity(userId: string): DailyActivity[] {
  const activities: DailyActivity[] = [];
  const today = new Date('2026-10-31T00:00:00Z');
  
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Deterministic pseudo-randomness for SSR purity
    const rand1 = ((i * 9301 + 49297) % 233280) / 233280;
    const rand2 = ((i * 12345 + 67891) % 233280) / 233280;

    const isRecentStreak = i <= 15;
    const isRandomActive = rand1 > 0.45;
    const isFreeze = i === 9; // Used streak freeze 9 days ago
    const isBoss = i === 14 || i === 45 || i === 90;

    let dsa = 0;
    let gate = 0;
    let steps = 0;
    let commits = 0;
    let xp = 0;

    if (isFreeze) {
      // Freeze day
      activities.push({
        user_id: userId,
        activity_date: dateStr,
        dsa_solved_count: 0,
        gate_pyq_solved_count: 0,
        steps_completed_count: 0,
        github_commits_count: 0,
        xp_earned: 0,
        used_streak_freeze: true,
        is_boss_day: false
      });
      continue;
    }

    if (isRecentStreak || isRandomActive) {
      dsa = Math.floor(rand2 * 4) + 1;
      gate = Math.floor(rand1 * 5);
      steps = dsa * 3 + gate * 2;
      commits = dsa > 0 ? Math.floor(rand2 * 3) + 1 : 0;
      xp = dsa * 10 + gate * 3 + commits * 5 + steps * 1;
      if (isBoss) xp += 100;
    }

    activities.push({
      user_id: userId,
      activity_date: dateStr,
      dsa_solved_count: dsa,
      gate_pyq_solved_count: gate,
      steps_completed_count: steps,
      github_commits_count: commits,
      xp_earned: xp,
      used_streak_freeze: false,
      is_boss_day: isBoss
    });
  }

  return activities;
}

// User Profile Storage Helper
export function getUserProfile(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_GUEST;
  try {
    const stored = localStorage.getItem(STORAGE_KEY_USER);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(DEFAULT_GUEST));
      return DEFAULT_GUEST;
    }
    return JSON.parse(stored);
  } catch {
    return DEFAULT_GUEST;
  }
}

export function saveUserProfile(user: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user', e);
  }
}

// Daily Activity Helper
export function getUserActivity(userId: string): DailyActivity[] {
  if (typeof window === 'undefined') return generateInitial365Activity(userId);
  try {
    const stored = localStorage.getItem(STORAGE_KEY_ACTIVITY);
    if (!stored) {
      const initial = generateInitial365Activity(userId);
      localStorage.setItem(STORAGE_KEY_ACTIVITY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(stored);
  } catch {
    return generateInitial365Activity(userId);
  }
}

export function recordActivity(
  userId: string,
  dsaCount = 0,
  gateCount = 0,
  stepCount = 1,
  xpEarned = 15,
  commits = 1
): void {
  if (typeof window === 'undefined') return;
  const activities = getUserActivity(userId);
  const todayStr = new Date().toISOString().split('T')[0];
  const idx = activities.findIndex(a => a.activity_date === todayStr);

  if (idx >= 0) {
    activities[idx].dsa_solved_count += dsaCount;
    activities[idx].gate_pyq_solved_count += gateCount;
    activities[idx].steps_completed_count += stepCount;
    activities[idx].github_commits_count += commits;
    activities[idx].xp_earned += xpEarned;
  } else {
    activities.push({
      user_id: userId,
      activity_date: todayStr,
      dsa_solved_count: dsaCount,
      gate_pyq_solved_count: gateCount,
      steps_completed_count: stepCount,
      github_commits_count: commits,
      xp_earned: xpEarned,
      used_streak_freeze: false
    });
  }

  localStorage.setItem(STORAGE_KEY_ACTIVITY, JSON.stringify(activities));

  // Also update user profile streak and xp
  const user = getUserProfile();
  user.xp_total += xpEarned;
  if (user.last_active_local_date !== todayStr) {
    user.current_streak += 1;
    if (user.current_streak > user.longest_streak) {
      user.longest_streak = user.current_streak;
    }
    user.last_active_local_date = todayStr;
  }
  saveUserProfile(user);
}

// Anti-Spam & Frustration Guard Dialogue Selector
let failCount = 0;
let lastToastTimestamp = 0;

export function triggerMascotDialogue(
  triggerEvent: string,
  userTone: MascotTone
): { dialogue: Dialogue; isFrustrationIntervention: boolean } | null {
  if (typeof window === 'undefined') return null;

  const now = Date.now();
  // 20-second cooldown on repetitive non-success triggers
  if (!triggerEvent.includes('Pass') && !triggerEvent.includes('Streak') && now - lastToastTimestamp < 20000) {
    return null;
  }

  // Frustration guard: After 3 consecutive failed runs or 2 timeouts
  let isFrustration = false;
  if (triggerEvent === 'onSyntaxError' || triggerEvent === 'onIndexError' || triggerEvent === 'onTimeout') {
    failCount++;
    if (failCount >= 3) {
      isFrustration = true;
      triggerEvent = 'onFrustrationGuard';
    }
  } else if (triggerEvent.includes('Pass')) {
    failCount = 0;
  }

  let recentIds: string[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RECENT_DIALOGUES);
    recentIds = raw ? JSON.parse(raw) : [];
  } catch {}

  // Filter dialogues by tone and event
  let candidates = SEED_DIALOGUES.filter(d => {
    if (isFrustration) return d.trigger_event === 'onFrustrationGuard';
    // Match tone or gentle fallback
    const toneMatch = userTone === 'flirty' ? true : d.tone_level === userTone || d.tone_level === 'playful';
    const eventMatch = d.trigger_event === triggerEvent || d.trigger_event.toLowerCase().includes(triggerEvent.toLowerCase());
    return toneMatch && eventMatch && !recentIds.includes(d.id);
  });

  if (candidates.length === 0) {
    // Relax recent filter if exhausted
    candidates = SEED_DIALOGUES.filter(d => d.tone_level === userTone || d.tone_level === 'playful');
  }

  if (candidates.length === 0) return null;

  const selected = candidates[Math.floor(Math.random() * candidates.length)];

  // Update recent IDs (window size 25)
  recentIds.push(selected.id);
  if (recentIds.length > 25) recentIds.shift();
  try {
    localStorage.setItem(STORAGE_KEY_RECENT_DIALOGUES, JSON.stringify(recentIds));
  } catch {}

  lastToastTimestamp = now;
  return { dialogue: selected, isFrustrationIntervention: isFrustration };
}

// Procedural Web Audio Synth for Lo-Fi & UI Sound Effects (Zero External Asset Dependencies!)
let audioCtx: AudioContext | null = null;
let rainNode: AudioNode | null = null;
let isAudioPlaying = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playTactileClick(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {}
}

export function playSuccessChime(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.08, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.3);
    });
  } catch {}
}

// Procedural Lo-Fi Rain & Electric Piano Ambient Generator
let loFiInterval: ReturnType<typeof setInterval> | null = null;

export function toggleLoFiSynth(enable: boolean): boolean {
  try {
    const ctx = getAudioContext();
    if (!ctx) return false;

    if (!enable) {
      if (rainNode) {
        rainNode.disconnect();
        rainNode = null;
      }
      if (loFiInterval) {
        clearInterval(loFiInterval);
        loFiInterval = null;
      }
      isAudioPlaying = false;
      return false;
    }

    // 1. Procedural Pink Rain Noise
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
      b6 = white * 0.115926;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800; // Muffled calming rain sound

    const rainGain = ctx.createGain();
    rainGain.gain.value = 0.18;

    whiteNoise.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(ctx.destination);
    whiteNoise.start();
    rainNode = rainGain;

    // 2. Gentle Procedural Lo-Fi Chords (Fmaj7 -> Em7 -> Dm7 -> Cmaj7)
    const chordProgressions = [
      [349.23, 440.0, 523.25, 659.25], // Fmaj7
      [329.63, 392.0, 493.88, 587.33], // Em7
      [293.66, 349.23, 440.0, 523.25], // Dm7
      [261.63, 329.63, 392.0, 493.88]  // Cmaj7
    ];
    let chordIdx = 0;

    const playChord = () => {
      const now = ctx.currentTime;
      const notes = chordProgressions[chordIdx % chordProgressions.length];
      chordIdx++;

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const chordGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);

        chordGain.gain.setValueAtTime(0.025, now + i * 0.05);
        chordGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 3.5);

        osc.connect(chordGain);
        chordGain.connect(ctx.destination);

        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 3.8);
      });
    };

    playChord();
    loFiInterval = setInterval(playChord, 4000);
    isAudioPlaying = true;
    return true;
  } catch (e) {
    console.error('Lo-fi synth error', e);
    return false;
  }
}
