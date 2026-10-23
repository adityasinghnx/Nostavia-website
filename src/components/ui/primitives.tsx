import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';

/* ── Arrow used across buttons and links ── */

export const Arrow: React.FC<{ className?: string; diagonal?: boolean }> = ({ className, diagonal }) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={cn('w-4 h-4', diagonal && '-rotate-45', className)}>
    <path d="M2.5 8h10.5M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Buttons. Text rolls up on hover; the arrow nudges. ── */

type ButtonProps = {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  arrow?: boolean;
  disabled?: boolean;
};

const roll = (children: React.ReactNode) => (
  <span className="relative inline-flex overflow-hidden">
    <span className="inline-block transition-transform duration-500 ease-out group-hover:-translate-y-full">{children}</span>
    <span aria-hidden="true" className="absolute inset-0 inline-block translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
      {children}
    </span>
  </span>
);

export const Button: React.FC<ButtonProps> = ({ children, to, href, onClick, type = 'button', variant = 'primary', size = 'md', className, arrow = true, disabled }) => {
  const classes = cn(
    'group relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-[-0.01em] whitespace-nowrap select-none',
    'transition-[background-color,border-color,color,transform] duration-300 ease-out active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
    size === 'sm' && 'h-9 px-4 text-[13.5px]',
    size === 'md' && 'h-11 px-5 text-[15px]',
    size === 'lg' && 'h-[52px] px-6 text-[15.5px]',
    variant === 'primary' && 'bg-honey text-ink hover:bg-honey-300',
    variant === 'secondary' && 'border border-fg/15 text-fg hover:border-fg/40 bg-fg/[0.03]',
    variant === 'ghost' && 'px-0 h-auto text-fg hover:text-accent',
    className,
  );
  const inner = (
    <>
      {roll(children)}
      {arrow && <Arrow className="transition-transform duration-500 ease-out group-hover:translate-x-0.5" />}
    </>
  );

  if (to) return <Link to={to} className={classes}>{inner}</Link>;
  if (href)
    return (
      <a href={href} className={classes} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {inner}
      </a>
    );
  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {inner}
    </button>
  );
};

/* ── Text link with an underline that draws in ── */

export const TextLink: React.FC<{ to: string; children: React.ReactNode; className?: string }> = ({ to, children, className }) => (
  <Link to={to} className={cn('group inline-flex items-center gap-2 text-[15px] font-medium text-fg', className)}>
    <span className="relative">
      {children}
      <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-100 bg-fg/30 transition-transform duration-500 ease-out group-hover:bg-accent" />
    </span>
    <Arrow className="transition-transform duration-500 ease-out group-hover:translate-x-1" />
  </Link>
);

/* ── Section label: "01  Hive" ── */

export const Label: React.FC<{ index?: string; children: React.ReactNode; className?: string }> = ({ index, children, className }) => (
  <p className={cn('t-label flex items-center gap-3 text-fg/55', className)}>
    {index && <span className="text-accent">{index}</span>}
    {index && <span aria-hidden="true" className="h-px w-6 bg-fg/25" />}
    <span>{children}</span>
  </p>
);

/* ── Section wrapper with theme ── */

export const Section: React.FC<{
  children: React.ReactNode;
  theme?: 'ink' | 'paper';
  className?: string;
  id?: string;
  labelledBy?: string;
  tight?: boolean;
}> = ({ children, theme = 'ink', className, id, labelledBy, tight }) => (
  <section
    id={id}
    data-theme={theme}
    aria-labelledby={labelledBy}
    className={cn('relative', tight ? 'py-[clamp(4.5rem,8vw,7rem)]' : 'py-[clamp(6rem,11vw,10.5rem)]', className)}
  >
    {children}
  </section>
);

/* ── Status dot for Human OS modules ── */

export const StatusDot: React.FC<{ status: 'live' | 'next' | 'vision'; className?: string }> = ({ status, className }) => (
  <span
    aria-hidden="true"
    className={cn(
      'relative inline-flex h-1.5 w-1.5 shrink-0 rounded-full',
      status === 'live' && 'bg-signal-live',
      status === 'next' && 'bg-fg/35',
      status === 'vision' && 'border border-fg/35',
      className,
    )}
  />
);
