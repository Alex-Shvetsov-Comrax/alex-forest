import { Component, Input, OnInit } from '@angular/core';
import { ListItem } from './list-item.model';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() public item: ListItem;
  @Input() padding: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
