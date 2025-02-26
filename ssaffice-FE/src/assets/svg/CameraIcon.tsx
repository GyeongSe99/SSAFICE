import type { SVGProps } from 'react'
const SvgCameraIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 15' {...props}>
    <path fill='#fff' d='M0 7.5a7 7 0 1 1 14 0 7 7 0 0 1-14 0' />
    <path
      fill='#374151'
      d='M3 4h1.5l1-1h3l1 1H11a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1m4 1.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m0 1a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3'
    />
  </svg>
)
export default SvgCameraIcon
