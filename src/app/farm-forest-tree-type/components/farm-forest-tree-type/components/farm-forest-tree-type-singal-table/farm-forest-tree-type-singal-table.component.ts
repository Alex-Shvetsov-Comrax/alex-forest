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

import { FarmForestTreeTypeSingalTableModel } from './farm-forest-tree-type-singal-table.model';
import { FarmForestTreeTypeSingalTableService } from './farm-forest-tree-type-singal-table.service';

@Component({
  selector: 'app-farm-forest-tree-type-singal-table',
  templateUrl: './farm-forest-tree-type-singal-table.component.html',
  styleUrls: ['./farm-forest-tree-type-singal-table.component.scss']
})
export class FarmForestTreeTypeSingalTableComponent implements OnInit, Table<FarmForestTreeTypeSingalTableModel> {

  
  public vat1: boolean;
  @Input() public id: number | string;
  @Input() selectable: boolean;
  @Input() actions: {};
  @Input() action: string;
  @Input() contactTable: ElementRef;
  @Input() hasAction: boolean = false;

  public rowsState$: BehaviorSubject<RowsState<FarmForestTreeTypeSingalTableModel>>;
  public edit$: Observable<boolean>;
  public model: FarmForestTreeTypeSingalTableModel = new FarmForestTreeTypeSingalTableModel();

  public columns: ColumnModel<FarmForestTreeTypeSingalTableModel>[] = [
    new ColumnModel({ label: 'צמח', type: 'text' }),
    new ColumnModel({ label: 'כמות', type: 'text' }),
   
  ];

  public data$: Observable<FarmForestTreeTypeSingalTableModel[]>;

  private pagination: PaginationInstance = {
    itemsPerPage: 8,
    currentPage: 1,
    totalItems: 16,
  };

  public options: TableOptions<FarmForestTreeTypeSingalTableModel> = {
    pagination: this.pagination,
    filters: ['id', 'tableTypes', 'iconInput'],
    // editable: [1],
  };

  constructor(private farmForestTreeTypeSingalTableService:FarmForestTreeTypeSingalTableService) { }

 
  ngOnInit(): void {
    this.data$ = this.farmForestTreeTypeSingalTableService.getDataObs();
    this.setSelect();
    this.setRowsState();
    this.setActions();
    this.setEdit$();
}


  private setActions() {
    if (this.hasAction) {
      const actionColumn =
        new ColumnModel<FarmForestTreeTypeSingalTableModel>({
          columnDef: 'actions',
          label: '',
          type: 'actions',
          // footer: true,
        });
      this.columns.push(actionColumn);
    }
  }

  private setRowsState() {
    this.rowsState$ = new BehaviorSubject<RowsState<FarmForestTreeTypeSingalTableModel>>({
      mode: 'default',
    });
  }
  public onExpand(options) {
    this.rowsState$.next({ mode: 'expand', ...options });
  }

  private setSelect() {
    if (this.selectable) {
      const selectColumn =
        new ColumnModel<FarmForestTreeTypeSingalTableModel>({
          columnDef: 'select',
          label: '',
          type: 'custom',
        });
      this.columns.push(selectColumn);
    }
  }
  public setEdit$() {
    this.edit$ = this.rowsState$.pipe(
      map((state: RowsState<FarmForestTreeTypeSingalTableModel>) => {
        const { mode } = state;

        let edit = true;

        switch (mode) {
          case 'edit':
            edit = false;
            break;
          case 'save':
            edit = true;
            break;
        }

        return edit;
      })
    );
  }

  public onAddState() {
    this.rowsState$.next({ mode: 'add' });
  }
  public onCancelState() {
    this.rowsState$.next({ mode: 'cancel' });
  }

  public onEditState(cell: RowModel<FarmForestTreeTypeSingalTableModel>) {
    this.rowsState$.next({ mode: 'edit', row: cell });
    setTimeout(() => console.log(cell.editable && this.edit$), 1);
  }
  public onSaveContact() {
    this.rowsState$.next({ mode: 'save' });
  }

  public onAddContact() {}

  public onClose() {}



}
