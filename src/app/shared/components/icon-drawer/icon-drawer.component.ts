import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-icon-drawer',
  templateUrl: './icon-drawer.component.html',
  styleUrls: ['./icon-drawer.component.scss']
})
export class IconDrawerComponent implements OnInit {

  @Output() public printClick: EventEmitter<any> = new EventEmitter();
  @Output() public infoClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
