import type { SVGProps } from 'react'

interface SvgRemoveBinIconProps extends SVGProps<SVGSVGElement> {
  color?: string
}

const SvgRemoveBinIcon = ({ color = '#fff', ...props }: SvgRemoveBinIconProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 20' {...props}>
    <path
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.667}
      d='M1.5 5h1.667m0 0H16.5M3.167 5v11.667a1.667 1.667 0 0 0 1.666 1.666h8.334a1.667 1.667 0 0 0 1.666-1.666V5zm2.5 0V3.333a1.667 1.667 0 0 1 1.666-1.666h3.334a1.667 1.667 0 0 1 1.666 1.666V5m-5 4.166v5m3.334-5v5'
    />
  </svg>
)
export default SvgRemoveBinIcon
