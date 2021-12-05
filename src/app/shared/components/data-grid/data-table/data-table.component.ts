import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataCellModel } from '../data-cell.model';
import { DataTable } from '../data-table.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {

  @Input() cols: number;
  @Input() rowCols: number;

  @Input() columns: DataCellModel[];
  @Input() row: DataCellModel[];
  @Input() data$: Observable<DataTable>;

  @Input() slots: {
    column: ElementRef;
    button: ElementRef;
    custom: ElementRef;
  };

  public data: DataCellModel[][];
  public colsSpan: string;
  public offsetSpan: string;

  constructor() {}

  ngOnInit(): void {
    this.subscribeToData();
  }

  private subscribeToData() {
    if (this.data$) {
      this.data$
        .pipe(
          map((data: DataTable) => {
            data.rows = data.rows.map((row) => this.formatData(row));
            return data;
          })
        )
        .subscribe((data: DataTable) => {
          this.data = data.rows;
          this.columns = data.columns;
        });
    }

  }

  private formatData(data: DataCellModel[]) {
    return data.map((item) => {
      return DataCellModel.create(item);
    });
  }
}
