import React from 'react';
import { DISCLAIMER } from '../../content/human-os';

export const Disclaimer: React.FC<{ className?: string; tone?: 'light' | 'dark' }> = ({ className = '', tone = 'light' }) => (
  <p className={`text-xs leading-relaxed ${tone === 'dark' ? 'text-slate-300' : 'text-white/55'} ${className}`}>{DISCLAIMER}</p>
);
