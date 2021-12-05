

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { mergeAll } from 'rxjs/operators';
import { PRODUCTION_PROCESS_TABLE } from 'src/app/mock_data/production-process';
import { TableDataSource } from 'src/app/shared/components/table/models/table-datasource';
import { ProductionProcessTableModel } from './production-process-table.model';
ProductionProcessTableModel
@Injectable({
  providedIn: 'root'
})
export class ProductionProcessTableService {

  private data:ProductionProcessTableModel[] =PRODUCTION_PROCESS_TABLE;
  public dataSource: TableDataSource<ProductionProcessTableModel>;
  private selected$: BehaviorSubject<Observable<ProductionProcessTableModel[]>>;
  private data$: BehaviorSubject<ProductionProcessTableModel[]>

  constructor() { 
    this.selected$ = new BehaviorSubject<Observable<ProductionProcessTableModel[]>>(of([]));
    this.dataSource = new TableDataSource<ProductionProcessTableModel>([]);
    this.dataSource.load(this.data)
  }

  public emitSelected(selected: Observable<ProductionProcessTableModel[]>): void {
    this.selected$.next(selected);
  }

  public getSelectedObs(): Observable<ProductionProcessTableModel[]> {
    return this.selected$.asObservable().pipe(mergeAll());
  }
}
