type LoginButtonProps = {
  className?: string
  label: string
  icon?: string
  onClick: () => void
}

export const LoginButton = ({
  className = 'bg-color-bg-interactive-primary text-color-text-interactive-inverse',
  label,
  icon,
  onClick,
}: LoginButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-full py-spacing-16 body-lg-medium rounded-radius-8 ${className}`}
    >
      {icon && <img src={icon} alt='icon' className='absolute top-[10px] left-[20px]' />}
      {label}
    </button>
  )
}
