import { ChangeEvent, ReactNode } from 'react'

type RadioProps = {
  children: ReactNode
  value: string
  name: string
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  className?: string
  hiddenPeer?: boolean
}

export const Radio = ({
  children,
  value,
  name,
  onChange,
  defaultChecked,
  disabled,
  className,
  hiddenPeer = true,
}: RadioProps) => {
  return (
    <label className={`cursor-pointer ${className}`}>
      <input
        type='radio'
        value={value}
        name={name}
        disabled={disabled}
        defaultChecked={defaultChecked}
        className={`${hiddenPeer ? 'hidden peer' : ''}`}
        onChange={onChange}
      />
      {children}
    </label>
  )
}
