import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { mergeAll } from "rxjs/operators";
import { FARM_TABLE_DATA } from "src/app/mock_data/fm-pp-farm-forest";
import {
  SPATIAL_TABLE_DATA,
  SPATIAL_TABLE_DATA2,
} from "src/app/mock_data/production-process";
import { TableDataSource } from "src/app/shared/components/table/models/table-datasource";
import { FarmForestTableModel } from "./farm-forest-table.model";
@Injectable({
  providedIn: "root",
})
export class FarmForestTableService {
   
  private data: FarmForestTableModel[] = FARM_TABLE_DATA;

  public dataSource: TableDataSource<FarmForestTableModel>;
  private selected$: BehaviorSubject<Observable<FarmForestTableModel[]>>;
  private data$: BehaviorSubject<FarmForestTableModel[]>;

  constructor() {
    this.selected$ = new BehaviorSubject<Observable<FarmForestTableModel[]>>(
      of([])
    );
    this.dataSource = new TableDataSource<FarmForestTableModel>([]);
    this.dataSource.load(this.data);
  }

  public emitSelected(selected: Observable<FarmForestTableModel[]>): void {
    this.selected$.next(selected);
  }

  public emitData(): void {
    //load new data
    this.dataSource.load(SPATIAL_TABLE_DATA2)
  }

  public getSelectedObs(): Observable<FarmForestTableModel[]> {
    return this.selected$.asObservable().pipe(mergeAll());
  }
}
