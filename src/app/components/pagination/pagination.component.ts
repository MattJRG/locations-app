import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PageChangeDirection, PageMeta } from '../../models/pagination.model';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  pageMeta = input.required<PageMeta>();

  pageChange = output<PageChangeDirection>();

  pageChangeDirection = PageChangeDirection;

  get viewingFrom(): number {
    let from: number;
    if (this.pageMeta().totalCount > 0) {
      from = this.pageMeta().currentPage * this.pageMeta().pageSize - this.pageMeta().pageSize + 1;
    } else {
      from = 0;
    }
    return isNaN(from) ? 0 : from;
  }

  get viewingTo(): number {
    const maxViewingTo: number = this.pageMeta().currentPage * this.pageMeta().pageSize;
    const to = Math.min(maxViewingTo, this.pageMeta().totalCount);
    return isNaN(to) ? 0 : to;
  }

  onPageChange(changeDirection: PageChangeDirection): void {
    this.pageChange.emit(changeDirection);
  }
}
