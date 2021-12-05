import {
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { BehaviorSubject, Observable} from 'rxjs';
import {
  map,
} from 'rxjs/operators';
import { ColumnModel } from 'src/app/shared/components/columns/column.model';
import {
  RowModel,
} from 'src/app/shared/components/table/models/row.model';
import {
  Table,
  TableOptions,
  RowsState,
  ColumnState,
} from 'src/app/shared/components/table/table.component';
import { FarmForestTreeTypeTotalTableService } from './farm-forest-tree-type-total-table.service';
import { FarmForestTreeTableModel } from 'src/app/fm-pp-farm-forest-program/components/farm-forest-results/components/farm-forest-tree-table/farm-forest-tree-table.model';
import { TableDataSource } from 'src/app/shared/components/table/models/table-datasource';

@Component({
  selector: 'app-farm-forest-tree-type-total-table',
  templateUrl: './farm-forest-tree-type-total-table.component.html',
  styleUrls: ['./farm-forest-tree-type-total-table.component.scss']
})
export class FarmForestTreeTypeTotalTableComponent implements OnInit, Table<FarmForestTreeTableModel> {


  @Input() action: string;
  @Input() selectable: boolean;

  @Input() hasActions: boolean =true;
  public treesCount: [] = [];
  public add$: Observable<boolean>;
  public cancel$: Observable<boolean>;
  public contactsButton$: Observable<boolean>;

  public model: FarmForestTreeTableModel = new FarmForestTreeTableModel();

  public activeColumnDef$: Observable<string>;

  public rowsState$: Observable<RowsState<FarmForestTreeTableModel>>;
  public columnsState$: Observable<ColumnState<FarmForestTreeTableModel>>;
  public mode$: Observable<string>;
  public columns: ColumnModel<FarmForestTreeTableModel>[] = [
    new ColumnModel({ label: 'צמח', type: 'text', control:'text' }),
    new ColumnModel({ label: 'אשתאול', type: 'text', control:'number' }),
    new ColumnModel({ label: 'גולני', type: 'text', control:'number' }),
    new ColumnModel({ label: 'גילת', type: 'text', control:'number' }),
    new ColumnModel({ label: 'סה"כ', type: 'text', control:'number' }),
   
  ];
  public data$: Observable<FarmForestTreeTableModel[]>;

  private pagination: PaginationInstance = {
    itemsPerPage: 6,
    currentPage: 1,
    totalItems: 16,
  };

  public options: TableOptions<FarmForestTreeTableModel> = {
    pagination: this.pagination,
    filters: ['id'],
  };

  private dataSource: TableDataSource<FarmForestTreeTableModel>;
  constructor(private farmForestTreeTypeTotalTableService:FarmForestTreeTypeTotalTableService) { }

  ngOnInit(): void {
    this.dataSource = this.farmForestTreeTypeTotalTableService.dataSource;

    this.data$ = this.dataSource.connect();
    this.rowsState$ = this.dataSource.getRowsState();
    this.columnsState$ = this.dataSource.getColumnsState();
    this.activeColumnDef$ = this.setActiveColumnDef$();
    this.mode$ = this.dataSource.getRowMode();

    this.mode$ = this.setMode$();
    this.add$ = this.showContactButton$();
    this.cancel$ = this.showCancelButton();
  }

  private setMode$(): Observable<string> {
    return this.rowsState$.pipe(
      map((state: RowsState<FarmForestTreeTableModel>) => state.mode)
    );
  }

  public onAddState() {
    this.dataSource.add();
  }

  private showContactButton$() {
    return this.mode$.pipe(
      map((mode: string) => {
        return mode === 'default' || mode === 'save' || mode === 'cancel';
      })
    );
  }

  private showCancelButton() {
    return this.mode$.pipe(
      map((mode: string) => {
        return mode === 'add';
      })
    );
  }

  public onEditState(row: RowModel<FarmForestTreeTableModel>) {
    this.dataSource.edit({ row });
  }
  // method to change row state to save
  public onSaveContact(row: RowModel<FarmForestTreeTableModel>) {
    // const contact: ContactModel = row.formGroup.value;
  }

  // method to add contact from server
  public onAddContact(row) {
    this.dataSource.add({ row });
  }

  // method to delete contact from server
  public onDeleteState(options: {
    row: RowModel<FarmForestTreeTableModel>;
    mode: string;
  }) {
    const { mode, row } = options;

    if (mode === 'add') {
      this.dataSource.cancel();
    }

    // TODO - server side delete + update rows
    //TODO - this.supplierContactService.dataSource.load()
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
    row: RowModel<FarmForestTreeTableModel>;
    column: ColumnModel<FarmForestTreeTableModel>;
  }) {
    this.dataSource.expand(options);
  }



  public onRemove(row: RowModel<FarmForestTreeTableModel>) {}

  public onEdit(row: RowModel<FarmForestTreeTableModel>) {
    this.dataSource.edit({ row });
  }

  public onSelected(suppliers: Observable<FarmForestTreeTableModel[]>) {
    this.farmForestTreeTypeTotalTableService.emitSelected(suppliers);
  }


}
