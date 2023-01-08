import { PageChangeDirection, PageMeta } from '../models/pagination.model';
import { getNewPageMetaAfterPagination, paginateResults } from './pagination.helper';

describe('paginationHelper', () => {
  describe('paginateResults method', () => {
    it('should return empty array for empty input array', () => {
      expect(paginateResults([], 2)).toEqual([[]]);
    });

    it('should return correct pages for input array of length less than size', () => {
      expect(paginateResults([1, 2], 2)).toEqual([[1, 2]]);
      expect(paginateResults([1, 2], 3)).toEqual([[1, 2]]);
      expect(paginateResults([1], 1)).toEqual([[1]]);
    });

    it('should return correct pages for input array of length greater than size', () => {
      expect(paginateResults([1, 2, 3, 4], 2)).toEqual([
        [1, 2],
        [3, 4],
      ]);
      expect(paginateResults([1, 2, 3, 4, 5, 6], 3)).toEqual([
        [1, 2, 3],
        [4, 5, 6],
      ]);
      expect(paginateResults([1, 2, 3, 4, 5], 3)).toEqual([
        [1, 2, 3],
        [4, 5],
      ]);
    });
  });

  describe('getNewPageMetaAfterPagination method', () => {
    it('should return the same page meta for direction NEXT if currentPage is equal to totalPages', () => {
      const pageMeta: PageMeta = <PageMeta>{
        currentPage: 2,
        prevPage: 1,
        nextPage: null,
        totalPages: 2,
      };
      const updatedPageMeta = getNewPageMetaAfterPagination(PageChangeDirection.NEXT, pageMeta);
      expect(updatedPageMeta).toEqual(pageMeta);
    });

    it('should return the same page meta for direction PREVIOUS if currentPage is equal to 1', () => {
      const pageMeta: PageMeta = <PageMeta>{
        currentPage: 1,
        prevPage: null,
        nextPage: 2,
        totalPages: 2,
      };
      const updatedPageMeta = getNewPageMetaAfterPagination(PageChangeDirection.PREVIOUS, pageMeta);
      expect(updatedPageMeta).toEqual(pageMeta);
    });

    it('should return correct page meta for direction NEXT', () => {
      // GIVEN
      const pageMeta: PageMeta = <PageMeta>{
        currentPage: 1,
        prevPage: null,
        nextPage: 2,
        totalPages: 2,
      };

      // WHEN
      const updatedPageMeta = getNewPageMetaAfterPagination(PageChangeDirection.NEXT, pageMeta);

      // THEN
      expect(updatedPageMeta).toEqual({
        currentPage: 2,
        prevPage: 1,
        nextPage: null,
        totalPages: 2,
      });
    });

    it('should return correct page meta for direction PREVIOUS', () => {
      // GIVEN
      const pageMeta: PageMeta = <PageMeta>{
        currentPage: 2,
        prevPage: 1,
        nextPage: null,
        totalPages: 2,
      };

      // WHEN
      const updatedPageMeta = getNewPageMetaAfterPagination(PageChangeDirection.PREVIOUS, pageMeta);

      // THEN
      expect(updatedPageMeta).toEqual({
        currentPage: 1,
        prevPage: null,
        nextPage: 2,
        totalPages: 2,
      });
    });
  });
});
