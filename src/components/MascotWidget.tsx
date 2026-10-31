'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, X, MessageSquare, Volume2 } from 'lucide-react';
import { 
  getUserProfile, 
  triggerMascotDialogue, 
  playTactileClick 
} from '@/lib/store';
import { MascotPose, Dialogue } from '@/types';

export const MascotWidget: React.FC = () => {
  const [currentDialogue, setCurrentDialogue] = useState<Dialogue | null>(null);
  const [pose, setPose] = useState<MascotPose>('wink');
  const [isOpen, setIsOpen] = useState(true);
  const [isFrustrated, setIsFrustrated] = useState(false);

  useEffect(() => {
    // Initial friendly greeting
    const profile = getUserProfile();
    const initial = triggerMascotDialogue('onPassOptimal', profile.mascot_tone);
    if (initial) {
      setCurrentDialogue(initial.dialogue);
      setPose(initial.dialogue.mascot_pose);
      setIsFrustrated(initial.isFrustrationIntervention);
    }

    // Global event listener for custom app triggers (e.g. from code runner or problem solver)
    const handleCustomTrigger = (e: CustomEvent<{ eventName: string }>) => {
      const user = getUserProfile();
      const res = triggerMascotDialogue(e.detail.eventName, user.mascot_tone);
      if (res) {
        setCurrentDialogue(res.dialogue);
        setPose(res.dialogue.mascot_pose);
        setIsFrustrated(res.isFrustrationIntervention);
        setIsOpen(true);
      }
    };

    window.addEventListener('mascot-trigger' as unknown as keyof WindowEventMap, handleCustomTrigger as EventListener);
    return () => {
      window.removeEventListener('mascot-trigger' as unknown as keyof WindowEventMap, handleCustomTrigger as EventListener);
    };
  }, []);

  const handleNextDialogue = () => {
    playTactileClick();
    const user = getUserProfile();
    const triggers = ['onPassOptimal', 'onStreakExtend', 'onPassBruteForce', 'onSlowRun'];
    const randomTrigger = triggers[Math.floor(Math.random() * triggers.length)];
    const res = triggerMascotDialogue(randomTrigger, user.mascot_tone);
    if (res) {
      setCurrentDialogue(res.dialogue);
      setPose(res.dialogue.mascot_pose);
      setIsFrustrated(res.isFrustrationIntervention);
      setIsOpen(true);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 45,
      display: 'flex',
      alignItems: 'flex-end',
      gap: '0.75rem',
      pointerEvents: 'none'
    }}>
      {/* Speech Bubble */}
      {isOpen && currentDialogue && (
        <div style={{
          pointerEvents: 'auto',
          background: isFrustrated ? 'rgba(30, 41, 59, 0.95)' : 'rgba(15, 23, 42, 0.95)',
          border: `1px solid ${isFrustrated ? '#f59e0b' : 'rgba(56, 189, 248, 0.4)'}`,
          boxShadow: isFrustrated ? '0 10px 30px rgba(245, 158, 11, 0.25)' : '0 10px 30px rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          padding: '0.85rem 1rem',
          borderRadius: '1rem',
          borderBottomRightRadius: '0.2rem',
          maxWidth: '320px',
          animation: 'fadeIn 0.25s ease-out',
          color: '#f8fafc',
          position: 'relative'
        }}>
          {/* Header pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.4rem',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingBottom: '0.3rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: isFrustrated ? '#fbbf24' : '#38bdf8' }}>
                Arti {isFrustrated ? '• Supportive Mode 🛡️' : '• Companion 🦉'}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={14} />
            </button>
          </div>

          <p style={{
            fontSize: '0.875rem',
            lineHeight: 1.45,
            fontWeight: 500,
            color: '#e2e8f0'
          }}>
            "{currentDialogue.text}"
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '0.5rem',
            gap: '0.5rem'
          }}>
            <button
              onClick={handleNextDialogue}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '0.25rem 0.5rem',
                borderRadius: '0.4rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <Sparkles size={11} />
              <span>Poke Arti</span>
            </button>
          </div>
        </div>
      )}

      {/* Mascot Avatar Icon Button */}
      <button
        onClick={() => {
          if (!isOpen) setIsOpen(true);
          else handleNextDialogue();
        }}
        title="Arti - Articlarity mascot companion"
        style={{
          pointerEvents: 'auto',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          border: '2px solid #38bdf8',
          boxShadow: '0 0 20px rgba(56, 189, 248, 0.35), 0 4px 0 #0284c7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'transform 0.15s ease',
          position: 'relative'
        }}
      >
        {/* SVG Mascot Character (Arti) */}
        <svg width="44" height="44" viewBox="0 0 100 100" fill="none">
          {/* Owl Body */}
          <circle cx="50" cy="50" r="42" fill="#0f172a" stroke="#38bdf8" strokeWidth="4" />
          <path d="M 30 75 Q 50 85 70 75 Q 60 90 40 90 Z" fill="#38bdf8" opacity="0.3" />

          {/* Ears / Feather tufts */}
          <polygon points="25,25 32,8 44,22" fill="#0284c7" />
          <polygon points="75,25 68,8 56,22" fill="#0284c7" />

          {/* Tech Goggles Frame */}
          <rect x="20" y="32" width="60" height="26" rx="13" fill="#1e293b" stroke="#22c55e" strokeWidth="3" />
          <line x1="47" y1="45" x2="53" y2="45" stroke="#22c55e" strokeWidth="3" />

          {/* Left Eye Expression */}
          <circle cx="34" cy="45" r="8" fill="#052e16" />
          {pose === 'wink' ? (
            <path d="M 28 45 Q 34 50 40 45" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
          ) : (
            <circle cx="35" cy="45" r="4" fill="#4ade80" />
          )}

          {/* Right Eye Expression */}
          <circle cx="66" cy="45" r="8" fill="#052e16" />
          {pose === 'flirty' ? (
            <path d="M 62 44 Q 66 40 70 44 Q 66 49 62 44" fill="#fb7185" />
          ) : pose === 'shocked' ? (
            <circle cx="66" cy="45" r="6" fill="#fbbf24" />
          ) : (
            <circle cx="67" cy="45" r="4" fill="#4ade80" />
          )}

          {/* Beak */}
          <polygon points="46,55 54,55 50,64" fill="#f59e0b" />

          {/* Blush or Sparkle */}
          {pose === 'flirty' && (
            <>
              <circle cx="24" cy="58" r="4" fill="#fb7185" opacity="0.7" />
              <circle cx="76" cy="58" r="4" fill="#fb7185" opacity="0.7" />
            </>
          )}
          {pose === 'proud' && (
            <polygon points="50,12 55,20 64,18 58,25 60,33 50,28 40,33 42,25 36,18 45,20" fill="#fbbf24" />
          )}
        </svg>

        {/* Small Active Dot */}
        <span style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: '#22c55e',
          border: '2px solid #070a13'
        }} />
      </button>
    </div>
  );
};
