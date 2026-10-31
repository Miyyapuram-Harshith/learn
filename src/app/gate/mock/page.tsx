'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GATE_PYQS } from '@/data/gateCurriculum';
import { TcsCalculatorModal } from '@/components/TcsCalculatorModal';
import { 
  Calculator, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle,
  Accessibility,
  ArrowLeft
} from 'lucide-react';
import { playTactileClick, playSuccessChime } from '@/lib/store';

type QuestionStatus = 'not_visited' | 'not_answered' | 'answered' | 'marked_review' | 'answered_marked';

export default function GateMockPage() {
  const [isPwdMode, setIsPwdMode] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(180 * 60); // 180 mins
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);

  // 65 questions state
  const totalQuestions = 65;
  const [statuses, setStatuses] = useState<QuestionStatus[]>(() => {
    const s = new Array(totalQuestions).fill('not_visited');
    s[0] = 'not_answered';
    return s;
  });
  const [userAnswers, setUserAnswers] = useState<Record<number, string | string[]>>({});
  const [natInput, setNatInput] = useState('');

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const togglePwdMode = () => {
    playTactileClick();
    const next = !isPwdMode;
    setIsPwdMode(next);
    setSecondsLeft(next ? 240 * 60 : 180 * 60);
  };

  const formatTimer = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Current question data (pull from PYQs vault with loop fallback)
  const currentQ = GATE_PYQS[currentQIndex % GATE_PYQS.length];
  const questionNumber = currentQIndex + 1;

  const handleSelectQuestion = (idx: number) => {
    playTactileClick();
    if (statuses[idx] === 'not_visited') {
      const updated = [...statuses];
      updated[idx] = 'not_answered';
      setStatuses(updated);
    }
    setCurrentQIndex(idx);
    setNatInput((userAnswers[idx] as string) || '');
  };

  const handleSaveAndNext = () => {
    playTactileClick();
    const updated = [...statuses];
    const hasAnswer = userAnswers[currentQIndex] !== undefined && userAnswers[currentQIndex] !== '';
    updated[currentQIndex] = hasAnswer ? 'answered' : 'not_answered';
    setStatuses(updated);

    if (currentQIndex < totalQuestions - 1) {
      handleSelectQuestion(currentQIndex + 1);
    }
  };

  const handleMarkReviewAndNext = () => {
    playTactileClick();
    const updated = [...statuses];
    const hasAnswer = userAnswers[currentQIndex] !== undefined && userAnswers[currentQIndex] !== '';
    updated[currentQIndex] = hasAnswer ? 'answered_marked' : 'marked_review';
    setStatuses(updated);

    if (currentQIndex < totalQuestions - 1) {
      handleSelectQuestion(currentQIndex + 1);
    }
  };

  const handleClearResponse = () => {
    playTactileClick();
    const nextAns = { ...userAnswers };
    delete nextAns[currentQIndex];
    setUserAnswers(nextAns);
    setNatInput('');
    const updated = [...statuses];
    updated[currentQIndex] = 'not_answered';
    setStatuses(updated);
  };

  const handleMcqSelect = (key: string) => {
    playTactileClick();
    setUserAnswers(prev => ({ ...prev, [currentQIndex]: key }));
  };

  const handleMsqToggle = (key: string) => {
    playTactileClick();
    const current = (userAnswers[currentQIndex] as string[]) || [];
    const exists = current.includes(key);
    const next = exists ? current.filter(k => k !== key) : [...current, key];
    setUserAnswers(prev => ({ ...prev, [currentQIndex]: next }));
  };

  const handleNatKeypad = (char: string) => {
    playTactileClick();
    const next = natInput + char;
    setNatInput(next);
    setUserAnswers(prev => ({ ...prev, [currentQIndex]: next }));
  };

  // Status counts for palette legend
  const countAnswered = statuses.filter(s => s === 'answered').length;
  const countNotAnswered = statuses.filter(s => s === 'not_answered').length;
  const countNotVisited = statuses.filter(s => s === 'not_visited').length;
  const countMarkedReview = statuses.filter(s => s === 'marked_review').length;
  const countAnsweredMarked = statuses.filter(s => s === 'answered_marked').length;

  return (
    <div style={{ minHeight: '100vh', background: '#060a13', color: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      {/* CBT Header */}
      <header style={{
        background: '#0c1222',
        borderBottom: '2px solid #1e293b',
        padding: '0.65rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link
            href="/gate"
            onClick={playTactileClick}
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}
          >
            <ArrowLeft size={16} />
            <span>Exit Test</span>
          </Link>
          <div style={{ height: '18px', width: '1px', background: '#334155' }} />
          <div>
            <h1 style={{ fontSize: '1.05rem', fontWeight: 800 }}>
              GATE CS 2027 Official CBT Mock • 65 Questions (100 Marks)
            </h1>
            <span style={{ fontSize: '0.75rem', color: '#38bdf8' }}>IIT Madras Standard Interface</span>
          </div>
        </div>

        {/* Top Controls: PwD Toggle, Calculator, Timer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* PwD Compensatory Mode Toggle */}
          <button
            onClick={togglePwdMode}
            title="Toggle PwD Compensatory Time (+60 min) per O.M. F. No. P-13013/75/2023"
            style={{
              background: isPwdMode ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${isPwdMode ? '#a855f7' : 'var(--border-color)'}`,
              color: isPwdMode ? '#c084fc' : 'var(--text-muted)',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.4rem 0.75rem',
              borderRadius: '0.4rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Accessibility size={15} />
            <span>{isPwdMode ? 'PwD 240m Mode Active' : 'PwD (+60m) Mode'}</span>
          </button>

          {/* Calculator Button */}
          <button
            onClick={() => { playTactileClick(); setIsCalcOpen(true); }}
            className="btn-3d btn-3d-cyan"
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
          >
            <Calculator size={15} />
            <span>Calculator</span>
          </button>

          {/* Timer Display */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            padding: '0.4rem 0.85rem',
            borderRadius: '0.4rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            fontSize: '1rem',
            color: '#f87171'
          }}>
            <Clock size={16} />
            <span>{formatTimer(secondsLeft)}</span>
          </div>
        </div>
      </header>

      {/* Main Body: Question Area (Left) + Question Palette (Right) */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px' }}>
        {/* Left Question Area */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border-color)' }}>
          {/* Question Details Strip */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#0d1527',
            padding: '0.65rem 1rem',
            borderRadius: '0.5rem',
            marginBottom: '1.25rem',
            border: '1px solid var(--border-color)',
            fontSize: '0.85rem'
          }}>
            <span style={{ fontWeight: 800, color: '#38bdf8' }}>
              Question {questionNumber} of 65
            </span>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Type: <strong style={{ color: '#f8fafc' }}>{currentQ.question_type}</strong></span>
              <span style={{ color: '#4ade80' }}>+{currentQ.marks} Marks</span>
              <span style={{ color: '#f87171' }}>-{currentQ.negative_marks} Neg</span>
            </div>
          </div>

          {/* Question Content */}
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#f1f5f9', whiteSpace: 'pre-line', marginBottom: '1.5rem' }}>
              {currentQ.question_md}
            </div>

            {/* MCQ Options */}
            {currentQ.question_type === 'MCQ' && currentQ.options && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {currentQ.options.map(opt => {
                  const isSelected = userAnswers[currentQIndex] === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleMcqSelect(opt.key)}
                      style={{
                        padding: '0.85rem 1.25rem',
                        borderRadius: '0.5rem',
                        background: isSelected ? 'rgba(56, 189, 248, 0.2)' : '#0d1322',
                        border: `1.5px solid ${isSelected ? '#38bdf8' : 'var(--border-color)'}`,
                        color: '#f8fafc',
                        fontSize: '0.92rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}
                    >
                      <span style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: isSelected ? '#38bdf8' : '#1e293b',
                        color: isSelected ? '#000' : 'var(--text-dim)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800
                      }}>
                        {opt.key}
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* MSQ Options (Multiple choice checkbox) */}
            {currentQ.question_type === 'MSQ' && currentQ.options && (
              <div>
                <div style={{ fontSize: '0.8rem', color: '#c084fc', marginBottom: '0.6rem', fontWeight: 700 }}>
                  Multiple Select Question (0 negative marking, 0 partial marks):
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {currentQ.options.map(opt => {
                    const selectedList = (userAnswers[currentQIndex] as string[]) || [];
                    const isSelected = selectedList.includes(opt.key);
                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleMsqToggle(opt.key)}
                        style={{
                          padding: '0.85rem 1.25rem',
                          borderRadius: '0.5rem',
                          background: isSelected ? 'rgba(192, 132, 252, 0.2)' : '#0d1322',
                          border: `1.5px solid ${isSelected ? '#c084fc' : 'var(--border-color)'}`,
                          color: '#f8fafc',
                          fontSize: '0.92rem',
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem'
                        }}
                      >
                        <span style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '4px',
                          background: isSelected ? '#c084fc' : '#1e293b',
                          color: isSelected ? '#000' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800
                        }}>
                          ✓
                        </span>
                        <span style={{ fontWeight: 700, color: '#c084fc' }}>({opt.key})</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* NAT Virtual Keypad */}
            {currentQ.question_type === 'NAT' && (
              <div style={{ maxWidth: '320px', background: '#0d1527', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 700, marginBottom: '0.5rem' }}>
                  NAT Virtual Keypad (Signed Decimals supported):
                </div>
                <input
                  type="text"
                  readOnly
                  value={natInput}
                  placeholder="Enter numerical answer"
                  style={{
                    width: '100%',
                    background: '#040711',
                    border: '1px solid var(--border-color)',
                    color: '#4ade80',
                    fontWeight: 800,
                    fontSize: '1.2rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.4rem',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '0.75rem'
                  }}
                />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                  {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', '-'].map(c => (
                    <button
                      key={c}
                      onClick={() => handleNatKeypad(c)}
                      style={{
                        padding: '0.6rem',
                        background: '#1e293b',
                        border: 'none',
                        color: '#f8fafc',
                        borderRadius: '0.35rem',
                        fontWeight: 700,
                        fontSize: '1rem',
                        cursor: 'pointer'
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    playTactileClick();
                    setNatInput(prev => prev.slice(0, -1));
                    setUserAnswers(prev => ({ ...prev, [currentQIndex]: natInput.slice(0, -1) }));
                  }}
                  style={{
                    width: '100%',
                    marginTop: '0.4rem',
                    padding: '0.5rem',
                    background: '#334155',
                    border: 'none',
                    color: '#f8fafc',
                    borderRadius: '0.35rem',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Backspace ⌫
                </button>
              </div>
            )}
          </div>

          {/* Bottom Action Strip */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handleMarkReviewAndNext}
                className="btn-3d btn-3d-ghost"
                style={{ fontSize: '0.85rem', color: '#c084fc' }}
              >
                Mark for Review & Next
              </button>
              <button
                onClick={handleClearResponse}
                className="btn-3d btn-3d-ghost"
                style={{ fontSize: '0.85rem', color: '#f87171' }}
              >
                Clear Response
              </button>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => currentQIndex > 0 && handleSelectQuestion(currentQIndex - 1)}
                disabled={currentQIndex === 0}
                className="btn-3d btn-3d-ghost"
                style={{ fontSize: '0.85rem' }}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <button
                onClick={handleSaveAndNext}
                className="btn-3d btn-3d-green"
                style={{ fontSize: '0.85rem' }}
              >
                <span>Save & Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Question Palette */}
        <div style={{ background: '#090e1a', padding: '1.25rem', overflowY: 'auto' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Question Palette
          </h3>

          {/* Palette Legend */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.72rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: '12px', height: '12px', background: '#22c55e', borderRadius: '2px' }} />
              <span>Answered ({countAnswered})</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '2px' }} />
              <span>Not Answered ({countNotAnswered})</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: '12px', height: '12px', background: '#a855f7', borderRadius: '2px' }} />
              <span>Review ({countMarkedReview})</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: '12px', height: '12px', background: '#475569', borderRadius: '2px' }} />
              <span>Not Visited ({countNotVisited})</span>
            </div>
          </div>

          {/* 65 Questions Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '0.45rem'
          }}>
            {statuses.map((st, idx) => {
              let bg = '#334155';
              if (st === 'answered') bg = '#22c55e';
              else if (st === 'not_answered') bg = '#ef4444';
              else if (st === 'marked_review') bg = '#a855f7';
              else if (st === 'answered_marked') bg = '#8b5cf6';

              const isCurrent = currentQIndex === idx;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectQuestion(idx)}
                  style={{
                    height: '36px',
                    background: bg,
                    color: st === 'answered' ? '#052e16' : '#fff',
                    border: isCurrent ? '2px solid #38bdf8' : 'none',
                    borderRadius: '4px',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    boxShadow: isCurrent ? '0 0 8px #38bdf8' : 'none'
                  }}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
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
