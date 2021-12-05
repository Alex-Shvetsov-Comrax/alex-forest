import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  OnInit,
} from "@angular/core";
import { PaginationInstance } from "ngx-pagination";
import { Observable, BehaviorSubject, of } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from "rxjs/operators";
import { ColumnModel } from "src/app/shared/components/columns/column.model";
import { RowModel } from "src/app/shared/components/table/models/row.model";
import {
  ColumnState,
  Table,
  TableOptions,
  RowsState,
} from "src/app/shared/components/table/table.component";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { FilterOption } from "src/app/shared/components/columns/column-filter/column-filter.component";
import { SelectOption } from "src/app/shared/components/form/models/question-select.model";
import { RouterService } from "src/app/shared/services/route.service";
import { TableDataSource } from "src/app/shared/components/table/models/table-datasource";
import { ProductionProcessStatusTable } from "./production-process-status-table.service";
import { ProductionProcessStatusTableModel } from "./production-process-status-table.model";
@Component({
  selector: 'app-production-process-status-table',
  templateUrl: './production-process-status-table.component.html',
  styleUrls: ['./production-process-status-table.component.scss']
})
export class ProductionProcessStatusTableComponent implements OnInit, Table<ProductionProcessStatusTableModel>
{
  @Input() action: string;
  @Input() selectable: boolean;

  @Input() hasActions: boolean;

  public add$: Observable<boolean>;
  public cancel$: Observable<boolean>;
  public contactsButton$: Observable<boolean>;

  public model: ProductionProcessStatusTableModel = new ProductionProcessStatusTableModel();

  public activeColumnDef$: Observable<string>;

  public rowsState$: Observable<RowsState<ProductionProcessStatusTableModel>>;
  public columnsState$: Observable<ColumnState<ProductionProcessStatusTableModel>>;
  public mode$: Observable<string>;

  public columns: ColumnModel<ProductionProcessStatusTableModel>[] = [

    new ColumnModel({ label: "סטטוס קודם", type: "text" }),
    new ColumnModel({ label: "סטטוס הבא", type: "text" }),
    new ColumnModel({ label: "שונה על ידי", type: "text" }),
    new ColumnModel({ label: "תאריך עדכון", type: "text" }),
    new ColumnModel({ label: "שעת עדכון", type: "text" }),
  ];
  public data$: Observable<ProductionProcessStatusTableModel[]>;


  private pagination: PaginationInstance = {
    itemsPerPage: 6,
    currentPage: 1,
    totalItems: 16,
  };

  public options: TableOptions<ProductionProcessStatusTableModel> = {
    pagination: this.pagination,
    filters: ["id"],
  };

  private dataSource: TableDataSource<ProductionProcessStatusTableModel>;
  constructor(private productionProcessStatusTable: ProductionProcessStatusTable) { }

  ngOnInit(): void {
    this.dataSource = this.productionProcessStatusTable.dataSource;

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
      map((state: RowsState<ProductionProcessStatusTableModel>) => state.mode)
    );
  }

  public onAddState() {
    this.dataSource.add();
  }

  private showContactButton$() {
    return this.mode$.pipe(
      map((mode: string) => {
        return mode === "default" || mode === "save" || mode === "cancel";
      })
    );
  }

  private showCancelButton() {
    return this.mode$.pipe(
      map((mode: string) => {
        return mode === "add";
      })
    );
  }

  public onEditState(row: RowModel<ProductionProcessStatusTableModel>) {
    this.dataSource.edit({ row });
  }
  // method to change row state to save
  public onSaveContact(row: RowModel<ProductionProcessStatusTableModel>) {
    // const contact: ContactModel = row.formGroup.value;
    console.log(row);
  }

  // method to add contact from server
  public onAddContact(row) {
    this.dataSource.add({ row });
  }

  // method to delete contact from server
  public onDeleteState(options: {
    row: RowModel<ProductionProcessStatusTableModel>;
    mode: string;
  }) {
    const { mode, row } = options;

    if (mode === "add") {
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
          if (mode === "expand" && row.expanded) {
            return column.columnDef;
          } else {
            return "";
          }
        } else {
          return "";
        }
      })
    );
  }

  public onExpand(options: {
    row: RowModel<ProductionProcessStatusTableModel>;
    column: ColumnModel<ProductionProcessStatusTableModel>;
  }) {
    // const { row, column } = options;
    this.dataSource.expand(options);
  }

  // public onNavigate(row: RowModel<ProductionProcessStatusTableModel>) {
  //   const path = `small-contracts/create-new-contract/details`;
  //   this.routerService.navigate(path);
  // }

  public onCheckboxChange(event: MatCheckboxChange) {}

  public onRemove(row: RowModel<ProductionProcessStatusTableModel>) {}

  public onEdit(row: RowModel<ProductionProcessStatusTableModel>) {
    this.dataSource.edit({ row });
  }

  public onSelected(suppliers: Observable<ProductionProcessStatusTableModel[]>) {
    this.productionProcessStatusTable.emitSelected(suppliers);
  }
}
