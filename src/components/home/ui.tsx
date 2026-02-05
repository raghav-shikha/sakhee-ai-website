'use client';

import { CSSProperties, ReactNode, forwardRef } from 'react';
import { motion } from 'framer-motion';

// Shikha brand colors from the logo
export const SHIKHA = {
  orange: '#F8A049',
  yellow: '#FFCA28',
  coral: '#E45B5B',
  teal: '#3BB77E',
  blue: '#29ABE2',
  purple: '#6B5CA5',
  charcoal: '#2E2E2E',
  // Warm neutrals
  cream: '#FFFDF8',
  ivory: '#F9F8F6',
  sand: '#F4F1EB',
} as const;

export const SHIKHA_TEXT = {
  body: '#5A564E',
  muted: '#8A857B',
  faint: '#C4BFB7',
} as const;

export const SHIKHA_THEME_VARS: CSSProperties = {
  '--color-base-0': '#FFFFFF',
  '--color-base-1': SHIKHA.ivory,
  '--color-base-2': SHIKHA.sand,
  '--color-base-3': '#EDE7DF',
  '--color-base-4': '#E3DED6',
  '--color-ink': SHIKHA.charcoal,
  '--color-ink-base': SHIKHA.charcoal,
  '--color-ink-muted': SHIKHA_TEXT.body,
  '--color-ink-faint': SHIKHA_TEXT.muted,
  '--color-border-subtle': SHIKHA.sand,
  '--color-border-strong': '#E0D9CF',
  '--color-accent-primary': SHIKHA.orange,
  '--color-accent-secondary': SHIKHA.coral,
  '--color-accent-bright': SHIKHA.yellow,
  '--color-accent-glow': 'rgba(248, 160, 73, 0.2)',
  // Learning goal category colors (CK / DP / CA)
  '--color-goal-ck': SHIKHA.blue,
  '--color-goal-dp': SHIKHA.teal,
  '--color-goal-ca': SHIKHA.purple,
  '--color-goal-ck-soft': '#E7F6FD',
  '--color-goal-dp-soft': '#E7F6EE',
  '--color-goal-ca-soft': '#F1EEF8',
  '--shadow-soft': '0 8px 24px -10px rgba(46, 46, 46, 0.18)',
  '--shadow-ring': 'inset 0 0 0 1px rgba(46, 46, 46, 0.04)',
} as CSSProperties;

// Unified border radius - ONE value for consistency
export const RADIUS = {
  sm: '8px',    // Small accents only
  md: '16px',   // UNIFIED: buttons, tabs, inputs, cards, containers
  lg: '16px',   // Same as md for consistency
  xl: '16px',   // Same as md for consistency
} as const;

// Single unified radius value
export const UNIFIED_RADIUS = '16px';

export function ShikhaThemeScope({
  children,
  className = '',
  style = {},
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`font-body ${className}`} style={{ ...SHIKHA_THEME_VARS, ...style }}>
      {children}
    </div>
  );
}

