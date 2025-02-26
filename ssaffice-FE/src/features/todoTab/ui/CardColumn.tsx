import { useDroppable } from '@dnd-kit/core'

import type { CardColumnResponse } from '@/entities/todoTab'

export const CardColumn = ({ children, id, label, columnLength }: CardColumnResponse) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  })

  const style = {
    boxShadow: isOver ? 'inset 0px 1px 0px 0px rgba(29, 78, 216, 1)' : undefined,
    transition: isOver ? 'all 0.2s ease' : undefined,
    paddingTop: isOver ? '20px' : undefined,
  }

  return (
    <section className='flex flex-col w-full h-full'>
      <div className='sticky top-0 flex items-center gap-x-spacing-4 bg-color-bg-tertiary px-spacing-16 pt-spacing-12 pb-spacing-8 rounded-t-radius-6'>
        <h2 className='body-sm-semibold text-color-text-disabled'>{label}</h2>
        <p className='body-sm-regular text-color-text-disabled'>{columnLength}</p>
      </div>
      <div
        ref={setNodeRef}
        className='flex flex-col gap-y-spacing-8 grow px-spacing-8 pb-spacing-40 bg-color-bg-tertiary rounded-b-radius-6'
        style={style}
      >
        {children}
      </div>
    </section>
  )
}
