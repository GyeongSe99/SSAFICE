import { ReactNode, createContext, useState } from 'react'

type SummaryContextProps = {
  reloadTrigger: boolean
  summaryRefresher: () => void
}

export const SummaryContext = createContext<SummaryContextProps | undefined>(undefined)

type SummaryProviderProps = {
  children: ReactNode
}

export const SummaryProvider = ({ children }: SummaryProviderProps) => {
  const [reloadTrigger, setReloadTrigger] = useState<boolean>(false)
  const summaryRefresher = () => {
    setReloadTrigger((value) => !value)
  }

  return (
    <SummaryContext.Provider value={{ reloadTrigger, summaryRefresher }}>
      {children}
    </SummaryContext.Provider>
  )
}
