import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { mergeAll } from "rxjs/operators";
import { FARM_EXPANDABLE_TABLE_DATA, FARM_TABLE_TOTAL_TREE_RESULTS_DATA, FARM_TABLE_TREE_RESULTS_DATA } from "src/app/mock_data/farm-forest-results";

import { TableDataSource } from "src/app/shared/components/table/models/table-datasource";
import { FarmForestTreeTableExpandableModel } from "./farm-forest-tree-table-expandable.model";
@Injectable({
  providedIn: "root",
})
export class FarmForestTreeTableExpandableService {
   
   
  private data: FarmForestTreeTableExpandableModel[] = FARM_EXPANDABLE_TABLE_DATA;

  public dataSource: TableDataSource<FarmForestTreeTableExpandableModel>;
  private selected$: BehaviorSubject<Observable<FarmForestTreeTableExpandableModel[]>>;
  private data$: BehaviorSubject<FarmForestTreeTableExpandableModel[]>;

  constructor() {
    this.selected$ = new BehaviorSubject<Observable<FarmForestTreeTableExpandableModel[]>>(
      of([])
    );
    this.dataSource = new TableDataSource<FarmForestTreeTableExpandableModel>([]);
    this.dataSource.load(this.data);
  }

  public emitSelected(selected: Observable<FarmForestTreeTableExpandableModel[]>): void {
    this.selected$.next(selected);
  }

  public emitData(): void {
    //load new data
    this.dataSource.load(FARM_TABLE_TOTAL_TREE_RESULTS_DATA)
  }

  public getSelectedObs(): Observable<FarmForestTreeTableExpandableModel[]> {
    return this.selected$.asObservable().pipe(mergeAll());
  }
  
}
