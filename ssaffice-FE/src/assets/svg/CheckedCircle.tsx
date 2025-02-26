import type { SVGProps } from 'react'
const SvgCheckedCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' {...props}>
    <g clipPath='url(#CheckedCircle_svg__a)'>
      <path
        fill='#2563EB'
        d='M0 10C0 4.477 4.477 0 10 0s10 4.477 10 10-4.477 10-10 10S0 15.523 0 10'
      />
      <path fill='#fff' d='m7.958 15-4.75-4.75 1.188-1.187 3.562 3.562 7.646-7.646 1.187 1.188z' />
    </g>
    <path stroke='#2563EB' d='M.5 10a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z' />
    <defs>
      <clipPath id='CheckedCircle_svg__a'>
        <path
          fill='#fff'
          d='M0 10C0 4.477 4.477 0 10 0s10 4.477 10 10-4.477 10-10 10S0 15.523 0 10'
        />
      </clipPath>
    </defs>
  </svg>
)
export default SvgCheckedCircle
