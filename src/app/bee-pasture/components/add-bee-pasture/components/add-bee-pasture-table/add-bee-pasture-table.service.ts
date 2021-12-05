import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { mergeAll } from "rxjs/operators";
import { ADD_BEE_PASTURE_TABLE_DATA } from "src/app/mock_data/bee-pasture";

import { TableDataSource } from "src/app/shared/components/table/models/table-datasource";
import { AddBeePastureTableModel } from "./add-bee-pasture-table.model";
@Injectable({
  providedIn: "root",
})
export class AddBeePastureTableService {
    
  private data: AddBeePastureTableModel[] = ADD_BEE_PASTURE_TABLE_DATA;

  public dataSource: TableDataSource<AddBeePastureTableModel>;
  private selected$: BehaviorSubject<Observable<AddBeePastureTableModel[]>>;
  private data$: BehaviorSubject<AddBeePastureTableModel[]>;

  constructor() {
    this.selected$ = new BehaviorSubject<Observable<AddBeePastureTableModel[]>>(
      of([])
    );
    this.dataSource = new TableDataSource<AddBeePastureTableModel>([]);
    this.dataSource.load(this.data);
  }

  public emitSelected(selected: Observable<AddBeePastureTableModel[]>): void {
    this.selected$.next(selected);
  }

  public emitData(): void {
    //load new data
    this.dataSource.load(ADD_BEE_PASTURE_TABLE_DATA)
  }

  public getSelectedObs(): Observable<AddBeePastureTableModel[]> {
    return this.selected$.asObservable().pipe(mergeAll());
  }
}
