'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  GitBranch, 
  Lock, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { getUserProfile, saveUserProfile, playTactileClick, playSuccessChime } from '@/lib/store';
import confetti from 'canvas-confetti';

export default function RegisterPage() {
  const router = useRouter();
  const existing = getUserProfile();

  const [name, setName] = useState(existing.name || '');
  const [username, setUsername] = useState(existing.username || '');
  const [email, setEmail] = useState(existing.email || '');
  const [phone, setPhone] = useState(existing.phone_number || '+91');
  const [dob, setDob] = useState(existing.dob || '2004-10-31');
  const [place, setPlace] = useState(existing.place || 'Jagtial · SR University');
  const [githubUser, setGithubUser] = useState(existing.github_username || 'Miyyapuram-Harshith');
  const [autoCommit, setAutoCommit] = useState(true);

  const [step, setStep] = useState<1 | 2>(1); // 1 = Form, 2 = 6-digit OTP verification
  const [otp, setOtp] = useState('749210');
  const [errorMsg, setErrorMsg] = useState('');

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick();

    if (!name || name.trim().length < 2) {
      setErrorMsg('Full name must be at least 2 characters.');
      return;
    }
    if (!username || username.length < 3) {
      setErrorMsg('Username must be 3–24 alphanumeric characters.');
      return;
    }
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!phone || phone.length < 10) {
      setErrorMsg('Phone number must be in E.164 format (+91...).');
      return;
    }
    if (!dob) {
      setErrorMsg('Date of birth is required for birthday celebrations.');
      return;
    }
    if (!place || place.length < 2) {
      setErrorMsg('Place/College is required.');
      return;
    }

    setErrorMsg('');
    setStep(2);
  };

  const handleVerifyOtp = () => {
    playTactileClick();
    if (otp.length !== 6) {
      setErrorMsg('Enter the 6-digit verification code.');
      return;
    }

    // Determine age for default mascot tone: 18+ unlocks flirty opt-in
    const birthYear = parseInt(dob.split('-')[0], 10) || 2004;
    const currentYear = new Date().getFullYear();
    const isAdult = currentYear - birthYear >= 18;

    const updatedProfile = {
      ...existing,
      name: name.trim(),
      username: username.toLowerCase().trim(),
      email: email.trim(),
      phone_number: phone.trim(),
      dob,
      place: place.trim(),
      github_username: githubUser.trim(),
      github_auto_commit: autoCommit,
      mascot_tone: isAdult ? existing.mascot_tone : 'playful',
      updated_at: new Date().toISOString()
    };

    saveUserProfile(updatedProfile);
    playSuccessChime();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

    setTimeout(() => {
      router.push(`/u/${updatedProfile.username}`);
    }, 800);
  };

  return (
    <div style={{ maxWidth: '580px', margin: '2rem auto', padding: '1rem' }}>
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(34, 197, 94, 0.15)',
            color: '#4ade80',
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: 800,
            marginBottom: '0.5rem'
          }}>
            <Sparkles size={13} />
            <span>TIER 2 • REGISTERED LEARNER PROFILE</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.35rem' }}>
            {step === 1 ? 'Save Streak & Connect GitHub' : 'Verify Email with 6-Digit OTP'}
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            {step === 1 
              ? 'Unlock your 365-day SVG heatmap, streak freeze inventory, and automated problem commits.' 
              : `We sent a 6-digit confirmation code to ${email}.`}
          </p>
        </div>

        {errorMsg && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            color: '#f87171',
            padding: '0.65rem 1rem',
            borderRadius: '0.5rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1.25rem'
          }}>
            {errorMsg}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleInitialSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Full Name */}
            <div>
              <label style={labelStyle}>Full Name:</label>
              <div style={inputContainerStyle}>
                <User size={16} color="var(--text-dim)" />
                <input
                  type="text"
                  placeholder="e.g. Harshith Miyyapuram"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label style={labelStyle}>Username (for clean profile URL):</label>
              <div style={inputContainerStyle}>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 700 }}>@</span>
                <input
                  type="text"
                  placeholder="harshith"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                learn.articlarity.com/u/{username || 'username'}
              </span>
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>Email ID:</label>
              <div style={inputContainerStyle}>
                <Mail size={16} color="var(--text-dim)" />
                <input
                  type="email"
                  placeholder="harshith@articlarity.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label style={labelStyle}>Phone Number (E.164 Format):</label>
              <div style={inputContainerStyle}>
                <Phone size={16} color="var(--text-dim)" />
                <input
                  type="tel"
                  placeholder="+919876543210"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            {/* Date of Birth & Place */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={labelStyle}>Date of Birth (DOB):</label>
                <div style={inputContainerStyle}>
                  <Calendar size={16} color="var(--text-dim)" />
                  <input
                    type="date"
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Place / College:</label>
                <div style={inputContainerStyle}>
                  <MapPin size={16} color="var(--text-dim)" />
                  <input
                    type="text"
                    placeholder="Jagtial · SR University"
                    value={place}
                    onChange={e => setPlace(e.target.value)}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>
            </div>

            {/* GitHub Username */}
            <div>
              <label style={labelStyle}>GitHub Username (Auto-commit queue):</label>
              <div style={inputContainerStyle}>
                <GitBranch size={16} color="#fbbf24" />
                <input
                  type="text"
                  placeholder="Miyyapuram-Harshith"
                  value={githubUser}
                  onChange={e => setGithubUser(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.35rem' }}>
                <input
                  type="checkbox"
                  id="autoCommitCheck"
                  checked={autoCommit}
                  onChange={e => setAutoCommit(e.target.checked)}
                />
                <label htmlFor="autoCommitCheck" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  Automatically push solved DSA Python & C code to GitHub
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn-3d btn-3d-green"
              style={{ width: '100%', marginTop: '0.5rem', padding: '0.85rem' }}
            >
              <span>Continue to Verification</span>
              <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ textAlign: 'center' }}>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={e => setOtp(e.target.value)}
                style={{
                  width: '200px',
                  textAlign: 'center',
                  letterSpacing: '0.5rem',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  background: '#040711',
                  border: '2px solid #38bdf8',
                  borderRadius: '0.5rem',
                  color: '#4ade80',
                  padding: '0.5rem',
                  fontFamily: 'var(--font-mono)'
                }}
              />
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>
                (Test simulation code: 749210)
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-3d btn-3d-ghost"
                style={{ flex: 1 }}
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="btn-3d btn-3d-cyan"
                style={{ flex: 2 }}
              >
                <span>Verify & Activate Profile</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 700,
  color: 'var(--text-dim)',
  marginBottom: '0.35rem'
};

const inputContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  background: '#070a14',
  border: '1px solid var(--border-color)',
  borderRadius: '0.5rem',
  padding: '0.55rem 0.85rem'
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: '#f8fafc',
  fontSize: '0.9rem',
  fontWeight: 500
};
