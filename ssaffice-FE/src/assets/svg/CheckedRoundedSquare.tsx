import type { SVGProps } from 'react'
const SvgCheckedRoundedSquare = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20' {...props}>
    <g clipPath='url(#CheckedRoundedSquare_svg__a)'>
      <path
        fill='#2563EB'
        d='M0 6a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6z'
      />
      <path fill='#fff' d='m7.958 15-4.75-4.75 1.188-1.188 3.562 3.563 7.646-7.646 1.187 1.188z' />
    </g>
    <path
      stroke='#1D4ED8'
      d='M.5 6A5.5 5.5 0 0 1 6 .5h8A5.5 5.5 0 0 1 19.5 6v8a5.5 5.5 0 0 1-5.5 5.5H6A5.5 5.5 0 0 1 .5 14z'
    />
    <defs>
      <clipPath id='CheckedRoundedSquare_svg__a'>
        <path fill='#fff' d='M0 6a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6z' />
      </clipPath>
    </defs>
  </svg>
)
export default SvgCheckedRoundedSquare
