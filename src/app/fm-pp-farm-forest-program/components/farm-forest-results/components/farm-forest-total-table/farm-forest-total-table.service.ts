import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { mergeAll } from "rxjs/operators";
import {FARM_TABLE_TOTAL_RESULTS_DATA, FARM_TABLE_TOTAL_TREE_RESULTS_DATA } from "src/app/mock_data/farm-forest-results";

import { TableDataSource } from "src/app/shared/components/table/models/table-datasource";
import { FarmForestTotalTableModel } from "./farm-forest-total-table.model";
@Injectable({
  providedIn: "root",
})
export class FarmForestTotalTableService {
   
  private data: FarmForestTotalTableModel[] = FARM_TABLE_TOTAL_RESULTS_DATA;

  public dataSource: TableDataSource<FarmForestTotalTableModel>;
  private selected$: BehaviorSubject<Observable<FarmForestTotalTableModel[]>>;
  private data$: BehaviorSubject<FarmForestTotalTableModel[]>;

  constructor() {
    this.selected$ = new BehaviorSubject<Observable<FarmForestTotalTableModel[]>>(
      of([])
    );
    this.dataSource = new TableDataSource<FarmForestTotalTableModel>([]);
    this.dataSource.load(this.data);
  }

  public emitSelected(selected: Observable<FarmForestTotalTableModel[]>): void {
    this.selected$.next(selected);
  }

  public emitData(): void {
    //load new data
    this.dataSource.load(FARM_TABLE_TOTAL_TREE_RESULTS_DATA)
  }

  public getSelectedObs(): Observable<FarmForestTotalTableModel[]> {
    return this.selected$.asObservable().pipe(mergeAll());
  }
}
