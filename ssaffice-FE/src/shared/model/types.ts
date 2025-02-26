export type Pagenation = {
  // 페이징 처리에 사용하는 간편한 page 객체(별도 매핑 필요)
  pageNumber: number
  pageSize: number
  offset?: number
  totalPages: number
  totalElements: number
}

export type Pageable = {
  // API 응답에서 오는 pageable 객체
  sort?: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  pageNumber: number
  pageSize: number
  offset?: number
  paged?: boolean
  unpaged?: boolean
}
