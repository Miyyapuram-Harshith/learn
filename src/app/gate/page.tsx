'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GATE_EXAM_INFO, 
  GATE_UNITS, 
  GATE_PYQS 
} from '@/data/gateCurriculum';
import { PatternSimulators } from '@/components/PatternSimulators';
import { TcsCalculatorModal } from '@/components/TcsCalculatorModal';
import { 
  GraduationCap, 
  Calculator, 
  Clock, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Zap, 
  BookOpen, 
  Trophy 
} from 'lucide-react';
import { playTactileClick } from '@/lib/store';

export default function GatePage() {
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [selectedPyqId, setSelectedPyqId] = useState<string | null>(GATE_PYQS[0].id);
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const toggleSolution = (id: string) => {
    playTactileClick();
    setRevealedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Official Exam Alignment Banner */}
      <div className="glass-panel" style={{
        padding: '1.75rem',
        marginBottom: '2rem',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        background: 'linear-gradient(135deg, rgba(14, 23, 42, 0.95), rgba(7, 10, 19, 0.95))'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                background: 'rgba(56, 189, 248, 0.2)',
                color: '#38bdf8',
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                border: '1px solid rgba(56, 189, 248, 0.4)'
              }}>
                OFFICIAL IIT MADRAS ALIGNMENT
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Exam: Feb 6, 7, 13, 14, 20, 21, 2027
              </span>
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#f8fafc' }}>
              GATE CS 2027 Master Preparation
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '780px' }}>
              Exam-faithful preparation engineered for the official IIT Madras CBT format. 65 Questions · 100 Marks · MCQ/MSQ/NAT strict marking with TCS Virtual Calculator.
            </p>
          </div>

          {/* Quick Action CTAs */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => { playTactileClick(); setIsCalcOpen(true); }}
              className="btn-3d btn-3d-cyan"
              style={{ fontSize: '0.9rem' }}
            >
              <Calculator size={18} />
              <span>TCS Virtual Calculator</span>
            </button>

            <Link
              href="/gate/mock"
              onClick={playTactileClick}
              className="btn-3d btn-3d-amber"
              style={{ fontSize: '0.9rem' }}
            >
              <Clock size={18} />
              <span>Start 180-Min CBT Mock</span>
            </Link>
          </div>
        </div>

        {/* Exam Breakdown Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.75rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-color)',
          fontSize: '0.85rem'
        }}>
          <div>
            <span style={{ color: 'var(--text-dim)' }}>General Aptitude: </span>
            <strong style={{ color: '#4ade80' }}>10 Qs · 15 Marks</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-dim)' }}>Engg Mathematics: </span>
            <strong style={{ color: '#38bdf8' }}>8 Qs · 13 Marks</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-dim)' }}>Core CS Subjects: </span>
            <strong style={{ color: '#fbbf24' }}>47 Qs · 72 Marks</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-dim)' }}>IIT Madras Helpdesk: </span>
            <span style={{ color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>044-2257 8200</span>
          </div>
        </div>
      </div>

      {/* 18 Interactive Pattern Simulators Component */}
      <PatternSimulators />

      {/* Official 2021-2026 PYQ Vault */}
      <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={22} color="#4ade80" />
              <span>Official GATE CS Previous Year Question (PYQ) Vault</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Verified against official answer keys from 2021–2026 papers with 30-second shortcut derivation cards.
            </p>
          </div>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            color: '#4ade80',
            background: 'rgba(34, 197, 94, 0.15)',
            padding: '0.3rem 0.75rem',
            borderRadius: '0.4rem',
            border: '1px solid rgba(74, 222, 128, 0.3)'
          }}>
            100% Verified Answer Keys
          </span>
        </div>

        {/* PYQ Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {GATE_PYQS.map(pyq => {
            const isRevealed = revealedSolutions[pyq.id];

            return (
              <div
                key={pyq.id}
                style={{
                  background: '#090e1a',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.75rem',
                  padding: '1.25rem'
                }}
              >
                {/* PYQ Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      color: '#f8fafc',
                      background: '#1e293b',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '0.3rem'
                    }}>
                      GATE {pyq.exam_year} {pyq.paper_set} • Q.{pyq.question_number}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: pyq.question_type === 'NAT' ? '#f59e0b' : pyq.question_type === 'MSQ' ? '#c084fc' : '#38bdf8',
                      background: 'rgba(255,255,255,0.06)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '0.3rem'
                    }}>
                      {pyq.question_type} ({pyq.marks} Mark{pyq.marks > 1 ? 's' : ''})
                    </span>
                  </div>

                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                    {pyq.unit_name} • {pyq.organizing_institute}
                  </span>
                </div>

                {/* Question Markdown */}
                <div style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: '#e2e8f0',
                  marginBottom: '1rem',
                  whiteSpace: 'pre-line'
                }}>
                  {pyq.question_md}
                </div>

                {/* Options if MCQ or MSQ */}
                {pyq.options && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
                    {pyq.options.map(opt => (
                      <div
                        key={opt.key}
                        style={{
                          background: '#131b2d',
                          border: '1px solid #1e293b',
                          borderRadius: '0.4rem',
                          padding: '0.6rem 0.85rem',
                          fontSize: '0.85rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem'
                        }}
                      >
                        <span style={{ fontWeight: 800, color: '#38bdf8' }}>({opt.key})</span>
                        <span>{opt.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* 30s Shortcut Card */}
                <div style={{
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  borderRadius: '0.5rem',
                  padding: '0.85rem 1rem',
                  marginBottom: '1rem',
                  fontSize: '0.88rem',
                  color: '#fbbf24',
                  whiteSpace: 'pre-line'
                }}>
                  <div style={{ fontWeight: 800, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Zap size={15} />
                    <span>30-Second Exam Shortcut Derivation</span>
                  </div>
                  {pyq.shortcut_30s_md}
                </div>

                {/* Toggle Full Solution & Official Key */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <button
                    onClick={() => toggleSolution(pyq.id)}
                    style={{
                      background: isRevealed ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                      border: '1px solid #38bdf8',
                      color: '#38bdf8',
                      padding: '0.4rem 0.85rem',
                      borderRadius: '0.4rem',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {isRevealed ? 'Hide Full Solution' : 'View Verified Solution & Key'}
                  </button>

                  <a
                    href={pyq.official_pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.78rem',
                      color: 'var(--text-dim)',
                      textDecoration: 'none'
                    }}
                  >
                    <span>Official Answer Key PDF</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                {isRevealed && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: '#111827',
                    borderRadius: '0.5rem',
                    border: '1px solid #374151',
                    fontSize: '0.88rem',
                    lineHeight: 1.6,
                    color: '#e5e7eb',
                    whiteSpace: 'pre-line'
                  }}>
                    <div style={{ fontWeight: 800, color: '#4ade80', marginBottom: '0.5rem' }}>
                      Official Answer Key: {JSON.stringify(pyq.official_answer_key)}
                    </div>
                    {pyq.full_solution_md}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 11 Syllabus Units Directory */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem' }}>
          All 11 Official GATE CS Syllabus Units
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem'
        }}>
          {GATE_UNITS.map(unit => (
            <div
              key={unit.id}
              style={{
                background: '#090e1a',
                border: '1px solid var(--border-color)',
                borderLeft: `4px solid ${unit.theme_color}`,
                borderRadius: '0.5rem',
                padding: '1rem'
              }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.35rem' }}>
                {unit.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                {unit.description}
              </p>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: unit.theme_color }}>
                {unit.total_problems} PYQ Drill Questions
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* TCS Virtual Calculator Modal */}
      <TcsCalculatorModal
        isOpen={isCalcOpen}
        onClose={() => setIsCalcOpen(false)}
      />
    </div>
  );
}
