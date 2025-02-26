import { useState } from 'react'

export const useSearchInput = () => {
  const [value, setValue] = useState('')
  const [searchResult, setSearchResult] = useState('')

  const searchApi = (keyword: string) => {
    setSearchResult(keyword)
  }

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (value) {
  //       searchApi(value)
  //     }
  //   }, 500)

  //   return () => clearTimeout(timer)
  // }, [value]) // 디바운싱 로직

  const keyPressHandler = (keyName: string) => {
    if (keyName === 'Enter') {
      searchApi(value)
      setValue('')
    }
  }

  const handleValue = (keyword: string) => {
    setValue(keyword)
  }

  return { value, handleValue, keyPressHandler, searchResult }
}
