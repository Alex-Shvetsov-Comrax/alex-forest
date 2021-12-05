import { Component, Input, OnInit } from '@angular/core';
import { ListItem } from '../list-item/list-item.model';
import { Palette } from 'src/styles/theme';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() model: Object;
  @Input() list: ListItem[];
  @Input() icon: {
    size?: number;
    color?: Palette;
  };
  @Input() padding: boolean = false;
  @Input() slots: {};

  constructor() { }
  ngOnInit(): void {
    this.list = this.setList(this.list);
    this.icon = this.icon || { size: 2, color: 'primary' };
  }

  private setList(list: ListItem[]): ListItem[] {
    return list.map((item: ListItem) => {

      const listItem = { ...item };

      if (this.model[item.key]) {
        listItem.value = item.value || this.model[item.key];
      }

      return listItem;
    });
  }
}
