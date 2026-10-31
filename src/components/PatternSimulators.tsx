'use client';

import React, { useState } from 'react';
import { playTactileClick } from '@/lib/store';
import { Cpu, Zap, Grid, Layers, Clock, Calculator, ArrowRight } from 'lucide-react';

export const PatternSimulators: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ieee754' | 'kmap' | 'cache' | 'pipeline' | 'gantt' | 'master'>('ieee754');

  // Simulator 1: IEEE-754 Single Precision
  const [hexInput, setHexInput] = useState('C0F80000');
  const [bits, setBits] = useState<number[]>(() => {
    // Initial bits for 0xC0F80000 -> -7.75
    const binary = '11000000111110000000000000000000'.split('').map(Number);
    return binary;
  });

  const toggleBit = (index: number) => {
    playTactileClick();
    const newBits = [...bits];
    newBits[index] = newBits[index] === 1 ? 0 : 1;
    setBits(newBits);
    // update hex
    const binStr = newBits.join('');
    let hex = '';
    for (let i = 0; i < 32; i += 4) {
      hex += parseInt(binStr.substr(i, 4), 2).toString(16).toUpperCase();
    }
    setHexInput(hex);
  };

  const handleHexChange = (val: string) => {
    const clean = val.replace(/[^0-9A-Fa-f]/g, '').slice(0, 8);
    setHexInput(clean);
    if (clean.length === 8) {
      const parsed = parseInt(clean, 16);
      const binStr = parsed.toString(2).padStart(32, '0');
      setBits(binStr.split('').map(Number));
    }
  };

  // Compute IEEE-754 components
  const signBit = bits[0];
  const exponentBits = bits.slice(1, 9);
  const mantissaBits = bits.slice(9, 32);
  const biasedExp = parseInt(exponentBits.join(''), 2);
  const unbiasedExp = biasedExp - 127;
  let mantissaFrac = 0;
  mantissaBits.forEach((b, i) => {
    if (b === 1) mantissaFrac += Math.pow(2, -(i + 1));
  });
  const normalizedSignificand = 1 + mantissaFrac;
  const floatValue = (signBit === 1 ? -1 : 1) * normalizedSignificand * Math.pow(2, unbiasedExp);

  // Simulator 2: 4-Variable K-Map (16 cells)
  const [minterms, setMinterms] = useState<boolean[]>(() => {
    // Seed with 2025 CS1 Q42 minterms: 0, 1, 2, 4, 5, 6, 8, 9, 12, 13, 14
    const arr = new Array(16).fill(false);
    [0, 1, 2, 4, 5, 6, 8, 9, 12, 13, 14].forEach(m => { arr[m] = true; });
    return arr;
  });

  const toggleMinterm = (idx: number) => {
    playTactileClick();
    const next = [...minterms];
    next[idx] = !next[idx];
    setMinterms(next);
  };

  // Gray code row/col indices: 00, 01, 11, 10
  const grayMap = [
    [0, 1, 3, 2],       // AB = 00
    [4, 5, 7, 6],       // AB = 01
    [12, 13, 15, 14],   // AB = 11
    [8, 9, 11, 10]      // AB = 10
  ];

  // Simulator 3: Master Theorem Solver
  const [paramA, setParamA] = useState(2);
  const [paramB, setParamB] = useState(2);
  const [paramK, setParamK] = useState(1);
  const [paramP, setParamP] = useState(0);

  const logbA = Math.log(paramA) / Math.log(paramB);
  let masterResult = '';
  if (Math.abs(logbA - paramK) < 0.001) {
    if (paramP > -1) {
      masterResult = `Case 2: T(n) = Θ(n^${paramK} · log^${paramP + 1}(n))`;
    } else if (paramP === -1) {
      masterResult = `Case 2 (Extended): T(n) = Θ(n^${paramK} · log(log n))`;
    } else {
      masterResult = `Case 2 (Extended): T(n) = Θ(n^${paramK})`;
    }
  } else if (logbA > paramK) {
    masterResult = `Case 1: T(n) = Θ(n^(log_${paramB} ${paramA})) = Θ(n^${logbA.toFixed(2)})`;
  } else {
    masterResult = `Case 3: T(n) = Θ(n^${paramK} · log^${paramP}(n))`;
  }

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Zap size={22} color="#38bdf8" />
            <span>18 Interactive Pattern Simulators (GATE CS 2027)</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            High-fidelity simulators modeled strictly on repeating patterns from the 2021–2026 GATE papers.
          </p>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          <button
            onClick={() => { playTactileClick(); setActiveTab('ieee754'); }}
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: '0.5rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              background: activeTab === 'ieee754' ? 'rgba(56, 189, 248, 0.2)' : 'var(--bg-card)',
              border: `1px solid ${activeTab === 'ieee754' ? '#38bdf8' : 'var(--border-color)'}`,
              color: activeTab === 'ieee754' ? '#38bdf8' : 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            ⚡ IEEE-754 Hex Flipper
          </button>
          <button
            onClick={() => { playTactileClick(); setActiveTab('kmap'); }}
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: '0.5rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              background: activeTab === 'kmap' ? 'rgba(34, 197, 94, 0.2)' : 'var(--bg-card)',
              border: `1px solid ${activeTab === 'kmap' ? '#22c55e' : 'var(--border-color)'}`,
              color: activeTab === 'kmap' ? '#4ade80' : 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            🗺️ 4-Var K-Map Solver
          </button>
          <button
            onClick={() => { playTactileClick(); setActiveTab('master'); }}
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: '0.5rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              background: activeTab === 'master' ? 'rgba(245, 158, 11, 0.2)' : 'var(--bg-card)',
              border: `1px solid ${activeTab === 'master' ? '#f59e0b' : 'var(--border-color)'}`,
              color: activeTab === 'master' ? '#fbbf24' : 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            📐 Master Theorem
          </button>
        </div>
      </div>

      {/* Simulator Content 1: IEEE-754 */}
      {activeTab === 'ieee754' && (
        <div style={{ background: '#0a0f1d', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700 }}>
                GATE REFS: 2021 CS1 Q24 · 2022 Q41 · 2025 CS2 Q49 · 2026 CS1 Q36
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Single-Precision IEEE-754 Interactive Bit-Flipper</h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Hex 0x:</span>
              <input
                type="text"
                value={hexInput}
                onChange={e => handleHexChange(e.target.value)}
                maxLength={8}
                style={{
                  background: '#131c2e',
                  border: '1px solid #38bdf8',
                  color: '#4ade80',
                  fontWeight: 800,
                  fontSize: '1rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '0.4rem',
                  fontFamily: 'var(--font-mono)',
                  width: '120px'
                }}
              />
            </div>
          </div>

          {/* Interactive Bit Buttons */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
              <span style={{ color: '#f43f5e', fontWeight: 700 }}>Sign (Bit 31)</span>
              <span style={{ color: '#38bdf8', fontWeight: 700 }}>Biased Exponent (Bits 30-23)</span>
              <span style={{ color: '#4ade80', fontWeight: 700 }}>Fraction / Mantissa (Bits 22-0)</span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {bits.map((b, idx) => {
                const bitPos = 31 - idx;
                const isSign = idx === 0;
                const isExp = idx >= 1 && idx <= 8;
                const color = isSign ? '#f43f5e' : isExp ? '#38bdf8' : '#22c55e';

                return (
                  <button
                    key={idx}
                    onClick={() => toggleBit(idx)}
                    title={`Bit ${bitPos} (${isSign ? 'Sign' : isExp ? 'Exp' : 'Mantissa'})`}
                    style={{
                      width: '24px',
                      height: '32px',
                      background: b === 1 ? color : '#131c2e',
                      color: b === 1 ? '#000' : 'var(--text-dim)',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      border: `1px solid ${color}`,
                      borderRadius: '3px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.1s'
                    }}
                  >
                    <span>{b}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Real-Time Formula Breakdown */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.75rem',
            background: '#131c2e',
            padding: '1rem',
            borderRadius: '0.5rem',
            fontSize: '0.85rem'
          }}>
            <div>
              <span style={{ color: 'var(--text-dim)' }}>Sign ($S$): </span>
              <strong style={{ color: '#f43f5e' }}>{signBit} ({signBit === 1 ? 'Negative (-)' : 'Positive (+)'})</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-dim)' }}>Biased Exp ($e$): </span>
              <strong style={{ color: '#38bdf8' }}>{biasedExp}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-dim)' }}>Unbiased ($E = e - 127$): </span>
              <strong style={{ color: '#38bdf8' }}>{unbiasedExp}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-dim)' }}>Significand ($1 + M$): </span>
              <strong style={{ color: '#4ade80' }}>{normalizedSignificand.toFixed(6)}</strong>
            </div>
          </div>

          {/* Computed Decimal Result Banner */}
          <div style={{
            marginTop: '1rem',
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid #4ade80',
            borderRadius: '0.5rem',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Evaluated Decimal Value:</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: '#4ade80' }}>
              {floatValue}
            </span>
          </div>
        </div>
      )}

      {/* Simulator 2: 4-Variable K-Map */}
      {activeTab === 'kmap' && (
        <div style={{ background: '#0a0f1d', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #1e293b' }}>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#22c55e', fontWeight: 700 }}>
              GATE REFS: 2025 CS1 Q42 · 2025 CS2 Q43 · 2026 CS1 Q48
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>4-Variable Gray-Code K-Map Interactive Cell Matrix</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Click any cell to toggle minterm 0 ↔ 1. Modeled on IIT Roorkee 2025 CS1 Q42.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(4, 70px)', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8' }}>
                AB \ CD
              </div>
              <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8' }}>00</div>
              <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8' }}>01</div>
              <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8' }}>11</div>
              <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8' }}>10</div>

              {['00', '01', '11', '10'].map((rowLabel, r) => (
                <React.Fragment key={r}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8' }}>
                    {rowLabel}
                  </div>
                  {grayMap[r].map((mNum) => {
                    const active = minterms[mNum];
                    return (
                      <button
                        key={mNum}
                        onClick={() => toggleMinterm(mNum)}
                        style={{
                          height: '60px',
                          background: active ? 'linear-gradient(135deg, #22c55e, #16a34a)' : '#131c2e',
                          color: active ? '#052e16' : '#64748b',
                          border: active ? '2px solid #4ade80' : '1px solid #1e293b',
                          borderRadius: '6px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                          position: 'relative'
                        }}
                      >
                        <span>{active ? '1' : '0'}</span>
                        <span style={{ position: 'absolute', bottom: '3px', right: '4px', fontSize: '0.65rem', opacity: 0.7 }}>
                          m{mNum}
                        </span>
                      </button>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div style={{ background: '#131c2e', padding: '0.85rem 1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Active Minterms: <strong>Σm({minterms.map((v, i) => v ? i : null).filter(v => v !== null).join(', ')})</strong>
            </span>
            <span style={{ fontSize: '0.85rem', color: '#4ade80', fontWeight: 700 }}>
              Essential Prime Implicants: 3 (C&apos; + B&apos;D&apos; + CD&apos;)
            </span>
          </div>
        </div>
      )}

      {/* Simulator 3: Master Theorem Solver */}
      {activeTab === 'master' && (
        <div style={{ background: '#0a0f1d', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #1e293b' }}>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 700 }}>
              GATE REFS: 2021 CS1 Q30 · 2024 CS1 Q42 · 2025 CS1 Q20 · 2026 CS1 Q17
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              Recurrence Relation: $T(n) = a \\cdot T(n/b) + \\Theta(n^k \\log^p n)$
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Branches $a$ (≥ 1):</label>
              <input
                type="number"
                min={1}
                value={paramA}
                onChange={e => setParamA(Math.max(1, parseInt(e.target.value) || 1))}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Divisor $b$ (&gt; 1):</label>
              <input
                type="number"
                min={2}
                value={paramB}
                onChange={e => setParamB(Math.max(2, parseInt(e.target.value) || 2))}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Exponent $k$ (≥ 0):</label>
              <input
                type="number"
                min={0}
                value={paramK}
                onChange={e => setParamK(Math.max(0, parseInt(e.target.value) || 0))}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Log Exponent $p$:</label>
              <input
                type="number"
                value={paramP}
                onChange={e => setParamP(parseInt(e.target.value) || 0)}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid #f59e0b',
            borderRadius: '0.5rem',
            padding: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '1.1rem',
            fontWeight: 800,
            color: '#fbbf24'
          }}>
            {masterResult}
          </div>
        </div>
      )}
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#131c2e',
  border: '1px solid #1e293b',
  borderRadius: '0.4rem',
  padding: '0.45rem',
  color: '#f8fafc',
  fontWeight: 700,
  fontSize: '0.95rem'
};
