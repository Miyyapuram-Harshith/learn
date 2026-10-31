'use client';

import React, { useState } from 'react';
import { MASTER_BADGES } from '@/data/badges';
import { Badge, BadgeCategory } from '@/types';
import { Lock, Sparkles, Trophy } from 'lucide-react';
import { playTactileClick } from '@/lib/store';

interface BadgeCabinetProps {
  unlockedBadgeIds?: string[];
}

export const BadgeCabinet: React.FC<BadgeCabinetProps> = ({ 
  unlockedBadgeIds = ['first_run', 'git_linked', 'opt_wizard', 'two_ptr_boss', 'gate_starter', 'night_owl'] 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeBadge, setActiveBadge] = useState<Badge | null>(null);

  const categories: string[] = ['All', 'Onboarding', 'GitHub', 'DSA Mastery', 'GATE 2027', 'Skill', 'Accuracy', 'Lifestyle', 'Special'];

  const filteredBadges = selectedCategory === 'All' 
    ? MASTER_BADGES 
    : MASTER_BADGES.filter(b => b.category === selectedCategory);

  const unlockedCount = MASTER_BADGES.filter(b => unlockedBadgeIds.includes(b.id)).length;

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trophy size={20} color="#fbbf24" />
            <span>Master Achievement Trophy Cabinet</span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Unlocked {unlockedCount} of {MASTER_BADGES.length} Badges • Stored in D1 & Cached in Edge KV
          </p>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { playTactileClick(); setSelectedCategory(cat); }}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '0.3rem 0.65rem',
                borderRadius: '0.5rem',
                background: selectedCategory === cat ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedCategory === cat ? '#38bdf8' : 'var(--text-muted)',
                border: `1px solid ${selectedCategory === cat ? '#38bdf8' : 'var(--border-color)'}`,
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Badges */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
        gap: '0.85rem'
      }}>
        {filteredBadges.map(badge => {
          const isUnlocked = unlockedBadgeIds.includes(badge.id);

          return (
            <div
              key={badge.id}
              onClick={() => { playTactileClick(); setActiveBadge(badge); }}
              style={{
                padding: '1rem',
                borderRadius: '0.75rem',
                background: isUnlocked ? 'var(--bg-card-hover)' : 'rgba(15, 23, 42, 0.4)',
                border: isUnlocked ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-color)',
                boxShadow: isUnlocked ? '0 4px 12px rgba(245, 158, 11, 0.15)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                position: 'relative',
                opacity: isUnlocked ? 1 : 0.65
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.8rem', filter: isUnlocked ? 'none' : 'grayscale(100%)' }}>
                  {badge.icon_name}
                </span>
                {isUnlocked ? (
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: '#fbbf24',
                    background: 'rgba(245, 158, 11, 0.15)',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(245, 158, 11, 0.3)'
                  }}>
                    UNLOCKED
                  </span>
                ) : (
                  <Lock size={14} color="var(--text-dim)" />
                )}
              </div>

              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem', color: isUnlocked ? '#f8fafc' : 'var(--text-muted)' }}>
                {badge.title}
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.5rem', minHeight: '34px' }}>
                {badge.description}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.4rem' }}>
                <span style={{ color: 'var(--text-dim)' }}>{badge.category}</span>
                <span style={{ color: '#4ade80', fontWeight: 700 }}>+{badge.xp_bonus} XP</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {activeBadge && (
        <div 
          onClick={() => setActiveBadge(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(6px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="glass-panel" 
            style={{ maxWidth: '420px', width: '100%', padding: '2rem', textAlign: 'center' }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>
              {activeBadge.icon_name}
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              {activeBadge.title}
            </h2>
            <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 700, marginBottom: '1rem' }}>
              {activeBadge.category} • +{activeBadge.xp_bonus} XP Bonus
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              {activeBadge.description}
            </p>
            <button
              className="btn-3d btn-3d-cyan"
              style={{ width: '100%' }}
              onClick={() => setActiveBadge(null)}
            >
              Close Trophy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
