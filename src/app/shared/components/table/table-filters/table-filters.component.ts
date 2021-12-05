import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ListItem } from '../../list-item/list-item.model';
import { TableFilterService } from './table-filter.service';

@Component({
  selector: 'kkl-table-filters',
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.scss'],
})
export class TableFiltersComponent<T> implements OnInit {
  @Input() public dates: any;
  @Output() public emitDeleteFilter: EventEmitter<any> = new EventEmitter();
  @Output() public emitRemoveAllFilters: EventEmitter<any> = new EventEmitter();

  public filters$: Observable<ListItem[]>;

  constructor(private filterService: TableFilterService<T>) {}

  ngOnInit(): void {
    this.filters$ = this.filterService.getFilters$();
  }

  public onFilterRemove(value: string): void {
    this.filterService.remove(value);
  }
  public onClearFilters(): void {
    this.filterService.clear();
  }
}
