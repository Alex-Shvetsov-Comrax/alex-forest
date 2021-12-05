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
import {
  RowModel,
  RowState,
} from 'src/app/shared/components/table/models/row.model';
import {
  ColumnState,
  Table,
  TableOptions,
  RowsState,
} from 'src/app/shared/components/table/table.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FilterOption } from 'src/app/shared/components/columns/column-filter/column-filter.component';
import { SelectOption } from 'src/app/shared/components/form/models/question-select.model';
import { RouterService } from 'src/app/shared/services/route.service';
import { TableDataSource } from 'src/app/shared/components/table/models/table-datasource';

import { QuestionTextModel } from 'src/app/shared/components/form/models/question-text.model';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { QuestionNumberModel } from 'src/app/shared/components/form/models/question-number.model';
import { FarmForestTreeTableExpandableService } from './farm-forest-tree-table-expandable.service';
import { FarmForestTreeTableExpandableModel } from './farm-forest-tree-table-expandable.model';
@Component({
  selector: 'app-farm-forest-tree-table-expandable',
  templateUrl: './farm-forest-tree-table-expandable.component.html',
  styleUrls: ['./farm-forest-tree-table-expandable.component.scss']
})
export class FarmForestTreeTableExpandableComponent implements OnInit , Table<FarmForestTreeTableExpandableModel>
{
  @Input() action: string;
  @Input() selectable: boolean;

  @Input() hasActions: boolean =true;
  public treesCount: [] = [];
  public add$: Observable<boolean>;
  public cancel$: Observable<boolean>;
  public contactsButton$: Observable<boolean>;

  public model: FarmForestTreeTableExpandableModel = new FarmForestTreeTableExpandableModel();

  public activeColumnDef$: Observable<string>;

  public rowsState$: Observable<RowsState<FarmForestTreeTableExpandableModel>>;
  public columnsState$: Observable<ColumnState<FarmForestTreeTableExpandableModel>>;
  public mode$: Observable<string>;
    public columns: ColumnModel<FarmForestTreeTableExpandableModel>[] = [
    new ColumnModel({ label: 'משתלה', type: 'text',control:'text' }),
    new ColumnModel({ label: 'כמות', type: 'text',control:'text' }),
    new ColumnModel({ label: 'לקוח', type: 'text',control:'text' }),
    new ColumnModel({ label: 'טלפון', type: 'text',control:'text' }),
    new ColumnModel({ label: 'כתובת', type: 'text',control:'text' }),
    new ColumnModel({ label: 'דוא"ל', type: 'text',control:'text' }),
  
  ];

  public data$: Observable<FarmForestTreeTableExpandableModel[]>;

  private pagination: PaginationInstance = {
    itemsPerPage: 6,
    currentPage: 1,
    totalItems: 16,
  };

  public options: TableOptions<FarmForestTreeTableExpandableModel> = {
    pagination: this.pagination,
    filters: ['id'],
  };

  private dataSource: TableDataSource<FarmForestTreeTableExpandableModel>;


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
      map((state: RowsState<FarmForestTreeTableExpandableModel>) => state.mode)
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

  public onEditState(row: RowModel<FarmForestTreeTableExpandableModel>) {
    this.dataSource.edit({ row });
  }
  // method to change row state to save
  public onSaveContact(row: RowModel<FarmForestTreeTableExpandableModel>) {
    // const contact: ContactModel = row.formGroup.value;
  }

  // method to add contact from server
  public onAddContact(row) {
    this.dataSource.add({ row });
  }

  // method to delete contact from server
  public onDeleteState(options: {
    row: RowModel<FarmForestTreeTableExpandableModel>;
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
    row: RowModel<FarmForestTreeTableExpandableModel>;
    column: ColumnModel<FarmForestTreeTableExpandableModel>;
  }) {
    this.dataSource.expand(options);
  }


  public onCheckboxChange(event: MatCheckboxChange) {}

  public onRemove(row: RowModel<FarmForestTreeTableExpandableModel>) {}

  public onEdit(row: RowModel<FarmForestTreeTableExpandableModel>) {
    this.dataSource.edit({ row });
  }

  public onSelected(suppliers: Observable<FarmForestTreeTableExpandableModel[]>) {
    this.farmForestTreeTableExpandableService.emitSelected(suppliers);
  }

}
