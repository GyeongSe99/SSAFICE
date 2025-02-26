// select dropdown 컴포넌트에서 리턴된 값을 API 요청 형태로 바꾸어 줍니다.
// ~Todo 형태 API 요청해야 하는 파트의 '정렬' 필터에서 사용합니다.
export const useApiParamFormatter = (
  componentName: 'SelectTodoSortCondition',
  value: string,
): 'endDateTime' | 'createdAt' => {
  // 다른 api에서도 사용할 경우 리턴 형태 바꾸어야 함
  switch (componentName) {
    case 'SelectTodoSortCondition': {
      switch (value) {
        case 'by deadline':
          return 'endDateTime'
        case 'by registration':
          return 'createdAt'
        default:
          return 'endDateTime' // '미완료 일정 순'
      }
    }
  }
}
