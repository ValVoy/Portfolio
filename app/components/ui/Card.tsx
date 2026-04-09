import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Active cards get the neon ambient shadow on hover */
  elevated?: boolean
}

export function Card({ elevated = false, className = '', style, children, ...props }: CardProps) {
  return (
    <div
      className={[
        'rounded-xl',
        'bg-surface-container-high',
        'transition-all duration-300',
        elevated
          ? 'hover:bg-surface-bright hover:shadow-[0_0_64px_rgba(148,170,255,0.08)] cursor-pointer'
          : '',
        className,
      ].join(' ')}
      style={{
        padding: '40px 32px 24px',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
