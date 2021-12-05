import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { mergeAll } from "rxjs/operators";
import { FarmForestTreeTableModel } from "src/app/fm-pp-farm-forest-program/components/farm-forest-results/components/farm-forest-tree-table/farm-forest-tree-table.model";
import { FARM_TABLE_TREE_RESULTS_DATA } from "src/app/mock_data/farm-forest-tree";
import { TableDataSource } from "src/app/shared/components/table/models/table-datasource";
@Injectable({
  providedIn: "root",
})
export class FarmForestTreeTypeTotalTableService {
  private data: FarmForestTreeTableModel[] = FARM_TABLE_TREE_RESULTS_DATA;

  public dataSource: TableDataSource<FarmForestTreeTableModel>;
  private selected$: BehaviorSubject<Observable<FarmForestTreeTableModel[]>>;
  private data$: BehaviorSubject<FarmForestTreeTableModel[]>;

  constructor() {
    this.selected$ = new BehaviorSubject<Observable<FarmForestTreeTableModel[]>>(
      of([])
    );
    this.dataSource = new TableDataSource<FarmForestTreeTableModel>([]);
    this.dataSource.load(this.data);
  }

  public emitSelected(selected: Observable<FarmForestTreeTableModel[]>): void {
    this.selected$.next(selected);
  }

  public emitData(): void {
    //load new data
    this.dataSource.load(FARM_TABLE_TREE_RESULTS_DATA)
  }

  public getSelectedObs(): Observable<FarmForestTreeTableModel[]> {
    return this.selected$.asObservable().pipe(mergeAll());
  }
  
}