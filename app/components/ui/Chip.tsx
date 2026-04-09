interface ChipProps {
  label: string
  className?: string
}

export function Chip({ label, className = '' }: ChipProps) {
  return (
    <span
      className={[
        'inline-flex items-center',
        'rounded-full px-3 py-1',
        'bg-surface-container-highest',
        'text-secondary font-body text-xs font-medium uppercase tracking-[0.1em]',
        className,
      ].join(' ')}
    >
      {label}
    </span>
  )
}
