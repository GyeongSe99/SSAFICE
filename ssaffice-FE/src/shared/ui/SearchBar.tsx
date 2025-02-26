import { SearchIcon } from '@/assets/svg'
import { useSearchInput } from '../model'
import { useEffect } from 'react'

type Props = {
  setSearchValue: (searchValue: string) => void
}

export const SearchBar = ({ setSearchValue }: Props) => {
  const { value, handleValue, keyPressHandler, searchResult } = useSearchInput()

  useEffect(() => {
    setSearchValue(searchResult)
  }, [searchResult])

  return (
    <div
      className='
        flex justify-start gap-spacing-16
        w-full h-[56px] px-spacing-16 py-spacing-8
        bg-color-bg-primary
        border border-color-border-disabled border-spacing-1
        rounded-radius-16
        '
    >
      <div
        className='
        flex justify-center items-center
        w-[18px]
        '
      >
        <SearchIcon />
      </div>
      <input
        id='searchInput'
        type='text'
        placeholder='검색'
        className='flex-1 placeholder:text-color-text-disabled placeholder:body-md-medium focus:outline-none'
        value={value}
        onChange={(e) => handleValue(e.target.value)}
        onKeyDown={(e) => keyPressHandler(e.key)}
      />
    </div>
  )
}
