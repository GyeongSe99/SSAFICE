import type { SVGProps } from 'react'

interface SvgTodoFlagProps extends SVGProps<SVGSVGElement> {
  type: string
}

const SvgTodoFlag = ({ type, ...props }: SvgTodoFlagProps) => {
  const colorCode = type === 'DONE' ? '#16A34A' : type === 'IN_PROGRESS' ? '#2563EB' : '#6B7280' // 순서대로 color-icon-success, color-icon-info, color-icon-disabled

  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 18' {...props}>
      <path
        fill={colorCode}
        d='M0 18V2Q0 1.176.588.588A1.93 1.93 0 0 1 2 0h10q.825 0 1.413.588T14 2v16l-7-3z'
      />
    </svg>
  )
}

export default SvgTodoFlag
