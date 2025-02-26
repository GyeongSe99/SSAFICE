import type { SVGProps } from 'react'
const SvgFoldUp = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6' {...props}>
    <path
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M1.667 4.333 5 1l3.333 3.333'
    />
  </svg>
)
export default SvgFoldUp
