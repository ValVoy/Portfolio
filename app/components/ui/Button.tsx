'use client'

import type { ButtonHTMLAttributes, CSSProperties } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

const variantStyles: Record<ButtonVariant, { className: string; style?: CSSProperties }> = {
  primary: {
    className: 'text-on-primary font-semibold',
    style: {
      background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dim))',
    },
  },
  secondary: {
    className: 'text-primary font-medium backdrop-blur-sm',
    style: {
      background: 'color-mix(in srgb, var(--color-surface-variant) 20%, transparent)',
      border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
    },
  },
  tertiary: {
    className: 'text-primary-fixed-dim font-medium uppercase tracking-[0.1em]',
  },
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  style,
  children,
  ...props
}: ButtonProps) {
  const { className: variantClassName, style: variantStyle } = variantStyles[variant]

  return (
    <button
      className={[
        'inline-flex items-center justify-center rounded-xl',
        'font-body transition-all duration-200',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        'disabled:pointer-events-none disabled:opacity-50',
        'hover:opacity-90 active:scale-[0.98]',
        sizeClasses[size],
        variantClassName,
        className,
      ].join(' ')}
      style={{ ...variantStyle, ...style }}
      {...props}
    >
      {children}
    </button>
  )
}
