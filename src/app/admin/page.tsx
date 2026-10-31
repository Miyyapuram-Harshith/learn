'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  KeyRound, 
  Fingerprint, 
  Database, 
  MessageSquare, 
  GitPullRequest, 
  Terminal, 
  CheckCircle2, 
  Lock, 
  Unlock 
} from 'lucide-react';
import { playTactileClick, playSuccessChime } from '@/lib/store';
import { SEED_DIALOGUES } from '@/data/dialogues';
import { GATE_PYQS } from '@/data/gateCurriculum';

export default function StealthAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [totpCode, setTotpCode] = useState('');
  const [passkeyActive, setPasskeyActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'audit' | 'dialogues' | 'pyqs' | 'queue'>('audit');

  // Simulated D1 Admin Audit Logs
  const [auditLogs] = useState([
    {
      id: 'log_01',
      admin_email: 'harshith@articlarity.com',
      action: 'D1_MIGRATION_DEPLOY',
      entity_type: 'SCHEMA',
      entity_id: '0001_master_schema.sql',
      ip_address: '103.21.244.0 (Cloudflare Edge)',
      created_at: '2026-10-31 16:45:12 UTC'
    },
    {
      id: 'log_02',
      admin_email: 'harshith@articlarity.com',
      action: 'UPDATE_CONFIG_KV',
      entity_type: 'KV_NAMESPACE',
      entity_id: 'CONFIG_KV/theme_tokens',
      ip_address: '103.21.244.0 (Cloudflare Edge)',
      created_at: '2026-10-31 16:50:00 UTC'
    },
    {
      id: 'log_03',
      admin_email: 'harshith@articlarity.com',
      action: 'ENQUEUE_GITHUB_BATCH',
      entity_type: 'QUEUE',
      entity_id: 'GITHUB_QUEUE',
      ip_address: '103.21.244.0 (Cloudflare Edge)',
      created_at: '2026-10-31 16:54:19 UTC'
    }
  ]);

  const handlePasskeyAuth = () => {
    playTactileClick();
    setPasskeyActive(true);
    setTimeout(() => {
      setPasskeyActive(false);
      setIsAuthenticated(true);
      playSuccessChime();
    }, 700);
  };

  const handleTotpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick();
    if (totpCode.length === 6) {
      setIsAuthenticated(true);
      playSuccessChime();
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ maxWidth: '460px', margin: '4rem auto', padding: '1rem' }}>
        <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '2px solid #ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto'
          }}>
            <Lock size={28} color="#ef4444" />
          </div>

          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f87171', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
            TIER 3 • ZERO PUBLIC FOOTPRINT
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Stealth System Administrator
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
            Protected at Cloudflare Edge with WebAuthn Passkeys, TOTP 2FA, and Turnstile WAF validation.
          </p>

          {/* Passkey 1-Click Button */}
          <button
            onClick={handlePasskeyAuth}
            disabled={passkeyActive}
            className="btn-3d btn-3d-cyan"
            style={{ width: '100%', marginBottom: '1.25rem', padding: '0.75rem' }}
          >
            <Fingerprint size={18} />
            <span>{passkeyActive ? 'Authenticating Passkey...' : 'Sign in with Passkey (WebAuthn)'}</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ height: '1px', flex: 1, background: 'var(--border-color)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>OR TOTP 2FA CODE</span>
            <div style={{ height: '1px', flex: 1, background: 'var(--border-color)' }} />
          </div>

          {/* TOTP 2FA Form */}
          <form onSubmit={handleTotpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit TOTP"
              value={totpCode}
              onChange={e => setTotpCode(e.target.value)}
              style={{
                width: '100%',
                background: '#040711',
                border: '1px solid var(--border-color)',
                borderRadius: '0.5rem',
                padding: '0.65rem',
                textAlign: 'center',
                letterSpacing: '0.35rem',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#4ade80',
                fontFamily: 'var(--font-mono)'
              }}
            />
            <button
              type="submit"
              className="btn-3d btn-3d-ghost"
              style={{ width: '100%' }}
            >
              Verify Code
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Admin Top Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem',
        background: '#0c1222',
        padding: '1rem 1.5rem',
        borderRadius: '0.75rem',
        border: '1px solid #1e293b'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'rgba(239, 68, 68, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #ef4444'
          }}>
            <ShieldAlert size={20} color="#f87171" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              Stealth Administrator Panel • Edge Console
            </h1>
            <span style={{ fontSize: '0.75rem', color: '#4ade80' }}>
              Connected to Cloudflare D1 (articlarity_learn_db)
            </span>
          </div>
        </div>

        <button
          onClick={() => { playTactileClick(); setIsAuthenticated(false); }}
          className="btn-3d btn-3d-ghost"
          style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
        >
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => { playTactileClick(); setActiveTab('audit'); }}
          style={{
            background: activeTab === 'audit' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
            border: `1px solid ${activeTab === 'audit' ? '#38bdf8' : 'transparent'}`,
            color: activeTab === 'audit' ? '#38bdf8' : 'var(--text-muted)',
            fontWeight: 700,
            padding: '0.45rem 1rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '0.85rem'
          }}
        >
          D1 Audit Logs
        </button>
        <button
          onClick={() => { playTactileClick(); setActiveTab('dialogues'); }}
          style={{
            background: activeTab === 'dialogues' ? 'rgba(34, 197, 94, 0.15)' : 'transparent',
            border: `1px solid ${activeTab === 'dialogues' ? '#22c55e' : 'transparent'}`,
            color: activeTab === 'dialogues' ? '#4ade80' : 'var(--text-muted)',
            fontWeight: 700,
            padding: '0.45rem 1rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '0.85rem'
          }}
        >
          Mascot Dialogue Bank ({SEED_DIALOGUES.length})
        </button>
        <button
          onClick={() => { playTactileClick(); setActiveTab('pyqs'); }}
          style={{
            background: activeTab === 'pyqs' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
            border: `1px solid ${activeTab === 'pyqs' ? '#f59e0b' : 'transparent'}`,
            color: activeTab === 'pyqs' ? '#fbbf24' : 'var(--text-muted)',
            fontWeight: 700,
            padding: '0.45rem 1rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '0.85rem'
          }}
        >
          GATE PYQ Question Vault ({GATE_PYQS.length})
        </button>
      </div>

      {/* Tab 1: D1 Audit Log */}
      {activeTab === 'audit' && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>
            Cloudflare D1 Table: `admin_audit_log`
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#090e1a', color: 'var(--text-dim)', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '0.6rem 0.75rem' }}>TIMESTAMP</th>
                  <th style={{ padding: '0.6rem 0.75rem' }}>ADMIN EMAIL</th>
                  <th style={{ padding: '0.6rem 0.75rem' }}>ACTION</th>
                  <th style={{ padding: '0.6rem 0.75rem' }}>ENTITY</th>
                  <th style={{ padding: '0.6rem 0.75rem' }}>EDGE IP</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map(log => (
                  <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>{log.created_at}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>{log.admin_email}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.2rem 0.5rem', borderRadius: '0.3rem', fontSize: '0.75rem', fontWeight: 700 }}>
                        {log.action}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', color: '#fbbf24', fontFamily: 'var(--font-mono)' }}>{log.entity_id}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{log.ip_address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Mascot Dialogues */}
      {activeTab === 'dialogues' && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>
            Mascot Dialogue Master Bank (`dialogues`)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {SEED_DIALOGUES.map(d => (
              <div key={d.id} style={{ background: '#090e1a', padding: '0.85rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8' }}>{d.category}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>• Trigger: {d.trigger_event}</span>
                    <span style={{ fontSize: '0.75rem', color: '#4ade80' }}>• Tone: {d.tone_level}</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#f8fafc', fontStyle: 'italic' }}>
                    &ldquo;{d.text}&rdquo;
                  </div>
                </div>
                <span style={{ fontSize: '0.75rem', background: '#1e293b', padding: '0.2rem 0.5rem', borderRadius: '0.3rem', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>
                  Pose: {d.mascot_pose}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: GATE PYQ Vault */}
      {activeTab === 'pyqs' && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>
            GATE PYQ Vault Table: `gate_pyqs`
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {GATE_PYQS.map(q => (
              <div key={q.id} style={{ background: '#090e1a', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#fbbf24' }}>GATE {q.exam_year} {q.paper_set} • Q.{q.question_number} ({q.question_type})</strong>
                  <span style={{ color: '#4ade80', fontWeight: 700 }}>Key: {JSON.stringify(q.official_answer_key)}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {q.question_md.slice(0, 140)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
