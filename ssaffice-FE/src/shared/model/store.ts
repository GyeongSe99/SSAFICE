import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 탭 상태 관리 스토어 (로컬 저장 X)
type TabStateStoreProps = {
  isFirstRender: boolean
  setIsFirstRender: (value: boolean) => void
}

const useTabStateStore = create<TabStateStoreProps>((set) => ({
  isFirstRender: true,

  setIsFirstRender: (value) => set({ isFirstRender: value }),
}))

export const useIsFirstRenderStore = () => useTabStateStore((state) => state.isFirstRender)
export const useSetIsFirstRenderStore = () => useTabStateStore((state) => state.setIsFirstRender)

// 탭 상태 관리 스토어 (로컬 저장 O)
type PersistedTabStateStoreProps = {
  isTabOpen: boolean
  isAnimation: boolean
  setIsTabOpen: (value: boolean) => void
  setIsAnimation: (value: boolean) => void
}

const usePersistedTabStateStore = create(
  persist<PersistedTabStateStoreProps>(
    (set) => ({
      isTabOpen: true,
      isAnimation: false,

      setIsTabOpen: () => set((state) => ({ isTabOpen: !state.isTabOpen })),
      setIsAnimation: (value) => set({ isAnimation: value }),
    }),
    {
      name: 'tab-state',
    },
  ),
)

export const useIsTabOpenStore = () => usePersistedTabStateStore((state) => state.isTabOpen)
export const useSetIsTabOpenStore = () => usePersistedTabStateStore((state) => state.setIsTabOpen)

export const useIsAnimationStore = () => usePersistedTabStateStore((state) => state.isAnimation)
export const useSetIsAnimationStore = () =>
  usePersistedTabStateStore((state) => state.setIsAnimation)
