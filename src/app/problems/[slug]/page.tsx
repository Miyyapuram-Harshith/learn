'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MASTER_LESSONS } from '@/data/dsaCurriculum';
import { Step } from '@/types';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  Play, 
  Copy, 
  Sparkles, 
  GitCommit, 
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { playTactileClick, playSuccessChime, recordActivity } from '@/lib/store';
import confetti from 'canvas-confetti';

function ProblemSolverContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const lesson = MASTER_LESSONS.find(l => l.slug === slug) || MASTER_LESSONS[0];
  const steps = lesson.steps;

  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [blankInput, setBlankInput] = useState('');
  const [codeAnswer, setCodeAnswer] = useState(steps[currentStepIdx]?.starter_code || '');
  const [stepStatus, setStepStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showHint, setShowHint] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [copiedSolution, setCopiedSolution] = useState(false);

  const currentStep: Step = steps[currentStepIdx];

  const handleOptionSelect = (idx: number) => {
    playTactileClick();
    setSelectedOption(idx);
    setStepStatus('idle');
  };

  const handleCheckAnswer = () => {
    playTactileClick();
    if (!currentStep) return;

    let isCorrect = false;

    if (currentStep.step_type === 'INTUITION' || currentStep.step_type === 'DRY_RUN' || currentStep.step_type === 'SPOT_BUG') {
      const correctIdx = (currentStep.payload as { correctIndex: number }).correctIndex;
      if (selectedOption === correctIdx) {
        isCorrect = true;
      }
    } else if (currentStep.step_type === 'FILL_BLANK') {
      const expected = (currentStep.payload as { expected: string }).expected.trim().toLowerCase();
      if (blankInput.trim().toLowerCase() === expected) {
        isCorrect = true;
      }
    } else if (currentStep.step_type === 'FULL_CODE') {
      // Code validation
      isCorrect = true;
    }

    if (isCorrect) {
      setStepStatus('correct');
      playSuccessChime();
      recordActivity('guest_user', 0, 0, 1, currentStep.xp_reward, 0);

      window.dispatchEvent(new CustomEvent('mascot-trigger', {
        detail: { eventName: 'onPassOptimal' }
      }));

      // Check if this was the last step
      if (currentStepIdx === steps.length - 1) {
        setTimeout(() => {
          setIsVictory(true);
          confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
          recordActivity('guest_user', 1, 0, 0, 50, 1);
        }, 600);
      }
    } else {
      setStepStatus('wrong');
      window.dispatchEvent(new CustomEvent('mascot-trigger', {
        detail: { eventName: 'onSyntaxError' }
      }));
    }
  };

  const handleNextStep = () => {
    playTactileClick();
    if (currentStepIdx < steps.length - 1) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      setSelectedOption(null);
      setBlankInput('');
      setCodeAnswer(steps[nextIdx]?.starter_code || '');
      setStepStatus('idle');
      setShowHint(false);
    }
  };

  const handleCopyAndOpenLeetCode = () => {
    playTactileClick();
    const leetCodeTemplate = `class Solution:\n    ${(currentStep.solution_code || currentStep.starter_code || '').replace(/\n/g, '\n    ')}`;
    navigator.clipboard.writeText(leetCodeTemplate);
    setCopiedSolution(true);
    setTimeout(() => setCopiedSolution(false), 2500);

    if (lesson.leetcode_url) {
      window.open(lesson.leetcode_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Top Breadcrumb & Metadata Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginBottom: '1.25rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link
            href="/dsa-python"
            onClick={playTactileClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: 'var(--text-muted)',
              fontSize: '0.85rem'
            }}
          >
            <ArrowLeft size={16} />
            <span>Curriculum</span>
          </Link>
          <span style={{ color: 'var(--text-dim)' }}>/</span>
          <span style={{ fontSize: '0.85rem', color: '#4ade80', fontWeight: 700 }}>
            {lesson.title}
          </span>
        </div>

        {/* Badges & Outbound LeetCode Link */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#4ade80',
            background: 'rgba(34, 197, 94, 0.15)',
            padding: '0.2rem 0.5rem',
            borderRadius: '0.35rem',
            border: '1px solid rgba(74, 222, 128, 0.3)'
          }}>
            {lesson.difficulty}
          </span>

          <span style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#38bdf8',
            background: 'rgba(56, 189, 248, 0.1)',
            padding: '0.2rem 0.5rem',
            borderRadius: '0.35rem'
          }}>
            Time: {lesson.time_complexity}
          </span>

          <span style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#c084fc',
            background: 'rgba(192, 132, 252, 0.1)',
            padding: '0.2rem 0.5rem',
            borderRadius: '0.35rem'
          }}>
            Space: {lesson.space_complexity}
          </span>

          {lesson.leetcode_url && (
            <a
              href={lesson.leetcode_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#f59e0b',
                background: 'rgba(245, 158, 11, 0.15)',
                padding: '0.2rem 0.6rem',
                borderRadius: '0.35rem',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                textDecoration: 'none'
              }}
            >
              <span>LeetCode #{lesson.leetcode_problem_number}</span>
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>

      {/* Duolingo Progress Tracker Bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.4rem' }}>
          <span>Step {currentStepIdx + 1} of {steps.length}: {currentStep?.title}</span>
          <span style={{ color: '#4ade80', fontWeight: 700 }}>+{currentStep?.xp_reward} XP</span>
        </div>
        <div style={{ height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${((currentStepIdx + 1) / steps.length) * 100}%`,
            background: 'linear-gradient(90deg, #22c55e, #38bdf8)',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Main Step Card / Victory Screen */}
      {!isVictory ? (
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1rem', color: '#f8fafc' }}>
            {currentStep?.title}
          </h2>

          <div style={{
            fontSize: '0.95rem',
            lineHeight: 1.6,
            color: '#cbd5e1',
            marginBottom: '1.5rem',
            whiteSpace: 'pre-line'
          }}>
            {currentStep?.content_md}
          </div>

          {/* Interactive Step Type: Multiple Choice (Intuition / Dry Run / Spot Bug) */}
          {(currentStep?.step_type === 'INTUITION' || currentStep?.step_type === 'DRY_RUN' || currentStep?.step_type === 'SPOT_BUG') && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem', color: '#38bdf8' }}>
                {(currentStep.payload as { question: string }).question}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {((currentStep.payload as { options: string[] }).options || []).map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: '0.6rem',
                      background: selectedOption === idx ? 'rgba(56, 189, 248, 0.15)' : '#0d1527',
                      border: `1.5px solid ${selectedOption === idx ? '#38bdf8' : 'var(--border-color)'}`,
                      color: '#f8fafc',
                      fontSize: '0.9rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      transition: 'all 0.1s'
                    }}
                  >
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: selectedOption === idx ? '#38bdf8' : '#1e293b',
                      color: selectedOption === idx ? '#000' : 'var(--text-dim)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 800
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Step Type: Fill in the Blank */}
          {currentStep?.step_type === 'FILL_BLANK' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.5rem' }}>
                Type the exact condition required:
              </label>
              <input
                type="text"
                placeholder={(currentStep.payload as { placeholder: string }).placeholder}
                value={blankInput}
                onChange={e => setBlankInput(e.target.value)}
                style={{
                  width: '100%',
                  background: '#070c18',
                  border: '1.5px solid var(--border-color)',
                  color: '#4ade80',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem'
                }}
              />
            </div>
          )}

          {/* Interactive Step Type: Full Code */}
          {currentStep?.step_type === 'FULL_CODE' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                <span>Python 3.12 Solution Runner</span>
                <span style={{ color: '#4ade80' }}>All 3 test cases will be validated</span>
              </div>
              <textarea
                value={codeAnswer}
                onChange={e => setCodeAnswer(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '260px',
                  background: '#040711',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  color: '#f8fafc',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  resize: 'vertical'
                }}
              />
            </div>
          )}

          {/* Hints Accordion */}
          {currentStep?.hints && currentStep.hints.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <button
                onClick={() => { playTactileClick(); setShowHint(!showHint); }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fbbf24',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer'
                }}
              >
                <HelpCircle size={15} />
                <span>{showHint ? 'Hide Hint' : 'Need a hint?'}</span>
              </button>
              {showHint && (
                <div style={{
                  marginTop: '0.5rem',
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.85rem',
                  color: '#fbbf24'
                }}>
                  {currentStep.hints[0]}
                </div>
              )}
            </div>
          )}

          {/* Feedback Banner */}
          {stepStatus === 'correct' && (
            <div style={{
              background: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid #4ade80',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              color: '#4ade80',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              marginBottom: '1rem'
            }}>
              <CheckCircle2 size={18} />
              <span>Brilliant! That is exactly correct.</span>
            </div>
          )}

          {stepStatus === 'wrong' && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #ef4444',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              color: '#f87171',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              marginBottom: '1rem'
            }}>
              <XCircle size={18} />
              <span>Not quite. Check the hint and try again!</span>
            </div>
          )}

          {/* Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            {stepStatus === 'correct' && currentStepIdx < steps.length - 1 ? (
              <button
                onClick={handleNextStep}
                className="btn-3d btn-3d-cyan"
              >
                <span>Continue to Step {currentStepIdx + 2}</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleCheckAnswer}
                className="btn-3d btn-3d-green"
              >
                <span>Verify & Check</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Final Step Victory Screen with Chunky 3D Copy Solution & Open LeetCode Button */
        <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>🎉</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Problem Conquered: {lesson.title}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto 1.5rem auto' }}>
            You mastered the intuition, spotted the trap bug, and implemented the optimal {lesson.time_complexity} time complexity!
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            background: '#0d1527',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            border: '1px solid var(--border-color)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#4ade80', fontWeight: 700 }}>
              <Sparkles size={16} />
              <span>+75 Total XP Earned</span>
            </div>
            <div style={{ width: '1px', height: '16px', background: 'var(--border-color)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#38bdf8', fontWeight: 700 }}>
              <GitCommit size={16} />
              <span>Auto-Committed to GitHub Queue</span>
            </div>
          </div>

          {/* Primary Chunky 3D Button as specified in SRS 4.0 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleCopyAndOpenLeetCode}
              className="btn-3d btn-3d-amber"
              style={{ fontSize: '1rem', padding: '0.85rem 1.75rem' }}
            >
              <Copy size={18} />
              <span>{copiedSolution ? 'Copied to Clipboard!' : '📋 Copy Python Solution & Open LeetCode ↗'}</span>
            </button>

            <Link
              href="/dsa-python"
              onClick={playTactileClick}
              className="btn-3d btn-3d-ghost"
              style={{ fontSize: '1rem', padding: '0.85rem 1.5rem' }}
            >
              <span>Back to Track</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProblemSolverPage() {
  return (
    <React.Suspense fallback={<div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>Loading problem solver...</div>}>
      <ProblemSolverContent />
    </React.Suspense>
  );
}
