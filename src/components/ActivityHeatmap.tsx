'use client';

import React, { useState } from 'react';
import { DailyActivity } from '@/types';
import { Sparkles, Snowflake } from 'lucide-react';

interface ActivityHeatmapProps {
  activities: DailyActivity[];
  username?: string;
}

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ activities, username }) => {
  const [hoveredDay, setHoveredDay] = useState<{
    activity: DailyActivity;
    x: number;
    y: number;
  } | null>(null);

  // Group into 53 weeks of 7 days
  const weeks: DailyActivity[][] = [];
  let currentWeek: DailyActivity[] = [];

  activities.forEach((act, idx) => {
    currentWeek.push(act);
    if (currentWeek.length === 7 || idx === activities.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  const getCellClass = (act: DailyActivity) => {
    if (act.used_streak_freeze) return 'cell-freeze';
    const score = (10 * act.dsa_solved_count) + (3 * act.gate_pyq_solved_count) + (5 * act.github_commits_count) + (1 * act.steps_completed_count);
    if (score === 0) return 'cell-level-0';
    if (score < 15) return 'cell-level-1';
    if (score < 35) return 'cell-level-2';
    if (score < 60) return 'cell-level-3';
    return 'cell-level-4';
  };

  // Month labels helper
  const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>365-Day Activity Heatmap</span>
            {username && <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>({username})</span>}
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Daily Score = (10 × DSA) + (3 × GATE) + (5 × GitHub) + (1 × Micro-Steps)
          </p>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          <span>Less</span>
          <div className="heatmap-cell cell-level-0" />
          <div className="heatmap-cell cell-level-1" />
          <div className="heatmap-cell cell-level-2" />
          <div className="heatmap-cell cell-level-3" />
          <div className="heatmap-cell cell-level-4" />
          <span>More</span>
          <span style={{ marginLeft: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <span className="heatmap-cell cell-freeze" style={{ display: 'inline-block' }} /> 🧊 Freeze
          </span>
          <span style={{ marginLeft: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <span className="heatmap-cell cell-level-4 cell-sparkle" style={{ display: 'inline-block' }} /> ⭐ Boss
          </span>
        </div>
      </div>

      {/* Month Labels Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.7rem',
        color: 'var(--text-dim)',
        marginBottom: '0.35rem',
        paddingLeft: '1.5rem',
        paddingRight: '0.5rem'
      }}>
        {months.map((m, i) => (
          <span key={i}>{m}</span>
        ))}
      </div>

      {/* SVG Heatmap Grid */}
      <div style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
        <div style={{ display: 'flex', gap: '3px' }}>
          {/* Day of week labels */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
            fontSize: '0.65rem',
            color: 'var(--text-dim)',
            paddingRight: '0.25rem',
            lineHeight: '13px'
          }}>
            <span>Mon</span>
            <span>&nbsp;</span>
            <span>Wed</span>
            <span>&nbsp;</span>
            <span>Fri</span>
            <span>&nbsp;</span>
            <span>Sun</span>
          </div>

          {/* 53 Columns of 7 Days */}
          {weeks.map((week, wIdx) => (
            <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {week.map((day, dIdx) => {
                const cellClass = getCellClass(day);
                const isSparkle = day.is_boss_day;

                return (
                  <div
                    key={dIdx}
                    className={`heatmap-cell ${cellClass} ${isSparkle ? 'cell-sparkle' : ''}`}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredDay({
                        activity: day,
                        x: rect.left + window.scrollX,
                        y: rect.top + window.scrollY - 80
                      });
                    }}
                    onMouseLeave={() => setHoveredDay(null)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Floating Tooltip */}
      {hoveredDay && (
        <div style={{
          position: 'fixed',
          left: `${hoveredDay.x - 100}px`,
          top: `${hoveredDay.y}px`,
          zIndex: 100,
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid var(--border-color)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          borderRadius: '0.5rem',
          padding: '0.5rem 0.75rem',
          pointerEvents: 'none',
          fontSize: '0.78rem',
          color: '#f8fafc',
          whiteSpace: 'nowrap'
        }}>
          <div style={{ fontWeight: 700, color: '#38bdf8', marginBottom: '0.2rem' }}>
            {hoveredDay.activity.activity_date}
            {hoveredDay.activity.used_streak_freeze && ' • Streak Freeze 🧊'}
            {hoveredDay.activity.is_boss_day && ' • Boss Fight Conquered ⭐'}
          </div>
          <div style={{ color: 'var(--text-muted)' }}>
            {hoveredDay.activity.dsa_solved_count} DSA Problems · {hoveredDay.activity.gate_pyq_solved_count} GATE PYQs · {hoveredDay.activity.github_commits_count} GitHub Commits · <strong style={{ color: '#4ade80' }}>{hoveredDay.activity.xp_earned} XP</strong>
          </div>
        </div>
      )}
    </div>
  );
};
