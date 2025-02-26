import type { SVGProps } from 'react'
const SvgPageMoveArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 8 14' {...props}>
    <path
      fill='#6B7280'
      fillRule='evenodd'
      d='M.843 7.711 6.5 13.368l1.414-1.414-4.95-4.95 4.95-4.95L6.5.64.843 6.297a1 1 0 0 0 0 1.414'
      clipRule='evenodd'
    />
  </svg>
)
export default SvgPageMoveArrow
