import { PageChangeDirection, PageMeta } from '../models/pagination.model';

export const paginateResults = (arr: any[], size: number): any[][] => {
  if (arr.length === 0) {
    return [[]];
  }
  return arr.reduce((acc, val, i) => {
    let idx = Math.floor(i / size);
    let page = acc[idx] || (acc[idx] = []);
    page.push(val);

    return acc;
  }, []);
};

export const getNewPageMetaAfterPagination = (
  direction: PageChangeDirection,
  pageMeta: PageMeta,
): PageMeta => {
  switch (direction) {
    case PageChangeDirection.NEXT:
      if (pageMeta.currentPage < pageMeta.totalPages) {
        const prevPage = pageMeta.currentPage;
        const currentPage = pageMeta.currentPage + 1;
        const nextPage = currentPage < pageMeta.totalPages ? <number>pageMeta.nextPage + 1 : null;
        return {
          ...pageMeta,
          currentPage,
          nextPage,
          prevPage,
        };
      }
      return pageMeta;
    case PageChangeDirection.PREVIOUS:
      if (pageMeta.currentPage > 1) {
        const nextPage = pageMeta.currentPage;
        const currentPage = pageMeta.currentPage - 1;
        const prevPage = <number>pageMeta.prevPage - 1 > 0 ? <number>pageMeta.prevPage - 1 : null;
        return {
          ...pageMeta,
          currentPage,
          nextPage,
          prevPage,
        };
      }
      return pageMeta;
  }
};
