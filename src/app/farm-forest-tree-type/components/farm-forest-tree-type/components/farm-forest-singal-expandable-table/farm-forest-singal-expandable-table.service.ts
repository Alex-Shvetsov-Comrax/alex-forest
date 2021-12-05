import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { mergeAll } from "rxjs/operators";
import { FARM_EXPANDABLE_SINGAL_TABLE_DATA } from "src/app/mock_data/farm-forest-tree";
import { TableDataSource } from "src/app/shared/components/table/models/table-datasource";
import { FarmForestSingalExpandableTableModel } from "./farm-forest-singal-expandable-table.model";
@Injectable({
  providedIn: "root",
})
export class FarmForestTreeTableExpandableService {
   
  private data: FarmForestSingalExpandableTableModel[] = FARM_EXPANDABLE_SINGAL_TABLE_DATA;

  public dataSource: TableDataSource<FarmForestSingalExpandableTableModel>;
  private selected$: BehaviorSubject<Observable<FarmForestSingalExpandableTableModel[]>>;
  private data$: BehaviorSubject<FarmForestSingalExpandableTableModel[]>;

  constructor() {
    this.selected$ = new BehaviorSubject<Observable<FarmForestSingalExpandableTableModel[]>>(
      of([])
    );
    this.dataSource = new TableDataSource<FarmForestSingalExpandableTableModel>([]);
    this.dataSource.load(this.data);
  }

  public emitSelected(selected: Observable<FarmForestSingalExpandableTableModel[]>): void {
    this.selected$.next(selected);
  }

  public emitData(): void {
    //load new data
    this.dataSource.load(FARM_EXPANDABLE_SINGAL_TABLE_DATA)
  }

  public getSelectedObs(): Observable<FarmForestSingalExpandableTableModel[]> {
    return this.selected$.asObservable().pipe(mergeAll());
  }
  
}
