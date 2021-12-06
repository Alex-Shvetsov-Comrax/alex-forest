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
import { SpatialTotalTableService } from "./spatial-total-table.service";
import { SpatialTotalTableModel } from "./spatial-total-table.model";

@Component({
  selector: "app-spatial-total-table",
  templateUrl: "./spatial-total-table.component.html",
  styleUrls: ["./spatial-total-table.component.scss"],
})
export class SpatialTotalTableComponent
  implements OnInit, Table<SpatialTotalTableModel>
{
  @Input() action: string;
  @Input() selectable: boolean;

  @Input() hasActions: boolean;

  public add$: Observable<boolean>;
  public cancel$: Observable<boolean>;
  public contactsButton$: Observable<boolean>;

  public model: SpatialTotalTableModel = new SpatialTotalTableModel();

  public activeColumnDef$: Observable<string>;

  public rowsState$: Observable<RowsState<SpatialTotalTableModel>>;
  public columnsState$: Observable<ColumnState<SpatialTotalTableModel>>;
  public mode$: Observable<string>;

  public columns: ColumnModel<SpatialTotalTableModel>[] = [
    new ColumnModel({
      label: "מין הצומח",
      type: "text",
      control: "autocomplete",
      selectOptions: [
        { value: "as", label: "a" },
        { value: "as", label: "a" },
      ],
    }),
    new ColumnModel({ label: "כמות", type: "text", control: "number" }),
    new ColumnModel({
      label: "אזור",
      type: "text",
      control: "select",
      selectOptions: [
        { value: "as", label: "a" },
        { value: "as", label: "a" },
      ],
    }),
    new ColumnModel({
      label: "כלי קיבול",
      type: "text",
      control: "select",
      selectOptions: [
        { value: "as", label: "a" },
        { value: "as", label: "a" },
      ],
    }),
    new ColumnModel({ label: "חומר ריבוי", type: "text", control: "text" }),
    new ColumnModel({ label: "מקור הזרע", type: "text", control: "text" }),
    new ColumnModel({ label: "הערות", type: "text", control: "text" }),
  ];

  public data$: Observable<SpatialTotalTableModel[]>;


  private pagination: PaginationInstance = {
    itemsPerPage: 6,
    currentPage: 1,
    totalItems: 16,
  };

  public options: TableOptions<SpatialTotalTableModel> = {
    pagination: this.pagination,
    filters: ["id"],
  };

  private dataSource: TableDataSource<SpatialTotalTableModel>;

  constructor(private spatialTotalTableService: SpatialTotalTableService) {}

  ngOnInit(): void {
    this.dataSource = this.spatialTotalTableService.dataSource;

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
      map((state: RowsState<SpatialTotalTableModel>) => state.mode)
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

  public onEditState(row: RowModel<SpatialTotalTableModel>) {
    this.dataSource.edit({ row });
  }
  // method to change row state to save
  public onSaveContact(row: RowModel<SpatialTotalTableModel>) {
    // const contact: ContactModel = row.formGroup.value;
    console.log(row);
  }

  // method to add contact from server
  public onAddContact(row) {
    this.dataSource.add({ row });
  }

  // method to delete contact from server
  public onDeleteState(options: {
    row: RowModel<SpatialTotalTableModel>;
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
    row: RowModel<SpatialTotalTableModel>;
    column: ColumnModel<SpatialTotalTableModel>;
  }) {
    // const { row, column } = options;
    this.dataSource.expand(options);
  }

  // public onNavigate(row: RowModel<SpatialTotalTableModel>) {
  //   const path = `small-contracts/create-new-contract/details`;
  //   this.routerService.navigate(path);
  // }

  public onCheckboxChange(event: MatCheckboxChange) {}

  public onRemove(row: RowModel<SpatialTotalTableModel>) {}

  public onEdit(row: RowModel<SpatialTotalTableModel>) {
    this.dataSource.edit({ row });
  }

  public onSelected(suppliers: Observable<SpatialTotalTableModel[]>) {
    this.spatialTotalTableService.emitSelected(suppliers);
  }
}
