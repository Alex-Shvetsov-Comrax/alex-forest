import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { mergeAll } from "rxjs/operators";
import { FARM_TABLE_SINGAL_TREE_RESULTS_DATA } from "src/app/mock_data/farm-forest-tree";

import { TableDataSource } from "src/app/shared/components/table/models/table-datasource";
import { FarmForestTreeTypeSingalTableModel } from "./farm-forest-tree-type-singal-table.model";
@Injectable({
  providedIn: "root",
})
export class FarmForestTreeTypeSingalTableService {
  private data:FarmForestTreeTypeSingalTableModel[] = FARM_TABLE_SINGAL_TREE_RESULTS_DATA;
  private data$: BehaviorSubject<FarmForestTreeTypeSingalTableModel[]>
  
  constructor() { 
    this.data$ = new BehaviorSubject<FarmForestTreeTypeSingalTableModel[]>(this.data)
  }
  
  public emitData(data: FarmForestTreeTypeSingalTableModel[]): void {
    this.data$.next(data);
  }
  
  public getDataObs(): Observable<FarmForestTreeTypeSingalTableModel[]> {
    
    return this.data$.asObservable()
  }
  
  
}