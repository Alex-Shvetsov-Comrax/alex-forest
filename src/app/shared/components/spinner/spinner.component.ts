import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  @Input() color: ThemePalette = 'primary';
  @Input() mode: ProgressSpinnerMode = 'determinate';
  @Input() value;
  @Input() diameter;

  constructor() {}

  ngOnInit(): void {
    this.color = this.color || 'accent'
    this.mode = this.mode || 'determinate'
    this.value = this.value || 75
    this.diameter = this.diameter || 30
  }
}
