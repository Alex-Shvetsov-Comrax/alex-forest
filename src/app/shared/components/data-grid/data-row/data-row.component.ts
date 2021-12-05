import { Component, Input, OnInit } from '@angular/core';
import { DataCellModel } from '../data-cell.model';

@Component({
  selector: 'app-data-row',
  templateUrl: './data-row.component.html',
  styleUrls: ['./data-row.component.scss']
})
export class DataRowComponent implements OnInit {

  @Input() row : DataCellModel[]
  @Input() cols: number;

  constructor() { }

  ngOnInit(): void {
  }

}
