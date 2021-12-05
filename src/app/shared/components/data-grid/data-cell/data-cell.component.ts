import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-cell',
  templateUrl: './data-cell.component.html',
  styleUrls: ['./data-cell.component.scss']
})
export class DataCellComponent implements OnInit {

  @Input() label: string;
  @Input() type: string;
  @Input() isUnderline?: boolean;
  @Input() isBold?: boolean;
  @Input() value: string;
  @Input() size: number;

  public bold: number;
  public underline: string;

  constructor() {}

  ngOnInit(): void {
    this.type = this.type || 'text';
    this.bold = this.isBold ? 600 : 500;
    this.size = 1.4
  }

}
