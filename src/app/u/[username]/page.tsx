'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  getUserProfile, 
  getUserActivity, 
  saveUserProfile, 
  playTactileClick 
} from '@/lib/store';
import { ActivityHeatmap } from '@/components/ActivityHeatmap';
import { BadgeCabinet } from '@/components/BadgeCabinet';
import { STREAK_REWARD_TIERS } from '@/data/streakRewards';
import { 
  User, 
  MapPin, 
  Calendar, 
  Flame, 
  Sparkles, 
  GitBranch, 
  Share2, 
  Trophy, 
  Award, 
  ExternalLink,
  Cake,
  CheckCircle2,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

function UserProfileContent() {
  const params = useParams();
  const usernameParam = params?.username as string;

  const [user, setUser] = useState(() => getUserProfile());
  const [activities, setActivities] = useState(() => getUserActivity('guest_user'));
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const profile = getUserProfile();
    setUser(profile);
    setActivities(getUserActivity(profile.id));
    const todayMonthDay = new Date().toISOString().slice(5, 10);
    setIsBirthday(profile.dob?.endsWith(todayMonthDay) ?? false);
  }, [usernameParam]);

  const handleShareCard = () => {
    playTactileClick();
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.5 } });
    setShowShareModal(true);
  };

  const handleCopyLink = () => {
    playTactileClick();
    navigator.clipboard.writeText(`https://learn.articlarity.com/u/${user.username}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Birthday Celebration Banner if today is DOB */}
      {isBirthday && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(245, 158, 11, 0.2))',
          border: '1px solid #ec4899',
          borderRadius: '0.75rem',
          padding: '1rem 1.5rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Cake size={28} color="#f43f5e" />
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#f43f5e' }}>
                🎉 Happy Birthday, {user.name}! (2x XP Boost Active)
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Arti has unlocked the special Birthday Coder badge and queued custom birthday toasts for you!
              </div>
            </div>
          </div>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 800,
            background: '#f43f5e',
            color: '#fff',
            padding: '0.35rem 0.85rem',
            borderRadius: '999px'
          }}>
            24H 2X XP MULTIPLIER
          </span>
        </div>
      )}

      {/* Profile Header Hero */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {/* Avatar Frame (Gold Crown on 30+ Day Streaks) */}
            <div style={{
              position: 'relative',
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #22c55e, #38bdf8)',
              padding: '3px',
              boxShadow: '0 0 25px rgba(34, 197, 94, 0.35)'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: '#070a13',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem'
              }}>
                👨‍💻
              </div>
              {user.current_streak >= 30 && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '30px',
                  fontSize: '1.5rem'
                }}>
                  👑
                </div>
              )}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                  {user.name}
                </h1>
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#38bdf8',
                  background: 'rgba(56, 189, 248, 0.15)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '0.4rem',
                  border: '1px solid rgba(56, 189, 248, 0.3)'
                }}>
                  @{user.username}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <MapPin size={15} color="#38bdf8" />
                  <span>{user.place}</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Calendar size={15} color="#4ade80" />
                  <span>DOB: {user.dob}</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <GitBranch size={15} color="#fbbf24" />
                  <span>Repo: {user.github_repo_name}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Brag Card Button */}
          <button
            onClick={handleShareCard}
            className="btn-3d btn-3d-amber"
            style={{ fontSize: '0.9rem' }}
          >
            <Share2 size={16} />
            <span>Generate Brag Card</span>
          </button>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginTop: '1.75rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border-color)'
        }}>
          <div style={{ background: '#090e1a', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700 }}>CURRENT STREAK</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>{user.current_streak} Days</span>
              <span className="flame-active">🔥</span>
            </div>
          </div>

          <div style={{ background: '#090e1a', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700 }}>LONGEST STREAK</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f59e0b' }}>
              {user.longest_streak} Days
            </div>
          </div>

          <div style={{ background: '#090e1a', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700 }}>TOTAL XP</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#4ade80' }}>
              {user.xp_total} XP
            </div>
          </div>

          <div style={{ background: '#090e1a', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700 }}>STREAK FREEZES</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8' }}>
              {user.streak_freezes} / 3 🧊
            </div>
          </div>
        </div>
      </div>

      {/* 365-Day Activity Heatmap Section */}
      <div style={{ marginBottom: '2rem' }}>
        <ActivityHeatmap activities={activities} username={user.username} />
      </div>

      {/* 7 Streak Reward Tiers Section */}
      <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Award size={20} color="#fbbf24" />
          <span>Streak Milestone Rewards & Loot Economy</span>
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Continuous daily consistency unlocks permanent cosmetics, lo-fi focus soundscapes, and Hall of Fame status.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {STREAK_REWARD_TIERS.map(tier => {
            const isUnlocked = user.current_streak >= tier.days;

            return (
              <div
                key={tier.days}
                style={{
                  background: isUnlocked ? 'rgba(245, 158, 11, 0.08)' : '#090e1a',
                  border: `1px solid ${isUnlocked ? 'rgba(245, 158, 11, 0.4)' : 'var(--border-color)'}`,
                  borderRadius: '0.75rem',
                  padding: '1.25rem',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, fontSize: '1.05rem', color: isUnlocked ? '#fbbf24' : '#f8fafc' }}>
                    <span>{tier.icon}</span>
                    <span>{tier.name}</span>
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: isUnlocked ? '#4ade80' : 'var(--text-dim)',
                    background: isUnlocked ? 'rgba(74, 222, 128, 0.15)' : 'rgba(255,255,255,0.05)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '0.3rem'
                  }}>
                    {isUnlocked ? 'UNLOCKED' : `${tier.days} Days`}
                  </span>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {tier.unlocks.map((u, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.35rem' }}>
                      <CheckCircle2 size={13} color={isUnlocked ? '#4ade80' : 'var(--text-dim)'} />
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* 20 Master Badges Trophy Cabinet */}
      <div style={{ marginBottom: '2rem' }}>
        <BadgeCabinet />
      </div>

      {/* Share / Brag Card Modal */}
      {showShareModal && (
        <div
          onClick={() => setShowShareModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #060a13 100%)',
              border: '2px solid #f59e0b',
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '460px',
              width: '100%',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 30px rgba(245, 158, 11, 0.3)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏆</div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.25rem' }}>
              {user.name} • Articlarity Brag Card
            </h2>
            <div style={{ fontSize: '0.85rem', color: '#38bdf8', marginBottom: '1.25rem' }}>
              {user.place} • learn.articlarity.com/u/{user.username}
            </div>

            <div style={{
              background: '#090e1a',
              border: '1px solid var(--border-color)',
              borderRadius: '0.75rem',
              padding: '1.25rem',
              display: 'flex',
              justifyContent: 'space-around',
              marginBottom: '1.5rem'
            }}>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fbbf24' }}>
                  {user.current_streak} 🔥
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>STREAK</div>
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#4ade80' }}>
                  {user.xp_total} ⭐
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>TOTAL XP</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleCopyLink}
                className="btn-3d btn-3d-cyan"
                style={{ flex: 1 }}
              >
                {copiedLink ? 'Link Copied!' : 'Copy Profile Link'}
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="btn-3d btn-3d-ghost"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function UserProfilePage() {
  return (
    <React.Suspense fallback={<div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>Loading profile...</div>}>
      <UserProfileContent />
    </React.Suspense>
  );
}
