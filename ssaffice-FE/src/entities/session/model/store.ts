import { create } from 'zustand'

type SessionStoreProps = {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  userId: number | null
  setUserId: (value: number) => void
  protectRole: string | null
  setProtectRole: (value: string | null) => void
  mattermostSync: string | null
  setMattermostSync: (value: string | null) => void
}

const useSessionStore = create<SessionStoreProps>((set) => ({
  isAuthenticated: !!localStorage.getItem('access_token'),
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),

  userId: null,
  setUserId: (value: number) => set({ userId: value }),

  protectRole: null,
  setProtectRole: (value: string | null) => set({ protectRole: value }),

  mattermostSync: null,
  setMattermostSync: (value: string | null) => set({ mattermostSync: value }),
}))

export const useLoginStateStore = () => useSessionStore((state) => state.isAuthenticated)
export const useSetLoginStateStore = () => useSessionStore((state) => state.setIsAuthenticated)

export const useUserIdStore = () => useSessionStore((state) => state.userId)
export const useSetUserIdStore = () => useSessionStore((state) => state.setUserId)

export const useProtectRoleStore = () => useSessionStore((state) => state.protectRole)
export const useSetProtectRoleStore = () => useSessionStore((state) => state.setProtectRole)

export const useMattermostSyncStore = () => useSessionStore((state) => state.mattermostSync)
export const useSetMattermostSyncStore = () => useSessionStore((state) => state.setMattermostSync)
