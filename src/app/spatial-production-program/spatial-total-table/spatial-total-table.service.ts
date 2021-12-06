import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { mergeAll } from "rxjs/operators";
import {
  SPATIAL_TABLE_DATA,
  SPATIAL_TABLE_DATA2,
} from "src/app/mock_data/production-process";
import { TableDataSource } from "src/app/shared/components/table/models/table-datasource";
import { SpatialTotalTableModel } from "./spatial-total-table.model";
@Injectable({
  providedIn: "root",
})
export class SpatialTotalTableService {
  private data: SpatialTotalTableModel[] = SPATIAL_TABLE_DATA;

  public dataSource: TableDataSource<SpatialTotalTableModel>;
  private selected$: BehaviorSubject<Observable<SpatialTotalTableModel[]>>;
  private data$: BehaviorSubject<SpatialTotalTableModel[]>;

  constructor() {
    this.selected$ = new BehaviorSubject<Observable<SpatialTotalTableModel[]>>(
      of([])
    );
    this.dataSource = new TableDataSource<SpatialTotalTableModel>([]);
    this.dataSource.load(this.data);
  }

  public emitSelected(selected: Observable<SpatialTotalTableModel[]>): void {
    this.selected$.next(selected);
  }

  public emitData(): void {
    //load new data
    this.dataSource.load(SPATIAL_TABLE_DATA2)
  }

  public getSelectedObs(): Observable<SpatialTotalTableModel[]> {
    return this.selected$.asObservable().pipe(mergeAll());
  }
}
