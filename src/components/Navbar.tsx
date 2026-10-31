'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Flame, 
  Sparkles, 
  Code2, 
  BookOpen, 
  GraduationCap, 
  Volume2, 
  VolumeX, 
  CloudRain, 
  User, 
  Heart,
  Smile,
  Shield
} from 'lucide-react';
import { 
  getUserProfile, 
  saveUserProfile, 
  toggleLoFiSynth, 
  playTactileClick 
} from '@/lib/store';
import { MascotTone, ActiveTheme, UserProfile } from '@/types';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoFiActive, setIsLoFiActive] = useState(false);
  const [showVibeMenu, setShowVibeMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  useEffect(() => {
    const profile = getUserProfile();
    setUser(profile);
    document.documentElement.setAttribute('data-theme', profile.active_theme);
  }, []);

  const handleVibeChange = (newTone: MascotTone) => {
    playTactileClick();
    if (!user) return;
    const updated = { ...user, mascot_tone: newTone };
    setUser(updated);
    saveUserProfile(updated);
    setShowVibeMenu(false);
  };

  const handleThemeChange = (newTheme: ActiveTheme) => {
    playTactileClick();
    if (!user) return;
    const updated = { ...user, active_theme: newTheme };
    setUser(updated);
    saveUserProfile(updated);
    document.documentElement.setAttribute('data-theme', newTheme);
    setShowThemeMenu(false);

    if (newTheme === 'rainy_lofi' && !isLoFiActive) {
      const started = toggleLoFiSynth(true);
      setIsLoFiActive(started);
    }
  };

  const handleSoundToggle = () => {
    playTactileClick();
    const newState = !isLoFiActive;
    const result = toggleLoFiSynth(newState);
    setIsLoFiActive(result);
  };

  const currentStreak = user?.current_streak ?? 15;
  const streakFreezes = user?.streak_freezes ?? 2;
  const xp = user?.xp_total ?? 1450;
  const username = user?.username ?? 'harshith';
  const tone = user?.mascot_tone ?? 'playful';
  const theme = user?.active_theme ?? 'default';

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(7, 10, 19, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0.75rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem'
    }}>
      {/* Brand Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Link 
          href="/" 
          onClick={playTactileClick}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px rgba(34, 197, 94, 0.35)'
          }}>
            <Code2 size={18} color="#052e16" strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Articlarity
          </span>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            padding: '0.15rem 0.5rem',
            borderRadius: '999px',
            background: 'rgba(34, 197, 94, 0.15)',
            color: '#4ade80',
            border: '1px solid rgba(74, 222, 128, 0.3)'
          }}>
            LEARN
          </span>
        </Link>

        {/* Primary Track Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Link
            href="/dsa-python"
            onClick={playTactileClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '0.6rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: pathname.startsWith('/dsa-python') ? '#4ade80' : 'var(--text-muted)',
              background: pathname.startsWith('/dsa-python') ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
              transition: 'all 0.15s'
            }}
          >
            <BookOpen size={16} />
            <span>Python DSA</span>
          </Link>

          <Link
            href="/gate"
            onClick={playTactileClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '0.6rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: pathname.startsWith('/gate') ? '#38bdf8' : 'var(--text-muted)',
              background: pathname.startsWith('/gate') ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
              transition: 'all 0.15s'
            }}
          >
            <GraduationCap size={16} />
            <span>GATE CS 2027</span>
          </Link>

          <Link
            href="/compiler"
            onClick={playTactileClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '0.6rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: pathname === '/compiler' ? '#f59e0b' : 'var(--text-muted)',
              background: pathname === '/compiler' ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
              transition: 'all 0.15s'
            }}
          >
            <Code2 size={16} />
            <span>Zero-Login Compiler</span>
          </Link>
        </nav>
      </div>

      {/* Right Controls: Mascot Vibe, Theme, Ambient Audio, Streak Pill, Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Mascot Vibe Selector */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => { playTactileClick(); setShowVibeMenu(!showVibeMenu); }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              padding: '0.4rem 0.75rem',
              borderRadius: '0.6rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            {tone === 'playful' && <span>🦉 Savage</span>}
            {tone === 'flirty' && <span style={{ color: '#fb7185' }}>🔥 Flirty</span>}
            {tone === 'gentle' && <span style={{ color: '#4ade80' }}>🌱 Gentle</span>}
          </button>

          {showVibeMenu && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '110%',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '0.75rem',
              padding: '0.5rem',
              minWidth: '170px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              zIndex: 60
            }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-dim)', padding: '0.25rem 0.5rem' }}>
                MASCOT VIBE MODE
              </div>
              <button
                onClick={() => handleVibeChange('playful')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 0.6rem',
                  borderRadius: '0.4rem',
                  background: tone === 'playful' ? 'rgba(255,255,255,0.08)' : 'transparent',
                  border: 'none',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.85rem'
                }}
              >
                <Smile size={15} color="#38bdf8" />
                <span>🦉 Savage / Playful</span>
              </button>
              <button
                onClick={() => handleVibeChange('flirty')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 0.6rem',
                  borderRadius: '0.4rem',
                  background: tone === 'flirty' ? 'rgba(251, 113, 133, 0.15)' : 'transparent',
                  border: 'none',
                  color: '#fb7185',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.85rem'
                }}
              >
                <Heart size={15} color="#fb7185" />
                <span>🔥 Flirty (Opt-In)</span>
              </button>
              <button
                onClick={() => handleVibeChange('gentle')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 0.6rem',
                  borderRadius: '0.4rem',
                  background: tone === 'gentle' ? 'rgba(74, 222, 128, 0.15)' : 'transparent',
                  border: 'none',
                  color: '#4ade80',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.85rem'
                }}
              >
                <Shield size={15} color="#4ade80" />
                <span>🌱 Gentle & Helpful</span>
              </button>
            </div>
          )}
        </div>

        {/* Theme Selector Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => { playTactileClick(); setShowThemeMenu(!showThemeMenu); }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              padding: '0.4rem 0.65rem',
              borderRadius: '0.6rem',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            {theme === 'default' && <span>🌌 Default</span>}
            {theme === 'rainy_lofi' && <span>🌧️ Rainy Lo-Fi</span>}
            {theme === 'cyberpunk' && <span>⚡ Cyberpunk</span>}
          </button>

          {showThemeMenu && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '110%',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '0.75rem',
              padding: '0.5rem',
              minWidth: '160px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              zIndex: 60
            }}>
              <button
                onClick={() => handleThemeChange('default')}
                style={{
                  padding: '0.45rem 0.6rem',
                  borderRadius: '0.4rem',
                  background: theme === 'default' ? 'rgba(255,255,255,0.08)' : 'transparent',
                  border: 'none',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.85rem'
                }}
              >
                🌌 Obsidian Default
              </button>
              <button
                onClick={() => handleThemeChange('rainy_lofi')}
                style={{
                  padding: '0.45rem 0.6rem',
                  borderRadius: '0.4rem',
                  background: theme === 'rainy_lofi' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                  border: 'none',
                  color: '#38bdf8',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.85rem'
                }}
              >
                🌧️ Rainy Lo-Fi Focus
              </button>
              <button
                onClick={() => handleThemeChange('cyberpunk')}
                style={{
                  padding: '0.45rem 0.6rem',
                  borderRadius: '0.4rem',
                  background: theme === 'cyberpunk' ? 'rgba(236, 72, 153, 0.15)' : 'transparent',
                  border: 'none',
                  color: '#f43f5e',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.85rem'
                }}
              >
                ⚡ Cyberpunk Terminal
              </button>
            </div>
          )}
        </div>

        {/* Ambient Procedural Sound Synth Toggle */}
        <button
          onClick={handleSoundToggle}
          title={isLoFiActive ? 'Mute Lo-Fi Rain & Piano' : 'Play Lo-Fi Rain & Soft Piano Ambient'}
          style={{
            background: isLoFiActive ? 'rgba(56, 189, 248, 0.2)' : 'var(--bg-card)',
            border: `1px solid ${isLoFiActive ? '#38bdf8' : 'var(--border-color)'}`,
            color: isLoFiActive ? '#38bdf8' : 'var(--text-muted)',
            padding: '0.4rem 0.6rem',
            borderRadius: '0.6rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}
        >
          {isLoFiActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
          <CloudRain size={14} />
        </button>

        {/* Streak Pill & Freeze Inventory */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'rgba(245, 158, 11, 0.12)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          padding: '0.35rem 0.75rem',
          borderRadius: '999px'
        }}>
          <span className="flame-active" style={{ fontSize: '1.05rem' }}>🔥</span>
          <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#fbbf24' }}>
            {currentStreak}
          </span>
          <span title={`Available Streak Freezes: ${streakFreezes}/3`} style={{ fontSize: '0.85rem', marginLeft: '0.2rem', cursor: 'help' }}>
            🧊{streakFreezes}
          </span>
        </div>

        {/* XP Counter */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          background: 'rgba(34, 197, 94, 0.12)',
          border: '1px solid rgba(74, 222, 128, 0.3)',
          padding: '0.35rem 0.75rem',
          borderRadius: '999px',
          fontWeight: 800,
          fontSize: '0.85rem',
          color: '#4ade80'
        }}>
          <Sparkles size={14} />
          <span>{xp} XP</span>
        </div>

        {/* User Profile */}
        <Link
          href={`/u/${username}`}
          onClick={playTactileClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '0.6rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--text-main)'
          }}
        >
          <User size={15} color="#38bdf8" />
          <span>@{username}</span>
        </Link>
      </div>
    </header>
  );
};
