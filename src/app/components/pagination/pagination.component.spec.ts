import { PageChangeDirection } from '../../models/pagination.model';
import { PaginationComponent } from './pagination.component';

const mockPageMeta = {
  currentPage: 3,
  nextPage: null,
  pageSize: 20,
  prevPage: 2,
  totalCount: 60,
  totalPages: 3,
};

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let mockPageChange: jest.Mock;

  beforeEach(() => {
    component = new PaginationComponent();
    mockPageChange = jest.fn();
    component.pageChange.subscribe(mockPageChange);
  });

  it('viewingFrom getter should return the correct value for the given pageMeta', () => {
    // GIVEN
    component.pageMeta = mockPageMeta;

    // THEN
    expect(component.viewingFrom).toBe(41);
  });

  it('viewingTo getter should return the correct value for the given pageMeta', () => {
    // GIVEN
    component.pageMeta = mockPageMeta;

    // THEN
    expect(component.viewingTo).toBe(60);
  });

  it('onPageChange calls the pageChange event emitter with the correct argument', () => {
    // WHEN
    component.onPageChange(PageChangeDirection.NEXT);

    // THEN
    expect(mockPageChange).toHaveBeenCalledWith(PageChangeDirection.NEXT);
  });
});
