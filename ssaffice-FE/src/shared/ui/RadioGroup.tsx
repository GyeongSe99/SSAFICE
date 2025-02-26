import { Attributes, ChangeEvent, Children, cloneElement, isValidElement, ReactNode } from 'react'

type RadioGroupProps = {
  label?: string
  children: ReactNode
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export const RadioGroup = ({ label, children, onChange, className }: RadioGroupProps) => {
  return (
    <fieldset>
      <div className={className}>
        <legend className='min-w-[57px]'>{label}</legend>
        <div className='flex w-full'>
          {Children.map(children, (child) => {
            if (isValidElement(child)) {
              return cloneElement(child, { onChange } as Attributes)
            }
            return child
          })}
        </div>
      </div>
    </fieldset>
  )
}
