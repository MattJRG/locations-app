export interface PageMeta {
  currentPage: number;
  nextPage: number | null;
  pageSize: number;
  prevPage: number | null;
  totalCount: number;
  totalPages: number;
}

export enum PageChangeDirection {
  PREVIOUS = 'prev',
  NEXT = 'next',
}
