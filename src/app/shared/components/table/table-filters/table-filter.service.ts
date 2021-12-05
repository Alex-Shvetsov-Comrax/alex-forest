import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, Observable } from 'rxjs';
import {
  FilterOption,
  Range,
} from '../../columns/column-filter/column-filter.component';
import { ColumnDef } from '../../columns/column.model';
import { ListItem } from '../../list-item/list-item.model';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { RangePipe } from 'src/app/shared/pipes/range.pipe';

type action = 'push' | 'range' | 'clear' | 'remove' | '';

export interface FilterStore<T> {
  action?: action;
  filters?: ListItem[];
  filterColumn?: ColumnDef<T> | string;
  filter?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TableFilterService<T> {
  private filterSubject: BehaviorSubject<FilterStore<T>>;
  private filtersSubject: BehaviorSubject<ListItem[]>;
  private filters$: Observable<ListItem[]>;

  constructor(private range: RangePipe) {
    this.filterSubject = new BehaviorSubject<FilterStore<T>>({
      action: '',
      filters: [],
    });

    this.filtersSubject = new BehaviorSubject<ListItem[]>([]);
    this.setFilters$();
  }
  public getFilters$(): Observable<ListItem[]> {
    return this.filters$;
  }

  public setFilters$(): void {
    this.filters$ = merge(this.getFiltersObs(), this.combineFilterWithState());
  }

  private getFilterStateObs(): Observable<FilterStore<T>> {
    return this.filterSubject.asObservable().pipe(distinctUntilChanged());
  }

  private getFiltersObs(): Observable<ListItem[]> {
    return this.filtersSubject.asObservable();
  }

  private setFiltersWithState(
    state: FilterStore<T>,
    filters: ListItem[]
  ) {
    const { action, filter, filterColumn } = state;

    switch (action) {

      case 'push':
        this.isFilter(filters, filter)
          ? filters
          : this.setFilters(filters, filter, filterColumn);
        break;
      case 'remove':
        console.log(filter);
        this.removeFilter(filters, filter);
        break;
      case 'clear':
        filters = filters;
    }

    return filters;
  }

  private combineFilterWithState(): Observable<ListItem[]> {
    return combineLatest([this.getFiltersObs(), this.getFilterStateObs()]).pipe(
      map(([filters, state]) => {
        return this.setFiltersWithState(state, filters);
      })
    );
  }

  public clear() {
    this.filterSubject.next({ action: 'clear' });
    this.filtersSubject.next([]);
  }

  public remove(filter: string) {
    this.filterSubject.next({ action: 'remove', filter });
  }

  public isColumnActive$(value: any): Observable<boolean> {
    return this.getFilters$().pipe(
      map(
        (filters: ListItem[]) =>
          !!filters.find((item: ListItem) => {
            return item.key === value;
          })
      )
    );
  }

  public push(filterOption: FilterOption<T>) {
    const {
      column: { columnDef },
      filter,
    } = filterOption;

    this.filterSubject.next({
      action: 'push',
      filterColumn: columnDef,
      filter,
    });
  }

  // method to find filter in filters array : return item
  private findFilter(
    filters: ListItem[],
    value: string,
    key: keyof ListItem
  ): ListItem {
    return filters.find((item: ListItem) => item[key] === value);
  }

  // method to find filter index in filters array : return number
  private findItemIndex(
    filters: ListItem[],
    value: string,
    key?: keyof ListItem
  ): number {
    return filters.findIndex(
      (item: ListItem) => item[key || 'value'] === value
    );
  }

  // method to find filter in filters array : return boolean
  private isFilter(
    filters: ListItem[],
    value: string,
    key?: keyof ListItem
  ): boolean {
    return !!this.findFilter(filters, value, key || 'label');
  }

  // method which update filter item
  private updateFilters(filters: ListItem[], value: string, key: string) {
    const index: number = this.findItemIndex(filters, key, 'key');
    const item = this.findFilter(filters, key, 'key');
    item.value = value;
    filters[index] = item;
    return filters;
  }

  // method which add filter item
  private addFilter(filters: ListItem[], value: string, key: string) {
    filters.push(this.setListItem(value, key));
    return filters;
  }

  private setFilters(filters: ListItem[], value: any, key: any): ListItem[] {
    return this.isFilter(filters, key, 'key')
      ? this.updateFilters(filters, value, key)
      : this.addFilter(filters, value, key);
  }

  private removeFilter(filters: ListItem[], value: any): ListItem[] {
    const index: number = this.findItemIndex(filters, value);
    return index >= 0 ? filters.splice(index, 1) : filters;
  }

  private setListItem(value: string, key: string) {
    const item: ListItem = {
      key,
      value,
      type: typeof value,
    };

    return item;
  }
}
