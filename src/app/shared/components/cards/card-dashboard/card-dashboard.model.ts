import { ListItem } from 'src/app/shared/components/list-item/list-item.model';

export class CardDashboardModel implements ListItem {
  public label?: string;
  public path?: string;
  public svgUrl?: string;
  public size?: number;

  constructor(options: {
    label?: string;
    path?: string;
    svgUrl?: string;
    size?: number;
    isActive?: boolean;
  }) {
    this.label = options?.label;
    this.path = options?.path;
    this.svgUrl = options?.svgUrl;
    this.size = options?.size;

  }

}
