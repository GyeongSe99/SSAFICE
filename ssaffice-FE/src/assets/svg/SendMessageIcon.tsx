import type { SVGProps } from 'react'

interface SvgSendMessageIconProps extends SVGProps<SVGSVGElement> {
  color?: string
}

const SvgSendMessageIcon = ({ color = '#fff', ...props }: SvgSendMessageIconProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' {...props}>
    <path
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M9.095 10.904a1.7 1.7 0 0 0-.558-.367l-6.609-2.65a.417.417 0 0 1 .02-.781l15.834-5.417a.413.413 0 0 1 .529.53l-5.417 15.833a.416.416 0 0 1-.78.02l-2.65-6.61a1.7 1.7 0 0 0-.37-.558m0 0 9.117-9.115'
    />
  </svg>
)
export default SvgSendMessageIcon
