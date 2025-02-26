import { useState } from 'react'

export const useProSelectTabMenu = () => {
  const [selected, setSelected] = useState<'manageMembers' | 'manageEachTodos' | 'manageTeamTodos'>(
    'manageTeamTodos',
  )

  const handleSelect = (label: 'manageMembers' | 'manageEachTodos' | 'manageTeamTodos') => {
    setSelected(label)
  }

  return { selected, handleSelect }
}
