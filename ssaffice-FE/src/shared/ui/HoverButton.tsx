import { ReactNode } from 'react'
import { useHover } from '@/shared/model'

type HoverButtonProps = {
  icon: ReactNode
  tooltip: string
  onClickEvent: () => void
}

export const HoverButton = ({ icon, tooltip, onClickEvent }: HoverButtonProps) => {
  const [buttonHoverRef, isButtonHover] = useHover<HTMLDivElement>()

  return (
    <div ref={buttonHoverRef} className='relative flex flex-col items-center'>
      <button
        onClick={onClickEvent}
        className={`rounded-radius-circle p-spacing-4 transition-opacity duration-200 ${isButtonHover ? 'bg-color-bg-tertiary' : ''}`}
      >
        {icon}
      </button>
      {isButtonHover && (
        <p className='absolute left-0 z-10 top-9 text-color-text-tertiary min-w-max body-md-medium bg-color-bg-tertiary rounded-radius-8 px-spacing-8 py-spacing-4 animate-taDa'>
          {tooltip}
        </p>
      )}
    </div>
  )
}
