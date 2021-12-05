import { Injectable } from '@angular/core';
import { MenuModel } from './menu.model';
import { ListItemKeys } from '../list-item/list-item.model';
import { MenuItemModel } from '../menu-item/menu-item.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menu: MenuModel[] = [
    {
      label: 'ראשי',
      prefix: 'small-contracts',
      links: [
        new MenuItemModel({ label: 'התקשרויות קטנות', path: 'small-contracts' }),
        new MenuItemModel({ label: 'הרמת תקשורת חדשה', path: 'create-new-contract/details' }),
        new MenuItemModel({ label: 'הליכים קיימים', path: 'existing-procedures' }),
        new MenuItemModel({ label: 'בדיקת ספקים', path: 'supplier-check' }),
        new MenuItemModel({ label: 'דוחות', path: 'loyer' }),
      ],
    },

  ];

  private modulePrefix: string;

  constructor() {}

  public getMenu() {
    return [...this.menu];
  }

  public getPrefix(): string {
    return this.modulePrefix;
  }

  public setPrefix(modulePrefix: string) {
    this.modulePrefix = modulePrefix;
  }

  // METHODS TO HANDLE ACTIVE STEP STATUS
  private activeStep(items: MenuItemModel[], key: ListItemKeys, value: any) {
    items.find((item) => {
      if (item[key] === value) {
        item.active();
      }
    });
  }

  private unactiveStep(items: MenuItemModel[]) {
    items.find((item) => {
      if (item.isActive) {
        item.unactive();
      }
    });
  }

  public setSteps(
    items: MenuItemModel[],
    key: ListItemKeys,
    value: string
  ): MenuItemModel[] {
    this.unactiveStep(items);
    this.activeStep(items, key, value);
    return [...items];
  }

  public setList(
    menu: MenuModel[],
    key: ListItemKeys,
    value: string
  ): MenuModel[] {
    const updateMenu = [...menu];
    updateMenu.find((list) => {
      console.log(this.modulePrefix);
      if (list.prefix === this.modulePrefix) {
        list.links = this.setSteps(list.links, key, value);
      }
    });
    return updateMenu;
  }
  public setMenu(
    menu: MenuModel[],
    modulePrefix: string,
    key: ListItemKeys,
    value: string
  ): MenuModel[] {
    const updateMenu = [...menu];
    updateMenu.find((list) => {
      if (list.prefix === modulePrefix) {
        list.links = this.setSteps(list.links, key, value);
      }
    });
    return updateMenu;
  }

  public findList(key: string, value: string): MenuModel {
    return {
      ...this.getMenu().find((list: MenuModel) => list[key] === value),
    };
  }
}
