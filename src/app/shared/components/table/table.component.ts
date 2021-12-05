import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ThemePalette } from '@angular/material/core';
import { PaginationInstance } from 'ngx-pagination';

import { RowModel } from './models/row.model';

import { combineLatest, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { Sort } from '@angular/material/sort';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { ColumnDef, ColumnModel } from '../columns/column.model';

import { SelectionChange, SelectionModel } from '@angular/cdk/collections';
import { FilterOption } from '../columns/column-filter/column-filter.component';
import { SelectOption } from '../form/models/question-select.model';
import { TableFilterService } from './table-filters/table-filter.service';
import { v4 as uuid4 } from 'uuid';
import { TableService } from './services/table.service';

declare type id = string | number;

// interface for table options : {
// filters - keys to remove unwanted fields form object (ex - id)
// pagination - a PaginationInstance
// editable - tag rows to start in edit mode
// pending - tag rows for specific start style
// }
export interface TableOptions<T> {
  filters?: ColumnDef<T>[];
  pagination?: PaginationInstance;
  editable?: id[];
  pending?: id[];
}

// interface for every comp which handle kkl-table states :
// mode : edit/add/form/expand/close/remove/delete
// options : additional data

type state =
  | 'edit'
  | 'add'
  | 'expand'
  | 'close'
  | 'cancel'
  | 'remove'
  | 'delete'
  | 'save'
  | 'form'
  | 'update'
  | 'default';

export interface RowsState<T> {
  mode?: state;
  row?: RowModel<T>;
  column?: ColumnModel<T>;
  options?: any;
}

// interface for update select and filter options

export type ColumnState<T> = {
  key: ColumnDef<T>;
  selectOptions$?: Observable<SelectOption[]>;
  filterOptions$?: Observable<SelectOption[]>;
};

// interface for every comp which want to use kkl-table = {
// data : array of objects to render in table
//  columns : array of ColumnsModel
// options : see TableOptions interface
// model : new instance of the data object
// }
export interface Table<T> {
  data$: Observable<T[]>;
  columns: ColumnModel<T>[];
  options: TableOptions<T>;
  model: T;
}

@Component({
  selector: 'kkl-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0rem', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  providers: [
    { provide: TableService, useClass: TableService },
    { provide: TableFilterService, useClass: TableFilterService },
  ],
})
export class TableComponent<T> implements OnInit, Table<T> {
  // color for header : primary or accent
  @Input() public theme: ThemePalette;

  // data[]
  @Input() public data$: Observable<T[]>;
  @Input() public columns$: Observable<ColumnModel<T>[]>;

  // array of columns model
  @Input() public columns: ColumnModel<T>[];

  // table data instance for column keys
  @Input() public model: T;

  @Input() public options: TableOptions<T>;

  // Subject which control table state mode : edit/expand/save
  @Input() public rowsState$: Observable<RowsState<T>>;
  @Input() public columnsState$: Observable<ColumnState<T>>;

  // if table have state modes
  @Input() public paginator: boolean;
  @Input() public expendable: boolean;
  @Input() public clickable: boolean;
  @Input() public accordion: boolean;
  @Input() public selectable: boolean;
  @Input() public filterable: boolean;
  @Input() public hasState: boolean;
  @Input() public hasFooter: boolean;
  @Input() public hasActions: boolean;

  //ng template for custom form inputs
  @Input() public formSlots: {};

  // ng template for column header
  @Input() public headerSlots: {};

  // ng template for cell
  @Input() public rowSlots: {};

  // ng template for filter
  @Input() public filterSlots: {};

  // ng template for footer cell
  @Input() public footerSlots: {};

  // ng template for select cell
  @Input() public selectSlot: {};

  // ng template for expand cell
  @Input() public expandSlots: {};

  public rows$: Observable<RowModel<T>[]>;
  public rowsWithState$: Observable<RowModel<T>[]>;
  public pagination$: Observable<PaginationInstance>;
  public columnDefs: ColumnDef<T>[];

  // emit sort event : Sort
  @Output() sort: EventEmitter<Sort> = new EventEmitter();

  // emit pagination event : {next : number, prev : number}
  @Output() pageChange: EventEmitter<{
    next: number;
    prev: number;
  }> = new EventEmitter();

  // emit filter event : ColumnModel<T>
  @Output() filter: EventEmitter<FilterOption<T>> = new EventEmitter();

  @Output() filterAutocomplete: EventEmitter<FilterOption<T>> =
    new EventEmitter();

  // emit select event : Observable<T[]>
  @Output() selected: EventEmitter<Observable<T[]>> = new EventEmitter();

  // emit row event expand : Observable<RowModel<T>
  @Output() expand: EventEmitter<RowModel<T>> = new EventEmitter();

  // emit row : Observable<RowModel<T>
  @Output() clicked: EventEmitter<RowModel<T>> = new EventEmitter();

  // prop to hold rows current data
  private rows: RowModel<T>[];

  // cdk object that handle selection
  public selection: SelectionModel<RowModel<T>> = new SelectionModel<
    RowModel<T>
  >(true, [], true);

  constructor(private tableService: TableService<T>) {}

  private setPagination$(pagination: PaginationInstance) {
    return this.data$.pipe(
      // distinctUntilChanged(),
      map((data) => {
        return { ...pagination, id: uuid4(), totalItems: data.length };
      })
    );
  }

  private setRows$(): Observable<RowModel<T>[]> {
    return this.rowsState$ ? this.setRowWithState$() : this.setDataRows$();
  }

  private setColumns$(filters): Observable<ColumnModel<T>[]> {
    return this.columnsState$
      ? this.setColumnsWithState$(filters)
      : this.setColumns(filters);
  }

  ngOnInit() {
    this.theme = this.theme || 'accent';
    const { filters, pagination } = this.options;

    // set columns$ obs with and without state
    this.columns$ = this.setColumns$(filters);

    // set rows$ obs with and without state
    this.rows$ = this.setRows$();

    this.expendable = this.expendable || this.accordion;
    this.pagination$ = this.setPagination$(pagination);


    this.formSlots = this.formSlots || {};
  }

  // set row$ with data$ form parent
  private setDataRows$(): Observable<RowModel<T>[]> {
    return this.data$.pipe(
      map((data) => {
        this.rows = this.tableService.setRows(data, this.options);
        return this.rows;
      })
    );
  }

  // method which handle row state events
  private setRowState(
    rows: RowModel<T>[],
    state: RowsState<T>,
    columns?: ColumnModel<T>[]
  ): RowModel<T>[] {
    const { mode, row, column } = state;

    switch (mode) {
      case 'expand':
        rows = this.tableService.onExpendMode(rows, row, column.columnDef);
        break;
      case 'form':
        rows = this.tableService.onFormMode(rows, columns, this.options);
        break;
      case 'add':
        rows = this.tableService.onAddFormRow(rows, columns);
        break;

      case 'edit':
        rows = this.tableService.onEditMode(rows, row, columns);
        break;
      case 'save':
        rows = this.tableService.onSaveMode(rows, 'id', row.item);
        break;
      case 'cancel':
        rows.shift();
        break;
      default:
        break;
    }
    this.rows = rows;

    return rows;
  }

  private setRowWithState$(): Observable<RowModel<T>[]> {
    return this.columns$.pipe(
      switchMap((columns) => {
        return combineLatest([this.setDataRows$(), this.rowsState$]).pipe(
          map((pair) => {
            this.rows = this.setRowState(pair[0], pair[1], columns);
            return this.rows;
          })
        );
      })
    );
  }

  // method which combine columns$ obs  columnsState$ obs
  private setColumnsWithState$(filters): Observable<ColumnModel<T>[]> {
    return this.setColumns(filters).pipe(
      switchMap((columns) => this.setColumnsState$(columns))
    );
  }

  // method which convert columns to columns$ with additional logic
  private setColumns(filters: ColumnDef<T>[]): Observable<ColumnModel<T>[]> {
    const { columns, columnsDefs } = this.tableService.setColumns({
      tableColumns: this.columns,
      model: this.model,
      filters: [...filters],
      selectable: this.selectable,
      filterable: this.filterable,
      accordion: this.accordion,
      hasActions: this.hasActions,
    });

    this.columns = columns;
    this.columnDefs = columnsDefs;

    return of(columns);
  }

  // method which handle columns state : select and filter options
  private setColumnsState$(
    columns: ColumnModel<T>[]
  ): Observable<ColumnModel<T>[]> {
    return this.columnsState$.pipe(
      switchMap((state) => {
        if (state) {
          const { key, selectOptions$, filterOptions$ } = state;

          const index = columns.findIndex(
            (column: ColumnModel<T>) => column.columnDef === key
          );
          if (selectOptions$) {
            const columns$ = selectOptions$.pipe(
              map((options) => {
                if (options.length > 0) {
                  const selectOptions = columns[index].selectOptions;
                  columns[index].selectOptions = selectOptions.concat(options);
                }
                return columns;
              })
            );

            return columns$;
          }
          if (filterOptions$) {
            const columns$ = filterOptions$.pipe(
              map((options) => {
                if (options.length > 0) {
                  const filterOptions = columns[index].filterOptions;
                  columns[index].filterOptions = filterOptions.concat(options);
                }
                return columns;
              })
            );

            return columns$;
          }
        }
        // return columns;

        return of(columns);
      })
    );
  }

  // method which fire when row is clicked
  public onRowClick(row: RowModel<T>) {
    if (this.clickable) {
      this.clicked.emit(row);
    }
    if (this.accordion) {
      this.expand.emit(row);
    }
  }

  // EMIT EVENTS

  // method which emit page data
  public onPageChange(event: { next: number; prev: number }) {
    this.pageChange.emit(event);
  }

  // method which sort data
  public onSort(sort: Sort): void {
    this.sort.emit(sort);
  }

  // ------------------------------------------------------------------------------------

  // method which emit filter data
  public onFilter(filterOption: FilterOption<T>): void {
    this.filter.emit(filterOption);
  }

  // method which emit autocomplete filter data
  public onFilterAutocomplete(filterOption: FilterOption<T>): void {
    this.filterAutocomplete.emit(filterOption);
  }

  // ------------------------------------------------------------------------------------

  // method which emit selected items : []T
  public onSelect(): void {
    const select$ = this.selection.changed.pipe(
      map((selection: SelectionChange<RowModel<T>>) => {
        const { source } = selection;
        return source.selected.map((row) => row.item);
      })
    );

    this.selected.emit(select$);
  }

  // SELECT LOGIC SECTION

  /** Whether the number of selected elements matches the total number of rows. */
  public isAllSelected(): boolean {
    const numSelected = this.selection.selected?.length;
    const numRows = this.rows.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle(): void {
    this.isAllSelected()
      ? this.selection.clear()
      : this.rows.map((row) => this.selection.select(row));
  }
}
