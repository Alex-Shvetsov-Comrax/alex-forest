import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'kkl-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  @Input() public title: string;
  @Input() public content: TemplateRef<any>;
  @Output() public closeEvent:EventEmitter<void> = new EventEmitter();

  constructor() { }

  close() {
   this.closeEvent.emit();
  }

  ngOnInit(): void {
  }
}
