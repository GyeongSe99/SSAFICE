import { ReactNode } from 'react'

type TabLayoutProps = {
  children: ReactNode
  animation?: string
}

function TabLayoutHeader({ children, animation }: TabLayoutProps) {
  return (
    <header
      className={`flex items-center justify-between w-full heading-desktop-xl text-color-text-primary ${animation}`}
    >
      {children}
    </header>
  )
}

function TabLayoutAdditional({ children, animation }: TabLayoutProps) {
  return (
    <div
      className={`flex flex-col w-full pt-spacing-24 pb-spacing-16 gap-y-spacing-16 ${animation}`}
    >
      {children}
    </div>
  )
}

function TabLayoutContent({ children, animation }: TabLayoutProps) {
  return <div className={`w-full h-full flex flex-col ${animation}`}>{children}</div>
}

function TabLayoutMain({ children, animation }: TabLayoutProps) {
  return (
    <section
      className={`w-full min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] p-spacing-32 flex flex-col items-center bg-color-bg-secondary rounded-radius-8 ${animation}`}
    >
      {children}
    </section>
  )
}

export const TabLayout = Object.assign(TabLayoutMain, {
  Header: TabLayoutHeader,
  Add: TabLayoutAdditional,
  Content: TabLayoutContent,
})
