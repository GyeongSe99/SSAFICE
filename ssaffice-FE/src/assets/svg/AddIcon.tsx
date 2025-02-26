import type { SVGProps } from 'react'

interface SvgAddIconProps extends SVGProps<SVGSVGElement> {
  color?: string
}

const SvgAddIcon = ({ color = '#1E1E1E', ...props }: SvgAddIconProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14' {...props}>
    <path fill={color} d='M14 7.998H8v6H6v-6H0v-2h6v-6h2v6h6z' />
  </svg>
)

export default SvgAddIcon
