import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { Observable} from 'rxjs';
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

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { QuestionNumberModel } from 'src/app/shared/components/form/models/question-number.model';
import { AddBeePastureTableModel } from '../../../add-bee-pasture/components/add-bee-pasture-table/add-bee-pasture-table.model';
import { ResultsBeePastureTotalTableService } from './add-bee-pasture-total-table.service';

@Component({
  selector: 'app-results-bee-pasture-total-table',
  templateUrl: './results-bee-pasture-total-table.component.html',
  styleUrls: ['./results-bee-pasture-total-table.component.scss']
})
export class ResultsBeePastureTotalTableComponent implements OnInit, Table<AddBeePastureTableModel> {


  @Input() action: string;
  @Input() selectable: boolean;

  @Input() hasActions: boolean =true;
  public treesCount: [] = [];
  public add$: Observable<boolean>;
  public cancel$: Observable<boolean>;
  public contactsButton$: Observable<boolean>;

  public model: AddBeePastureTableModel = new AddBeePastureTableModel();

  public activeColumnDef$: Observable<string>;

  public rowsState$: Observable<RowsState<AddBeePastureTableModel>>;
  public columnsState$: Observable<ColumnState<AddBeePastureTableModel>>;
  public mode$: Observable<string>;
    public columns: ColumnModel<AddBeePastureTableModel>[] = [

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

  public data$: Observable<AddBeePastureTableModel[]>;

  private pagination: PaginationInstance = {
    itemsPerPage: 6,
    currentPage: 1,
    totalItems: 16,
  };

  public options: TableOptions<AddBeePastureTableModel> = {
    pagination: this.pagination,
    filters: ['id'],
  };

  private dataSource: TableDataSource<AddBeePastureTableModel>;
  constructor(private resultsBeePastureTotalTableService:ResultsBeePastureTotalTableService) { }

  ngOnInit(): void {
    this.dataSource = this.resultsBeePastureTotalTableService.dataSource;

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
      map((state: RowsState<AddBeePastureTableModel>) => state.mode)
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

  public onEditState(row: RowModel<AddBeePastureTableModel>) {
    this.dataSource.edit({ row });
  }
  // method to change row state to save
  public onSaveContact(row: RowModel<AddBeePastureTableModel>) {
    // const contact: ContactModel = row.formGroup.value;
  }

  // method to add contact from server
  public onAddContact(row) {
    this.dataSource.add({ row });
  }

  // method to delete contact from server
  public onDeleteState(options: {
    row: RowModel<AddBeePastureTableModel>;
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
    row: RowModel<AddBeePastureTableModel>;
    column: ColumnModel<AddBeePastureTableModel>;
  }) {
    this.dataSource.expand(options);
  }


  public onCheckboxChange(event: MatCheckboxChange) {}

  public onRemove(row: RowModel<AddBeePastureTableModel>) {}

  public onEdit(row: RowModel<AddBeePastureTableModel>) {
    this.dataSource.edit({ row });
  }

  public onSelected(suppliers: Observable<AddBeePastureTableModel[]>) {
    this.resultsBeePastureTotalTableService.emitSelected(suppliers);
  }

  checkToyalSum(row: RowModel<AddBeePastureTableModel>, column, control) {
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
