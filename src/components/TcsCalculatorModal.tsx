'use client';

import React, { useState } from 'react';
import { X, Calculator, RotateCcw } from 'lucide-react';
import { playTactileClick } from '@/lib/store';

interface TcsCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TcsCalculatorModal: React.FC<TcsCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
  const [isRad, setIsRad] = useState(true); // Default radians as in engineering calculations
  const [history, setHistory] = useState('');

  if (!isOpen) return null;

  const handleKey = (char: string) => {
    playTactileClick();
    if (display === '0' || display === 'Error') {
      setDisplay(char);
    } else {
      setDisplay(prev => prev + char);
    }
  };

  const handleClear = () => {
    playTactileClick();
    setDisplay('0');
    setHistory('');
  };

  const handleBackspace = () => {
    playTactileClick();
    if (display.length <= 1) {
      setDisplay('0');
    } else {
      setDisplay(prev => prev.slice(0, -1));
    }
  };

  const evaluateResult = () => {
    playTactileClick();
    try {
      // Replace symbols for safe standard evaluation
      let sanitized = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E');

      // Safely evaluate simple arithmetic
      // eslint-disable-next-line no-eval
      const result = Function(`"use strict"; return (${sanitized})`)();
      setHistory(display + ' =');
      setDisplay(String(Number(result.toFixed(8))));
    } catch {
      setDisplay('Error');
    }
  };

  const handleUnaryOp = (op: string) => {
    playTactileClick();
    try {
      const val = parseFloat(display);
      let res = 0;
      const angle = isRad ? val : (val * Math.PI) / 180;

      switch (op) {
        case 'sin': res = Math.sin(angle); break;
        case 'cos': res = Math.cos(angle); break;
        case 'tan': res = Math.tan(angle); break;
        case 'asin': res = isRad ? Math.asin(val) : (Math.asin(val) * 180) / Math.PI; break;
        case 'acos': res = isRad ? Math.acos(val) : (Math.acos(val) * 180) / Math.PI; break;
        case 'atan': res = isRad ? Math.atan(val) : (Math.atan(val) * 180) / Math.PI; break;
        case 'ln': res = Math.log(val); break;
        case 'log': res = Math.log10(val); break;
        case 'sqrt': res = Math.sqrt(val); break;
        case 'cbrt': res = Math.cbrt(val); break;
        case 'sq': res = val * val; break;
        case 'cube': res = val * val * val; break;
        case 'reciprocal': res = 1 / val; break;
        case 'fact': {
          let f = 1;
          for (let i = 2; i <= Math.min(val, 25); i++) f *= i;
          res = f;
          break;
        }
        case 'exp': res = Math.exp(val); break;
        case 'neg': res = -val; break;
        default: return;
      }

      setHistory(`${op}(${display})`);
      setDisplay(String(Number(res.toFixed(8))));
    } catch {
      setDisplay('Error');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(5px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        background: '#182030',
        border: '2px solid #38bdf8',
        borderRadius: '0.75rem',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 20px rgba(56, 189, 248, 0.2)',
        width: '100%',
        maxWidth: '560px',
        overflow: 'hidden'
      }}>
        {/* Title bar */}
        <div style={{
          background: '#0f172a',
          padding: '0.6rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #334155'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8' }}>
            <Calculator size={16} />
            <span>TCS iON Virtual Scientific Calculator • GATE 2027</span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Display screen */}
        <div style={{ padding: '0.75rem 1rem', background: '#090e17', borderBottom: '1px solid #1e293b' }}>
          <div style={{ height: '18px', fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
            {history}
          </div>
          <div style={{
            fontSize: '1.6rem',
            fontWeight: 700,
            color: '#4ade80',
            textAlign: 'right',
            fontFamily: 'var(--font-mono)',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }}>
            {display}
          </div>
        </div>

        {/* Mode & memory strip */}
        <div style={{
          padding: '0.4rem 1rem',
          background: '#131c2e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          borderBottom: '1px solid #1e293b'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setIsRad(true)}
              style={{
                background: isRad ? '#0284c7' : 'transparent',
                color: isRad ? '#fff' : 'var(--text-muted)',
                border: '1px solid #0284c7',
                padding: '0.2rem 0.5rem',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              Rad
            </button>
            <button
              onClick={() => setIsRad(false)}
              style={{
                background: !isRad ? '#0284c7' : 'transparent',
                color: !isRad ? '#fff' : 'var(--text-muted)',
                border: '1px solid #0284c7',
                padding: '0.2rem 0.5rem',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              Deg
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button
              onClick={() => { playTactileClick(); setMemory(0); }}
              style={{ background: '#1e293b', border: 'none', color: '#94a3b8', padding: '0.2rem 0.4rem', borderRadius: '0.25rem', cursor: 'pointer' }}
            >
              MC
            </button>
            <button
              onClick={() => { playTactileClick(); setDisplay(String(memory)); }}
              style={{ background: '#1e293b', border: 'none', color: '#94a3b8', padding: '0.2rem 0.4rem', borderRadius: '0.25rem', cursor: 'pointer' }}
            >
              MR
            </button>
            <button
              onClick={() => { playTactileClick(); setMemory(parseFloat(display) || 0); }}
              style={{ background: '#1e293b', border: 'none', color: '#94a3b8', padding: '0.2rem 0.4rem', borderRadius: '0.25rem', cursor: 'pointer' }}
            >
              MS
            </button>
            <button
              onClick={() => { playTactileClick(); setMemory(m => m + (parseFloat(display) || 0)); }}
              style={{ background: '#1e293b', border: 'none', color: '#94a3b8', padding: '0.2rem 0.4rem', borderRadius: '0.25rem', cursor: 'pointer' }}
            >
              M+
            </button>
          </div>
        </div>

        {/* Buttons Grid */}
        <div style={{
          padding: '0.75rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '0.35rem'
        }}>
          {/* Row 1 */}
          <button onClick={() => handleUnaryOp('sin')} style={btnOpStyle}>sin</button>
          <button onClick={() => handleUnaryOp('cos')} style={btnOpStyle}>cos</button>
          <button onClick={() => handleUnaryOp('tan')} style={btnOpStyle}>tan</button>
          <button onClick={() => handleUnaryOp('asin')} style={btnOpStyle}>sin⁻¹</button>
          <button onClick={() => handleUnaryOp('acos')} style={btnOpStyle}>cos⁻¹</button>
          <button onClick={() => handleUnaryOp('atan')} style={btnOpStyle}>tan⁻¹</button>

          {/* Row 2 */}
          <button onClick={() => handleUnaryOp('ln')} style={btnOpStyle}>ln</button>
          <button onClick={() => handleUnaryOp('log')} style={btnOpStyle}>log₁₀</button>
          <button onClick={() => handleUnaryOp('sqrt')} style={btnOpStyle}>√x</button>
          <button onClick={() => handleUnaryOp('sq')} style={btnOpStyle}>x²</button>
          <button onClick={() => handleKey('(')} style={btnOpStyle}>(</button>
          <button onClick={() => handleKey(')')} style={btnOpStyle}>)</button>

          {/* Row 3 */}
          <button onClick={() => handleUnaryOp('reciprocal')} style={btnOpStyle}>1/x</button>
          <button onClick={() => handleUnaryOp('fact')} style={btnOpStyle}>n!</button>
          <button onClick={() => handleKey('7')} style={btnNumStyle}>7</button>
          <button onClick={() => handleKey('8')} style={btnNumStyle}>8</button>
          <button onClick={() => handleKey('9')} style={btnNumStyle}>9</button>
          <button onClick={() => handleKey('÷')} style={btnActionStyle}>÷</button>

          {/* Row 4 */}
          <button onClick={() => handleKey('π')} style={btnOpStyle}>π</button>
          <button onClick={() => handleKey('e')} style={btnOpStyle}>e</button>
          <button onClick={() => handleKey('4')} style={btnNumStyle}>4</button>
          <button onClick={() => handleKey('5')} style={btnNumStyle}>5</button>
          <button onClick={() => handleKey('6')} style={btnNumStyle}>6</button>
          <button onClick={() => handleKey('×')} style={btnActionStyle}>×</button>

          {/* Row 5 */}
          <button onClick={handleClear} style={{ ...btnActionStyle, color: '#f87171' }}>C</button>
          <button onClick={handleBackspace} style={btnActionStyle}>⌫</button>
          <button onClick={() => handleKey('1')} style={btnNumStyle}>1</button>
          <button onClick={() => handleKey('2')} style={btnNumStyle}>2</button>
          <button onClick={() => handleKey('3')} style={btnNumStyle}>3</button>
          <button onClick={() => handleKey('-')} style={btnActionStyle}>-</button>

          {/* Row 6 */}
          <button onClick={() => handleUnaryOp('neg')} style={btnOpStyle}>±</button>
          <button onClick={() => handleUnaryOp('exp')} style={btnOpStyle}>eˣ</button>
          <button onClick={() => handleKey('0')} style={btnNumStyle}>0</button>
          <button onClick={() => handleKey('.')} style={btnNumStyle}>.</button>
          <button onClick={evaluateResult} style={{ ...btnNumStyle, background: '#22c55e', color: '#052e16', fontWeight: 800 }}>=</button>
          <button onClick={() => handleKey('+')} style={btnActionStyle}>+</button>
        </div>
      </div>
    </div>
  );
};

const btnOpStyle: React.CSSProperties = {
  background: '#1e293b',
  border: '1px solid #334155',
  color: '#38bdf8',
  borderRadius: '0.4rem',
  padding: '0.45rem 0.2rem',
  fontSize: '0.8rem',
  fontWeight: 600,
  cursor: 'pointer',
  textAlign: 'center'
};

const btnNumStyle: React.CSSProperties = {
  background: '#0f172a',
  border: '1px solid #1e293b',
  color: '#f8fafc',
  borderRadius: '0.4rem',
  padding: '0.45rem 0.2rem',
  fontSize: '0.95rem',
  fontWeight: 700,
  cursor: 'pointer',
  textAlign: 'center'
};

const btnActionStyle: React.CSSProperties = {
  background: '#334155',
  border: '1px solid #475569',
  color: '#f8fafc',
  borderRadius: '0.4rem',
  padding: '0.45rem 0.2rem',
  fontSize: '0.95rem',
  fontWeight: 700,
  cursor: 'pointer',
  textAlign: 'center'
};
