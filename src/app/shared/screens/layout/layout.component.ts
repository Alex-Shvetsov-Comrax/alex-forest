import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IconModel } from '../../components/icon/icon.model';
import { LayoutService } from './layout.service';

@Component({
  selector: 'kkl-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @Input() public openIcon: string;
  @Input() public logos: IconModel[];
  @Input() public hideWizardPath: string[];
  @Input() public showStatusPath: string[];

  public currentPath$: Observable<string>;
  public wizard$: Observable<boolean>;
  public show$: Observable<boolean>;

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.currentPath$ = this.layoutService.getCurrentPathObs();
    this.show$ = this.handleState(this.showStatusPath);
    this.wizard$ = this.handleState(this.hideWizardPath);
  }

  private handleState(list: string[]) {
    return this.currentPath$.pipe(
      map((path: string) => {
        return this.findPath(list, path);
      })
    );
  }

  private findPath(list: any[], value: string): boolean {
    return !!list.find((path: string) => path == value);
  }
}
