import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { mergeAll } from "rxjs/operators";
import { FARM_TABLE_TOTAL_TREE_RESULTS_DATA, FARM_TABLE_TREE_RESULTS_DATA } from "src/app/mock_data/farm-forest-results";

import { TableDataSource } from "src/app/shared/components/table/models/table-datasource";
import { FarmForestTreeTableModel } from "./farm-forest-tree-table.model";
@Injectable({
  providedIn: "root",
})
export class FarmForestTreeTableService {
   
  private data:FarmForestTreeTableModel[] = FARM_TABLE_TREE_RESULTS_DATA;
  private data$: BehaviorSubject<FarmForestTreeTableModel[]>
  
  constructor() { 
    this.data$ = new BehaviorSubject<FarmForestTreeTableModel[]>(this.data)
  }
  
  public emitData(data: FarmForestTreeTableModel[]): void {
    this.data$.next(data);
  }
  
  public getDataObs(): Observable<FarmForestTreeTableModel[]> {
    
    return this.data$.asObservable()
  }
  
  
}
