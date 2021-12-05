import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { Observable, BehaviorSubject, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { ColumnModel } from 'src/app/shared/components/columns/column.model';
import { RowModel } from 'src/app/shared/components/table/models/row.model';
import {
  ColumnState,
  Table,
  TableOptions,
  RowsState,
} from 'src/app/shared/components/table/table.component';
import { ProductionProcessTableModel } from './production-process-table.model';
import { ProductionProcessTableService } from './production-process-table.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FilterOption } from 'src/app/shared/components/columns/column-filter/column-filter.component';
import { SelectOption } from 'src/app/shared/components/form/models/question-select.model';
import { RouterService } from 'src/app/shared/services/route.service';
import { TableDataSource } from 'src/app/shared/components/table/models/table-datasource';


@Component({
  selector: 'app-production-procces-table',
  templateUrl: './production-procces-table.component.html',
  styleUrls: ['./production-procces-table.component.scss'],
})
export class ProductionProccesTableComponent
  implements OnInit, Table<ProductionProcessTableModel>
{

  @Input() action: string;
  @Input() selectable: boolean;

  @Input() hasActions: boolean;


  public model: ProductionProcessTableModel = new ProductionProcessTableModel();

  public activeColumnDef$: Observable<string>;

  public rowsState$: Observable<RowsState<ProductionProcessTableModel>>;
  public columnsState$: Observable<ColumnState<ProductionProcessTableModel>>;
  public mode$: Observable<string>;


  public columns: ColumnModel<ProductionProcessTableModel>[] = [
    new ColumnModel({ label: 'סכום הרחבה', type: 'text' }),
    new ColumnModel({ label: 'מחיר %', type: 'text' }),
    new ColumnModel({ label: 'איכות %', type: 'text' }),
    new ColumnModel({ label: 'מתאריך', type: 'text' }),
    new ColumnModel({ label: 'עד תאריך', type: 'text' }),
  ];

  public data$: Observable<ProductionProcessTableModel[]>; 

  private pagination: PaginationInstance = {
    itemsPerPage: 8,
    currentPage: 1,
    totalItems: 16,
  };

  public options: TableOptions<ProductionProcessTableModel> = {
    pagination: this.pagination,
    filters: ['id'],
  };

  private dataSource: TableDataSource<ProductionProcessTableModel>;

  constructor(
    private productionProcessService: ProductionProcessTableService
  ) {}

  ngOnInit(): void {
    this.dataSource = this.productionProcessService.dataSource;
console.log(  this.dataSource);

    this.data$ = this.dataSource.connect();
    this.rowsState$ = this.dataSource.getRowsState();
    this.columnsState$ = this.dataSource.getColumnsState();
    this.activeColumnDef$ = this.setActiveColumnDef$();

    this.mode$ = this.dataSource.getRowMode();
  }

  
  private setActiveColumnDef$(): Observable<string> {
    return this.rowsState$.pipe(
      map((state) => {
        if (state !== null) {
          const { mode, column, row } = state;
          if (mode === 'expand' && row.expanded) {
            return column.columnDef;
          } else {
            return '';
          }
        } else {
          return '';
        }
      })
    );
  }

  public onExpand(options: {
    row: RowModel<ProductionProcessTableModel>;
    column: ColumnModel<ProductionProcessTableModel>;
  }) {
    // const { row, column } = options;
    this.dataSource.expand(options);
  }

  // public onNavigate(row: RowModel<ProductionProcessTableModel>) {
  //   const path = `small-contracts/create-new-contract/details`;
  //   this.routerService.navigate(path);
  // }

  public onCheckboxChange(event: MatCheckboxChange) {}

  public onRemove(row: RowModel<ProductionProcessTableModel>) {}

  public onEdit(row: RowModel<ProductionProcessTableModel>) {
    this.dataSource.edit({ row });
  }

  public onSelected(suppliers: Observable<ProductionProcessTableModel[]>) {
    this.productionProcessService.emitSelected(suppliers);
  }



}
