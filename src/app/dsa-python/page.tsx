'use client';

import React from 'react';
import Link from 'next/link';
import { DSA_UNITS, DSA_TOPICS } from '@/data/dsaCurriculum';
import { BookOpen, ExternalLink, Play, CheckCircle2, Trophy, ArrowRight, Shield } from 'lucide-react';
import { playTactileClick } from '@/lib/store';

export default function DsaCurriculumPage() {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Track Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            background: 'rgba(34, 197, 94, 0.2)',
            color: '#4ade80',
            padding: '0.2rem 0.6rem',
            borderRadius: '999px',
            border: '1px solid rgba(74, 222, 128, 0.4)'
          }}>
            11 UNITS • DUOLINGO MICRO-LEARNING LOOP
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Automated GitHub Sync & 365-Day Heatmap
          </span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          Python DSA Mastery Track
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '720px' }}>
          Master algorithmic problem solving step-by-step. Break down each problem through intuition, dry-runs, bug-spotting, and full code before testing on LeetCode.
        </p>
      </div>

      {/* 11 Units List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {DSA_UNITS.map((unit) => {
          const topics = DSA_TOPICS.filter(t => t.unit_id === unit.id);

          return (
            <div
              key={unit.id}
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderLeft: `4px solid ${unit.theme_color}`,
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.25rem' }}>
                    {unit.title}
                  </h2>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    {unit.description}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {unit.leetcode_tag_url && (
                    <a
                      href={unit.leetcode_tag_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--text-dim)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '0.35rem 0.7rem',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--border-color)',
                        textDecoration: 'none'
                      }}
                    >
                      <span>LeetCode Tag</span>
                      <ExternalLink size={13} />
                    </a>
                  )}

                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: unit.theme_color,
                    background: `${unit.theme_color}18`,
                    padding: '0.35rem 0.75rem',
                    borderRadius: '0.5rem',
                    border: `1px solid ${unit.theme_color}40`
                  }}>
                    {unit.total_problems} Problems
                  </span>
                </div>
              </div>

              {/* Topics / Problems Table */}
              {topics.length > 0 ? (
                <div style={{ marginTop: '1rem', background: '#070a14', borderRadius: '0.6rem', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '80px minmax(180px, 1fr) 100px 160px 140px 130px',
                    padding: '0.6rem 1rem',
                    background: '#0d1322',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--text-dim)',
                    borderBottom: '1px solid var(--border-color)'
                  }}>
                    <span>ORDER</span>
                    <span>PROBLEM TITLE</span>
                    <span>DIFFICULTY</span>
                    <span>TARGET COMPLEXITY</span>
                    <span>INTERACTIVE</span>
                    <span style={{ textAlign: 'right' }}>LEETCODE</span>
                  </div>

                  {topics.map(topic => (
                    <React.Fragment key={topic.id}>
                      {topic.leetcode_pattern_links.map((link) => (
                        <div
                          key={link.step_order}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '80px minmax(180px, 1fr) 100px 160px 140px 130px',
                            padding: '0.75rem 1rem',
                            fontSize: '0.85rem',
                            alignItems: 'center',
                            borderBottom: '1px solid rgba(255,255,255,0.04)'
                          }}
                        >
                          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
                            #{link.step_order}
                          </span>

                          <span style={{ fontWeight: 700, color: '#f8fafc' }}>
                            {link.title}
                          </span>

                          <span>
                            <span style={{
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: link.difficulty === 'Easy' ? '#4ade80' : link.difficulty === 'Medium' ? '#fbbf24' : '#f87171',
                              background: link.difficulty === 'Easy' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(251, 191, 36, 0.15)',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '0.3rem'
                            }}>
                              {link.difficulty}
                            </span>
                          </span>

                          <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                            {link.target_complexity}
                          </span>

                          <div>
                            <Link
                              href={`/problems/${link.problem_slug}`}
                              onClick={playTactileClick}
                              className="btn-3d btn-3d-green"
                              style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                            >
                              <Play size={12} fill="currentColor" />
                              <span>Learn Loop</span>
                            </Link>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <a
                              href={link.leetcode_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                fontSize: '0.75rem',
                                color: '#f59e0b',
                                textDecoration: 'none',
                                fontWeight: 600
                              }}
                            >
                              <span>LeetCode</span>
                              <ExternalLink size={12} />
                            </a>
                          </div>
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div style={{
                  padding: '1rem',
                  background: '#070a14',
                  borderRadius: '0.5rem',
                  fontSize: '0.85rem',
                  color: 'var(--text-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span>Curated problem breakdown with Level-1 to Level-3 hints & test cases available in solver.</span>
                  <Link
                    href={`/problems/two-sum`}
                    onClick={playTactileClick}
                    style={{ color: unit.theme_color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <span>Start Unit</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