// Primary Button with Border Beam effect
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  showBeam?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, className = '', showBeam = false, onClick, disabled, type = 'button' }, ref) => {
    const baseStyles = `relative font-body font-medium transition-all duration-300 overflow-hidden`;
    
    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-10 py-4 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${sizeStyles[size]} ${className}`}
        style={{ 
          borderRadius: UNIFIED_RADIUS,
          backgroundColor: variant === 'primary' ? SHIKHA.orange : variant === 'secondary' ? 'white' : 'transparent',
          color: variant === 'primary' ? 'white' : SHIKHA.charcoal,
          border: variant === 'secondary' ? `1px solid ${SHIKHA.sand}` : 'none',
        }}
      >
        {children}
        {showBeam && (
          <span 
            className="absolute inset-0 pointer-events-none"
            style={{
              padding: '1px',
              borderRadius: 'inherit',
              background: `linear-gradient(90deg, ${SHIKHA.orange}, ${SHIKHA.purple}, ${SHIKHA.orange})`,
              backgroundSize: '200% 100%',
              animation: 'border-beam 3s linear infinite',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
        )}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';

// Pill Button (for CTAs)
export function PillButton({
  children,
  className = '',
  variant = 'primary',
  onClick,
  disabled,
  type = 'button',
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`font-body font-medium transition-all duration-300 ${className}`}
      style={{
        borderRadius: UNIFIED_RADIUS,
        backgroundColor: variant === 'primary' ? SHIKHA.charcoal : 'white',
        color: variant === 'primary' ? 'white' : SHIKHA.charcoal,
        border: variant === 'secondary' ? `1px solid ${SHIKHA.sand}` : 'none',
        padding: '14px 36px',
      }}
    >
      {children}
    </motion.button>
  );
}

// Card component with consistent styling
interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  spotlight?: boolean;
}

export function Card({ children, className = '', hover = true, spotlight = false }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 20px 40px -8px rgba(46, 46, 46, 0.1)' } : undefined}
      className={`bg-white border transition-all duration-300 ${className}`}
      style={{
        borderRadius: UNIFIED_RADIUS,
        borderColor: SHIKHA.sand,
      }}
    >
      {children}
    </motion.div>
  );
}

// Tab component
interface TabProps {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
  color?: string;
  className?: string;
}

export function Tab({ active, children, onClick, color = SHIKHA.orange, className = '' }: TabProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`px-4 py-2.5 text-sm font-body font-medium transition-all duration-200 whitespace-nowrap ${className}`}
      style={{
        borderRadius: RADIUS.md,
        backgroundColor: active ? color : 'white',
        color: active ? 'white' : SHIKHA.charcoal,
        border: `1px solid ${active ? color : SHIKHA.sand}`,
      }}
    >
      {children}
    </motion.button>
  );
}

// Section Header
export function SectionHeader({
  eyebrow,
  title,
  description,
  className = '',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`}>
      {eyebrow && (
        <p 
          className="mb-4 text-sm font-body font-medium tracking-wide uppercase"
          style={{ color: SHIKHA.orange }}
        >
          {eyebrow}
        </p>
      )}
      <h2 
        className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-6"
        style={{ color: SHIKHA.charcoal }}
      >
        {title}
      </h2>
      {description && (
        <p 
          className="text-lg font-body max-w-2xl mx-auto"
          style={{ color: '#5A564E' }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

// Feature Card
export function FeatureCard({
  icon,
  title,
  description,
  color = SHIKHA.orange,
  className = '',
}: {
  icon: ReactNode;
  title: string;
  description: string;
  color?: string;
  className?: string;
}) {
  return (
    <Card className={`p-8 ${className}`}>
      <div 
        className="w-14 h-14 flex items-center justify-center mb-6"
        style={{ 
          borderRadius: '12px', // Slightly smaller for icon accents
          backgroundColor: `${color}15`,
        }}
      >
        <span className="text-2xl" style={{ color }}>{icon}</span>
      </div>
      <h3 
        className="text-xl font-display font-semibold mb-3"
        style={{ color: SHIKHA.charcoal }}
      >
        {title}
      </h3>
      <p className="text-sm font-body leading-relaxed" style={{ color: '#5A564E' }}>
        {description}
      </p>
    </Card>
  );
}

// Stat Card
export function StatCard({
  value,
  label,
  sublabel,
  color = SHIKHA.orange,
  className = '',
}: {
  value: string;
  label: string;
  sublabel?: string;
  color?: string;
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`}>
      <div 
        className="text-5xl md:text-6xl font-display font-medium mb-2"
        style={{ color }}
      >
        {value}
      </div>
      <div className="text-lg font-body mb-1" style={{ color: SHIKHA.charcoal }}>
        {label}
      </div>
      {sublabel && (
        <div className="text-xs font-body" style={{ color: '#8A857B' }}>
          {sublabel}
        </div>
      )}
    </div>
  );
}

// Gradient Background
export function GradientBackground({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Main warm gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${SHIKHA.cream} 0%, ${SHIKHA.ivory} 50%, ${SHIKHA.cream} 100%)`,
        }}
      />
      
      {/* Colored orbs */}
      <div 
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl animate-pulse"
        style={{
          background: `radial-gradient(circle, ${SHIKHA.orange}20 0%, transparent 70%)`,
          animationDuration: '8s',
        }}
      />
      <div 
        className="absolute top-40 right-0 w-[500px] h-[500px] rounded-full blur-3xl animate-pulse"
        style={{
          background: `radial-gradient(circle, ${SHIKHA.purple}15 0%, transparent 70%)`,
          animationDuration: '10s',
          animationDelay: '2s',
        }}
      />
      <div 
        className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full blur-3xl animate-pulse"
        style={{
          background: `radial-gradient(circle, ${SHIKHA.blue}15 0%, transparent 70%)`,
          animationDuration: '12s',
          animationDelay: '4s',
        }}
      />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${SHIKHA.charcoal} 1px, transparent 1px),
            linear-gradient(to bottom, ${SHIKHA.charcoal} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

// Logo Cube Colors Display
export function CubeColors({ className = '' }: { className?: string }) {
  const colors = [
    { color: SHIKHA.orange, name: 'Orange' },
    { color: SHIKHA.yellow, name: 'Yellow' },
    { color: SHIKHA.coral, name: 'Coral' },
    { color: SHIKHA.teal, name: 'Teal' },
    { color: SHIKHA.blue, name: 'Blue' },
    { color: SHIKHA.purple, name: 'Purple' },
  ];

  return (
    <div className={`flex gap-2 ${className}`}>
      {colors.map(({ color, name }) => (
        <div
          key={name}
          className="w-4 h-4"
          style={{ backgroundColor: color, borderRadius: '4px' }}
          title={name}
        />
      ))}
    </div>
  );
}
