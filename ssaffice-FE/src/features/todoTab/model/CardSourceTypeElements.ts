import { useMemo } from 'react'

type CardSourceTypeElementProps = {
  scheduleSourceTypeCd: string
}

export const CardSourceTypeElements = ({ scheduleSourceTypeCd }: CardSourceTypeElementProps) =>
  useMemo(() => {
    switch (scheduleSourceTypeCd) {
      case 'GLOBAL':
        return {
          description: '전체 공지에서 등록',
          classname:
            'bg-color-bg-info w-fit h-fit px-spacing-4 py-spacing-2 rounded-radius-4 text-color-text-interactive-inverse body-xs-semibold',
        }
      case 'TEAM':
        return {
          description: '공지에서 등록',
          classname:
            'bg-color-bg-warning w-fit h-fit px-spacing-4 py-spacing-2 rounded-radius-4 text-color-text-interactive-inverse body-xs-semibold',
        }
      case 'ASSIGNED':
        return {
          description: '공지에서 등록',
          classname:
            'bg-color-bg-warning w-fit h-fit px-spacing-4 py-spacing-2 rounded-radius-4 text-color-text-interactive-inverse body-xs-semibold',
        }
      case 'PERSONAL':
        return {
          description: '내가 등록',
          classname:
            'bg-color-bg-success w-fit h-fit px-spacing-4 py-spacing-2 rounded-radius-4 text-color-text-interactive-inverse body-xs-semibold',
        }
    }
  }, [scheduleSourceTypeCd])
