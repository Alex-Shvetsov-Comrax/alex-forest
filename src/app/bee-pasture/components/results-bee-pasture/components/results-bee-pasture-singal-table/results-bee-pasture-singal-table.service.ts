import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { mergeAll } from "rxjs/operators";
import { FarmForestTreeTypeSingalTableModel } from "src/app/farm-forest-tree-type/components/farm-forest-tree-type/components/farm-forest-tree-type-singal-table/farm-forest-tree-type-singal-table.model";
import { ADD_BEE_PASTURE_TABLE_DATA, RESULTS_BEE_PASTURE_SINGAL_TABLE_DATA } from "src/app/mock_data/bee-pasture";

import { TableDataSource } from "src/app/shared/components/table/models/table-datasource";
@Injectable({
  providedIn: "root",
})
export class ResultsBeePastureSingalTableService {
  private data:FarmForestTreeTypeSingalTableModel [] = RESULTS_BEE_PASTURE_SINGAL_TABLE_DATA;
  public dataSource: TableDataSource<FarmForestTreeTypeSingalTableModel>;
  private selected$: BehaviorSubject<Observable<FarmForestTreeTypeSingalTableModel[]>>;
  private data$: BehaviorSubject<FarmForestTreeTypeSingalTableModel[]>;

  constructor() {
    this.selected$ = new BehaviorSubject<Observable<FarmForestTreeTypeSingalTableModel[]>>(
      of([])
    );
    this.dataSource = new TableDataSource<FarmForestTreeTypeSingalTableModel>([]);
    this.dataSource.load(this.data);
  }

  public emitSelected(selected: Observable<FarmForestTreeTypeSingalTableModel[]>): void {
    this.selected$.next(selected);
  }

  public emitData(): void {
    //load new data
    this.dataSource.load(ADD_BEE_PASTURE_TABLE_DATA)
  }

  public getSelectedObs(): Observable<FarmForestTreeTypeSingalTableModel[]> {
    return this.selected$.asObservable().pipe(mergeAll());
  }
}
