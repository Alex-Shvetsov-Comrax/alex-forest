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
import { FarmForestTableModel } from './farm-forest-table.model';
import { FarmForestTableService } from './form-forest-table.service';
import { QuestionTextModel } from 'src/app/shared/components/form/models/question-text.model';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { QuestionNumberModel } from 'src/app/shared/components/form/models/question-number.model';

@Component({
  selector: 'app-farm-forest-table',
  templateUrl: './farm-forest-table.component.html',
  styleUrls: ['./farm-forest-table.component.scss'],
})
export class FarmForestTableComponent
  implements OnInit, Table<FarmForestTableModel>
{
  @Input() action: string;
  @Input() selectable: boolean;

  @Input() hasActions: boolean;
  public treesCount: [] = [];
  public add$: Observable<boolean>;
  public cancel$: Observable<boolean>;
  public contactsButton$: Observable<boolean>;

  public model: FarmForestTableModel = new FarmForestTableModel();

  public activeColumnDef$: Observable<string>;

  public rowsState$: Observable<RowsState<FarmForestTableModel>>;
  public columnsState$: Observable<ColumnState<FarmForestTableModel>>;
  public mode$: Observable<string>;

  public columns: ColumnModel<FarmForestTableModel>[] = [
    new ColumnModel({ label: 'לקוח', type: 'text' }),
    new ColumnModel({ label: 'טלפון', type: 'text' }),
    new ColumnModel({ label: 'כתובת', type: 'text' }),
    new ColumnModel({ label: 'דוא"ל', type: 'text' }),
    new ColumnModel({ label: 'צמח', type: 'text' }),
    new ColumnModel({ label: 'כמות', type: 'text' }),
    new ColumnModel({
      label: 'אשתאול',
      type: 'number',
      control: 'custom',
      question: new QuestionNumberModel({
        key: 'ashtaol',
        label: 'אשתאול',
        validations: [this.totalValidate],
      }),
    }),
    new ColumnModel({
      label: 'גולני',
      type: 'text',
      control: 'custom',
      question: new QuestionNumberModel({
        key: 'golani',
        label: 'גולני',
        validations: [this.totalValidate],
      }),
    }),
    new ColumnModel({
      label: 'גילת',
      type: 'text',
      control: 'custom',
      question: new QuestionNumberModel({
        key: 'gilat',
        label: 'גילת',
        validations: [this.totalValidate],
      }),
    }),
  ];

  public data$: Observable<FarmForestTableModel[]>;

  private pagination: PaginationInstance = {
    itemsPerPage: 6,
    currentPage: 1,
    totalItems: 16,
  };

  public options: TableOptions<FarmForestTableModel> = {
    pagination: this.pagination,
    filters: ['id'],
  };

  private dataSource: TableDataSource<FarmForestTableModel>;

  constructor(private FarmForestTableService: FarmForestTableService) {}

  ngOnInit(): void {
    this.dataSource = this.FarmForestTableService.dataSource;

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
      map((state: RowsState<FarmForestTableModel>) => state.mode)
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

  public onEditState(row: RowModel<FarmForestTableModel>) {
    this.dataSource.edit({ row });
  }
  // method to change row state to save
  public onSaveContact(row: RowModel<FarmForestTableModel>) {
    // const contact: ContactModel = row.formGroup.value;
  }

  // method to add contact from server
  public onAddContact(row) {
    this.dataSource.add({ row });
  }

  // method to delete contact from server
  public onDeleteState(options: {
    row: RowModel<FarmForestTableModel>;
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
    row: RowModel<FarmForestTableModel>;
    column: ColumnModel<FarmForestTableModel>;
  }) {
    // const { row, column } = options;
    this.dataSource.expand(options);
  }

  // public onNavigate(row: RowModel<FarmForestTableModel>) {
  //   const path = `small-contracts/create-new-contract/details`;
  //   this.routerService.navigate(path);
  // }

  public onCheckboxChange(event: MatCheckboxChange) {}

  public onRemove(row: RowModel<FarmForestTableModel>) {}

  public onEdit(row: RowModel<FarmForestTableModel>) {
    this.dataSource.edit({ row });
  }

  public onSelected(suppliers: Observable<FarmForestTableModel[]>) {
    this.FarmForestTableService.emitSelected(suppliers);
  }

  checkToyalSum(row: RowModel<FarmForestTableModel>, column, control) {
    let sum: number = 0;
    sum = Object.keys(row.formGroup.controls)
      .map((item) => {
        return row.formGroup.controls[item].value;
      })
      .reduce((acc, next) => {
        return Number(acc) + Number(next);
      });
      
      if (Number(row.item.total) === sum  ) { 
        console.log(sum);
        return false;
      }
      if(sum>0 && Number(row.item.total) !== sum ){

        return true;
      }
      return false;
    }

  totalValidate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = 'as';
      return forbidden ? { forbiddenName: 'asd' } : null;
    };
  }

  gardeningInput(row, type: string) {
    console.log(row);
  }
}
