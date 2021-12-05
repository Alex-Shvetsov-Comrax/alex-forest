import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { Observable } from 'rxjs';
import {
  map,
} from 'rxjs/operators';
import { ColumnModel } from 'src/app/shared/components/columns/column.model';
import {
  RowModel,
} from 'src/app/shared/components/table/models/row.model';
import {
  ColumnState,
  Table,
  TableOptions,
  RowsState,
} from 'src/app/shared/components/table/table.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TableDataSource } from 'src/app/shared/components/table/models/table-datasource';


import { FarmForestTreeTableExpandableService } from 'src/app/fm-pp-farm-forest-program/components/farm-forest-results/components/farm-forest-tree-table-expandable/farm-forest-tree-table-expandable.service';
import { FarmForestSingalExpandableTableModel } from './farm-forest-singal-expandable-table.model';

@Component({
  selector: 'app-farm-forest-singal-expandable-table',
  templateUrl: './farm-forest-singal-expandable-table.component.html',
  styleUrls: ['./farm-forest-singal-expandable-table.component.scss']
})
export class FarmForestSingalExpandableTableComponent implements OnInit  , Table<FarmForestSingalExpandableTableModel>
{

  @Input() action: string;
  @Input() selectable: boolean;

  @Input() hasActions: boolean =false;
  public treesCount: [] = [];
  public add$: Observable<boolean>;
  public cancel$: Observable<boolean>;
  public contactsButton$: Observable<boolean>;

  public model: FarmForestSingalExpandableTableModel = new FarmForestSingalExpandableTableModel();

  public activeColumnDef$: Observable<string>;

  public rowsState$: Observable<RowsState<FarmForestSingalExpandableTableModel>>;
  public columnsState$: Observable<ColumnState<FarmForestSingalExpandableTableModel>>;
  public mode$: Observable<string>;
    public columns: ColumnModel<FarmForestSingalExpandableTableModel>[] = [
    new ColumnModel({ label: 'כמות', type: 'text',control:'text' }),
    new ColumnModel({ label: 'לקוח', type: 'text',control:'text' }),
    new ColumnModel({ label: 'טלפון', type: 'text',control:'text' }),
    new ColumnModel({ label: 'כתובת', type: 'text',control:'text' }),
    new ColumnModel({ label: 'דוא"ל', type: 'text',control:'text' }),
  
  ];

  public data$: Observable<FarmForestSingalExpandableTableModel[]>;

  private pagination: PaginationInstance = {
    itemsPerPage: 6,
    currentPage: 1,
    totalItems: 16,
  };

  public options: TableOptions<FarmForestSingalExpandableTableModel> = {
    pagination: this.pagination,
    filters: ['id'],
  };

  private dataSource: TableDataSource<FarmForestSingalExpandableTableModel>;



  constructor(private farmForestTreeTableExpandableService:FarmForestTreeTableExpandableService) { }

 
  ngOnInit(): void {
    this.dataSource = this.farmForestTreeTableExpandableService.dataSource;

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
      map((state: RowsState<FarmForestSingalExpandableTableModel>) => state.mode)
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

  public onEditState(row: RowModel<FarmForestSingalExpandableTableModel>) {
    this.dataSource.edit({ row });
  }
  // method to change row state to save
  public onSaveContact(row: RowModel<FarmForestSingalExpandableTableModel>) {
    // const contact: ContactModel = row.formGroup.value;
  }

  // method to add contact from server
  public onAddContact(row) {
    this.dataSource.add({ row });
  }

  // method to delete contact from server
  public onDeleteState(options: {
    row: RowModel<FarmForestSingalExpandableTableModel>;
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
    row: RowModel<FarmForestSingalExpandableTableModel>;
    column: ColumnModel<FarmForestSingalExpandableTableModel>;
  }) {
    this.dataSource.expand(options);
  }


  public onCheckboxChange(event: MatCheckboxChange) {}

  public onRemove(row: RowModel<FarmForestSingalExpandableTableModel>) {}

  public onEdit(row: RowModel<FarmForestSingalExpandableTableModel>) {
    this.dataSource.edit({ row });
  }

  public onSelected(suppliers: Observable<FarmForestSingalExpandableTableModel[]>) {
    this.farmForestTreeTableExpandableService.emitSelected(suppliers);
  }

}
