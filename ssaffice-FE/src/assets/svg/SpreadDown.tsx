import type { SVGProps } from 'react'
const SvgSpreadDown = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6' {...props}>
    <path
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M1.667 1.667 5 5l3.333-3.333'
    />
  </svg>
)
export default SvgSpreadDown
