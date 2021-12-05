import { DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';
import { ColumnState, RowsState } from '../table.component';
import { map } from 'rxjs/operators';

export class TableDataSource<T> implements DataSource<T> {
  private dataSubject: BehaviorSubject<T[]>;
  private columnsSubject: BehaviorSubject<ColumnState<T>>;
  public rowsSubject: BehaviorSubject<RowsState<T>>;

  constructor(data?: T[]) {
    this.dataSubject = new BehaviorSubject<T[]>(data || []);
    this.columnsSubject = new BehaviorSubject<ColumnState<T>>(null);
    this.rowsSubject = new BehaviorSubject<RowsState<T>>({ mode: 'default' });
  }

  disconnect(): void {}

  public load(data: T[]): void {
    this.dataSubject.next([...data]);
  }

  public connect(): Observable<T[]> {
    return this.dataSubject.asObservable();
  }

  public getColumnsState(): Observable<ColumnState<T>> {
    return this.columnsSubject.asObservable();
  }

  public getRowsState(): Observable<RowsState<T>> {
    return this.rowsSubject.asObservable();
  }

  public getRowMode(): Observable<string> {
    return this.getRowsState().pipe(map((state: RowsState<T>) => state.mode));
  }

  // method to change row state to add - add form row in start of table
  public add(data?: RowsState<T>) {
    this.rowsSubject.next({ mode: 'add', ...data });
  }
  // method to change row state to save - update new item from database
  public save(data?: RowsState<T>) {
    this.rowsSubject.next({ mode: 'save', ...data });
  }
  // method to change row state to form - change all selected rows to form state
  public form(data?: RowsState<T>) {
    this.rowsSubject.next({ mode: 'form', ...data });
  }
  // method to change row state to edit - change all selected rows to edit state
  public edit(data: RowsState<T>) {
    this.rowsSubject.next({ mode: 'edit', ...data });
  }
  // method to change row state to cancel - remove first row (use with add state)
  public cancel(data?: RowsState<T>) {
    this.rowsSubject.next({ mode: 'cancel', ...data });
  }
  // method to change row state to expand - expand row
  public expand(data?: RowsState<T>) {
    this.rowsSubject.next({ mode: 'expand', ...data });
  }
  // method to change row state to delete - load new content from server
  public delete(data?: RowsState<T>) {
    this.rowsSubject.next({ mode: 'delete', ...data });
  }

  // method to update columns options = selectOptions or filterOptions
  public updateOptions(options: ColumnState<T>) {
    this.columnsSubject.next({ ...options });
  }
}
