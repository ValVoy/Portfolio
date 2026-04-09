'use client'

import type { ButtonHTMLAttributes, AnchorHTMLAttributes, CSSProperties } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonBaseProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  style?: CSSProperties
  children: React.ReactNode
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> & { href?: undefined }

type ButtonAsAnchor = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'style'> & { href: string }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

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

const sharedClasses = (
  variant: ButtonVariant,
  size: ButtonSize,
  className: string,
) =>
  [
    'inline-flex items-center justify-center rounded-xl',
    'font-body transition-all duration-200',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
    'disabled:pointer-events-none disabled:opacity-50',
    'hover:opacity-90 active:scale-[0.98]',
    sizeClasses[size],
    variantStyles[variant].className,
    className,
  ].join(' ')

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    className = '',
    style,
    children,
    href,
    ...rest
  } = props

  const { style: variantStyle } = variantStyles[variant]
  const mergedStyle = { ...variantStyle, ...style }
  const mergedClassName = sharedClasses(variant, size, className)

  if (href !== undefined) {
    return (
      <a
        href={href}
        className={mergedClassName}
        style={mergedStyle}
        {...(rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'style'>)}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      className={mergedClassName}
      style={mergedStyle}
      {...(rest as Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'>)}
    >
      {children}
    </button>
  )
}
