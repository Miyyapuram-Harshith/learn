'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Code2, 
  BookOpen, 
  GraduationCap, 
  Flame, 
  GitBranch, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Zap, 
  Shield, 
  Trophy, 
  ArrowRight,
  ExternalLink,
  Terminal,
  Cpu
} from 'lucide-react';
import { playTactileClick, getUserProfile, getUserActivity } from '@/lib/store';
import { ActivityHeatmap } from '@/components/ActivityHeatmap';
import { DSA_UNITS } from '@/data/dsaCurriculum';
import { GATE_UNITS, GATE_EXAM_INFO } from '@/data/gateCurriculum';
import { MASTER_BADGES } from '@/data/badges';
import { STREAK_REWARD_TIERS } from '@/data/streakRewards';

export default function HomePage() {
  const [user, setUser] = React.useState(() => getUserProfile());
  const [activities, setActivities] = React.useState(() => getUserActivity('guest_user'));

  React.useEffect(() => {
    const profile = getUserProfile();
    setUser(profile);
    setActivities(getUserActivity(profile.id));
  }, []);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1rem 5rem 1rem' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative' }}>
        {/* Glow pill */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 800,
            background: 'rgba(34, 197, 94, 0.15)',
            color: '#4ade80',
            padding: '0.35rem 0.95rem',
            borderRadius: '999px',
            border: '1px solid rgba(74, 222, 128, 0.4)',
            boxShadow: '0 0 15px rgba(34, 197, 94, 0.2)'
          }}>
            100% CLOUDFLARE NATIVE EDGE STACK • D1 + KV + R2 + QUEUES
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          marginBottom: '1.25rem'
        }}>
          Gamified Python DSA &<br />
          <span className="gradient-text-green">Official GATE CS 2027</span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: 'var(--text-muted)',
          maxWidth: '780px',
          margin: '0 auto 2.25rem auto',
          lineHeight: 1.6
        }}>
          Combines Duolingo’s bite-sized micro-learning loop and witty mascot dialogues with LeetCode-style Python DSA mastery and exam-faithful GATE CS preparation for IIT Madras.
        </p>

        {/* 3D Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            href="/compiler"
            onClick={playTactileClick}
            className="btn-3d btn-3d-green"
            style={{ fontSize: '1.05rem', padding: '0.85rem 1.85rem' }}
          >
            <Play size={18} fill="currentColor" />
            <span>Instant Zero-Login Compiler</span>
          </Link>

          <Link
            href="/dsa-python"
            onClick={playTactileClick}
            className="btn-3d btn-3d-cyan"
            style={{ fontSize: '1.05rem', padding: '0.85rem 1.75rem' }}
          >
            <BookOpen size={18} />
            <span>Python DSA Track</span>
          </Link>

          <Link
            href="/gate"
            onClick={playTactileClick}
            className="btn-3d btn-3d-amber"
            style={{ fontSize: '1.05rem', padding: '0.85rem 1.75rem' }}
          >
            <GraduationCap size={18} />
            <span>GATE CS 2027</span>
          </Link>
        </div>

        {/* Quick Highlights Badge Strip */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          marginTop: '2.5rem',
          fontSize: '0.85rem',
          color: 'var(--text-dim)'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Zap size={15} color="#4ade80" />
            <span>Zero Popups or Signups</span>
          </span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Flame size={15} color="#fbbf24" />
            <span>365-Day Activity Heatmap</span>
          </span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <GitBranch size={15} color="#38bdf8" />
            <span>Automated GitHub Queue Commits</span>
          </span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Sparkles size={15} color="#c084fc" />
            <span>Witty Mascot Companion</span>
          </span>
        </div>
      </section>

      {/* 365-Day Activity Heatmap Live Showcase */}
      <section style={{ marginBottom: '4rem' }}>
        <ActivityHeatmap activities={activities} username={user.username} />
      </section>

      {/* 3-Tier Access Architecture Grid */}
      <section style={{ marginBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
            The 3-Tier Access & Identity Architecture
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Frictionless zero-login access for anyone, optional registered cloud profiles, and stealth administrative security.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {/* Tier 1 */}
          <div className="glass-panel" style={{ padding: '1.75rem', borderTop: '4px solid #22c55e' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#4ade80', marginBottom: '0.4rem' }}>
              TIER 1 • ZERO LOGIN WALL
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Anonymous Guest Mode
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Anyone can open <code>/compiler</code> and run Python 3.12 or ANSI-C code immediately with zero signup, zero popups, and zero server lag. Public curriculum and LeetCode pattern links open with zero barriers.
            </p>
            <Link
              href="/compiler"
              onClick={playTactileClick}
              className="btn-3d btn-3d-green"
              style={{ width: '100%', fontSize: '0.88rem' }}
            >
              <span>Launch /compiler</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Tier 2 */}
          <div className="glass-panel" style={{ padding: '1.75rem', borderTop: '4px solid #38bdf8' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', marginBottom: '0.4rem' }}>
              TIER 2 • OPTIONAL ENHANCEMENT
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Registered Learner Profile
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Register (Full Name, Username, Email, Phone, DOB, Place) to save cloud streaks, unlock your 365-day SVG heatmap, claim 20 master badges, and push solved solutions to GitHub via Cloudflare Queues.
            </p>
            <Link
              href="/register"
              onClick={playTactileClick}
              className="btn-3d btn-3d-cyan"
              style={{ width: '100%', fontSize: '0.88rem' }}
            >
              <span>Create Learner Profile</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Tier 3 */}
          <div className="glass-panel" style={{ padding: '1.75rem', borderTop: '4px solid #f43f5e' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f87171', marginBottom: '0.4rem' }}>
              TIER 3 • ZERO PUBLIC FOOTPRINT
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Stealth Administrator
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Zero public buttons in navbar, footer, or sitemap. Only direct navigation to <code>/admin</code> triggers the WebAuthn Passkey + TOTP 2FA security gate protected at Cloudflare Edge with D1 audit logs.
            </p>
            <div style={{
              background: '#090e1a',
              padding: '0.65rem 0.85rem',
              borderRadius: '0.5rem',
              fontSize: '0.8rem',
              color: 'var(--text-dim)',
              fontFamily: 'var(--font-mono)'
            }}>
              Direct route: learn.articlarity.com/admin
            </div>
          </div>
        </div>
      </section>

      {/* Dual Core Learning Tracks */}
      <section style={{ marginBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
            Dual Core Learning Tracks
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Engineered for software engineers breaking into top tech and engineering graduates targeting AIR &lt; 50 in GATE CS.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
          {/* Track 1: DSA Python */}
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(34, 197, 94, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #4ade80'
              }}>
                <BookOpen size={22} color="#4ade80" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Python DSA Mastery</h3>
                <span style={{ fontSize: '0.78rem', color: '#4ade80', fontWeight: 700 }}>11 Units • Duolingo Micro-Learning Loop</span>
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
              Every problem is broken down into intuitive micro-steps:
              <br /><strong>1. Intuition</strong> → <strong>2. Dry Run</strong> → <strong>3. Spot Bug</strong> → <strong>4. Parsons Puzzle</strong> → <strong>5. Fill Blank</strong> → <strong>6. Full Code</strong> with 1-click &ldquo;Copy Python Solution &amp; Open LeetCode ↗&rdquo;.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
              {DSA_UNITS.slice(0, 6).map(u => (
                <span key={u.id} style={{
                  fontSize: '0.75rem',
                  background: '#0d1527',
                  border: '1px solid var(--border-color)',
                  padding: '0.25rem 0.55rem',
                  borderRadius: '0.4rem',
                  color: 'var(--text-main)'
                }}>
                  {u.title}
                </span>
              ))}
            </div>

            <Link
              href="/dsa-python"
              onClick={playTactileClick}
              className="btn-3d btn-3d-green"
              style={{ width: '100%' }}
            >
              <span>Explore 11 DSA Units</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Track 2: GATE CS 2027 */}
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(56, 189, 248, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #38bdf8'
              }}>
                <GraduationCap size={22} color="#38bdf8" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>GATE CS 2027 (IIT Madras)</h3>
                <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 700 }}>65 Questions • 180 Min CBT • TCS Calc</span>
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
              Strictly aligned with the IIT Madras brochure and verified 2021–2026 answer keys. Powered by 18 interactive pattern visualizers (IEEE-754 bit-flipper, 4-variable K-Map, CPU pipeline hazards, and Cache thrashing simulator).
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
              {GATE_UNITS.slice(0, 6).map(u => (
                <span key={u.id} style={{
                  fontSize: '0.75rem',
                  background: '#0d1527',
                  border: '1px solid var(--border-color)',
                  padding: '0.25rem 0.55rem',
                  borderRadius: '0.4rem',
                  color: 'var(--text-main)'
                }}>
                  {u.title}
                </span>
              ))}
            </div>

            <Link
              href="/gate"
              onClick={playTactileClick}
              className="btn-3d btn-3d-cyan"
              style={{ width: '100%' }}
            >
              <span>Explore GATE Portal &amp; PYQs</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Mascot Arti & Seed Dialogues Spotlight */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="glass-panel" style={{
          padding: '2.5rem',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(6, 10, 19, 0.9))',
          border: '1px solid rgba(56, 189, 248, 0.3)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', marginBottom: '0.4rem' }}>
                MEET YOUR COMPANION
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                Arti — The Tech Mascot with 3 Vibe Modes
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Arti tracks your progress, celebrates your optimal Big-O solutions, and drops witty lines calibrated to your selected vibe mode in the navbar:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
                  <span style={{ fontWeight: 800, color: '#38bdf8' }}>🦉 Savage / Playful:</span>
                  <span style={{ color: 'var(--text-muted)' }}>&ldquo;That O(N²) loop is so slow it just asked me for retirement benefits.&rdquo;</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
                  <span style={{ fontWeight: 800, color: '#fb7185' }}>🔥 Flirty (Opt-In):</span>
                  <span style={{ color: 'var(--text-muted)' }}>&ldquo;Are you a bank loan? Because you’ve definitely got my interest.&rdquo;</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
                  <span style={{ fontWeight: 800, color: '#4ade80' }}>🌱 Gentle Mode:</span>
                  <span style={{ color: 'var(--text-muted)' }}>&ldquo;Take a breath! Even senior engineers get stuck on pointer arithmetic.&rdquo;</span>
                </div>
              </div>
            </div>

            <div style={{
              background: '#090e1a',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              border: '1px solid var(--border-color)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🦉</div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#f8fafc', marginBottom: '0.25rem' }}>
                Frustration Guardrails Built-In
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                25-item anti-spam memory ensures dialogue freshness. If you hit 3 consecutive failed runs or 2 timeouts, roasts pause automatically to offer supportive hints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        paddingTop: '2rem',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.85rem',
        color: 'var(--text-dim)'
      }}>
        <div>
          © 2026 Articlarity Learn (Parent Brand: <a href="https://articlarity.com" target="_blank" rel="noopener noreferrer" style={{ color: '#4ade80' }}>articlarity.com</a>). Author &amp; Owner: @Harshith.
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/compiler" style={{ color: 'var(--text-muted)' }}>Compiler</Link>
          <Link href="/dsa-python" style={{ color: 'var(--text-muted)' }}>Python DSA</Link>
          <Link href="/gate" style={{ color: 'var(--text-muted)' }}>GATE 2027</Link>
          <Link href="/u/harshith" style={{ color: 'var(--text-muted)' }}>Profile</Link>
        </div>
      </footer>
    </div>
  );
}
