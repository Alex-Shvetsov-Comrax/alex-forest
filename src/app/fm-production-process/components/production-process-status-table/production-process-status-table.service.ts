import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { mergeAll } from "rxjs/operators";
import {
  SPATIAL_TABLE_DATA,
  SPATIAL_TABLE_DATA2,
} from "src/app/mock_data/production-process";
import { STATUS_TABLE_DATA } from "src/app/mock_data/production-process-status";
import { TableDataSource } from "src/app/shared/components/table/models/table-datasource";
import { ProductionProcessStatusTableModel } from "./production-process-status-table.model";


@Injectable({
  providedIn: "root",
})
export class ProductionProcessStatusTable {
  private data: ProductionProcessStatusTableModel[] = STATUS_TABLE_DATA;
  public dataSource: TableDataSource<ProductionProcessStatusTableModel>;
  private selected$: BehaviorSubject<Observable<ProductionProcessStatusTableModel[]>>;
  private data$: BehaviorSubject<ProductionProcessStatusTableModel[]>;

  constructor() {
    this.selected$ = new BehaviorSubject<Observable<ProductionProcessStatusTableModel[]>>(
      of([])
    );
    this.dataSource = new TableDataSource<ProductionProcessStatusTableModel>([]);
    this.dataSource.load(this.data);
  }

  public emitSelected(selected: Observable<ProductionProcessStatusTableModel[]>): void {
    this.selected$.next(selected);
  }

  public emitData(): void {
    //load new data
    this.dataSource.load(SPATIAL_TABLE_DATA2)
  }

  public getSelectedObs(): Observable<ProductionProcessStatusTableModel[]> {
    return this.selected$.asObservable().pipe(mergeAll());
  }
}
