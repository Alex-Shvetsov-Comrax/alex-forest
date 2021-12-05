import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import {
  CardStepModel,
  StepperDirection,
} from 'src/app/shared/components/cards/card-step/card-step.model';
import { IconModel } from 'src/app/shared/components/icon/icon.model';
import { MenuModel } from 'src/app/shared/components/menu/menu.model';
import { MenuService } from 'src/app/shared/components/menu/menu.service';
import { NavbarService } from 'src/app/shared/components/navbar/navbar.service';
import { LayoutService } from 'src/app/shared/screens/layout/layout.service';
import { RouterService } from 'src/app/shared/services/route.service';
import { ForestryLayoutService } from './forestry-layout.service';

@Component({
  selector: 'app-forestry-layout',
  templateUrl: './forestry-layout.component.html',
  styleUrls: ['./forestry-layout.component.scss'],
})
export class ForestryLayoutComponent implements OnInit, OnDestroy {
  @Input() public projectPrefix: string = 'forestry';

  private pathSubscription: Subscription;

  // NAVBAR SECTION
  private headers = {};
  public openIcon: string = 'treegradienttac';
  public logos: IconModel[];
  public showStatusPath: string[] = [this.projectPrefix];

  // WIZARD SECTION
  public steps$: Observable<CardStepModel[]>;
  public direction: StepperDirection = 'column';
  public hideWizardPath: string[] = ['results', this.projectPrefix];

  // MENU SECTION
  public menu$: Observable<MenuModel[]>;

  constructor(
    private menuService: MenuService,
    private navbarService: NavbarService,
    private layoutService: LayoutService,
    private routerService: RouterService,
    private forestryLayoutService: ForestryLayoutService
  ) {}

  // ROUTE METHODS SECTION
  private setCurrentPath() {
    const path = this.routerService.getCurrentPath();
    this.layoutService.emitCurrentPath(path);
  }

  ngOnInit(): void {
    this.setCurrentPath();
    this.setNavbar();
    this.steps$ = this.setWizard();
    this.menu$ = this.setMenu();
    this.subscribeToRouter();
  }

  ngOnDestroy(): void {
    if (this.pathSubscription) {
      this.pathSubscription.unsubscribe();
    }
  }

  private setNavbar() {
    this.navbarService.setHeaders(this.headers);
    this.navbarService.emitStatus(this.forestryLayoutService.status);
    this.navbarService.setHeadersObs(this.setHeaders());
    this.logos = this.forestryLayoutService.logos;
  }

  private setHeaders() {
    return this.routerService.getModulePrefixObs().pipe(
      distinctUntilChanged(),
      map((path: string) => this.headers[path])
    );
  }

  private subscribeToRouter() {
    this.pathSubscription = this.routerService
      .getLastPathObs()
      .subscribe((path: string) => {
        path === this.projectPrefix && this.navbarService.emitTitle(path);
        this.layoutService.emitCurrentPath(path);
        this.routerService.currentPath$.next(path);
      });
  }

  private setWizard() {
    return this.routerService.getModulePrefixObs().pipe(
      map((path: string) => {
        const steps = this.forestryLayoutService.getSteps();

        steps.map((step) => {
          if (step.isActive) {
            step.unactive();
          }
          if (step.path === path) {
            step.active();
          }
        });

        return steps;
      })
    );
  }

  private setMenu() {
    const modulePath$ = this.routerService.getModulePrefixObs();
    const lastPath$ = this.layoutService.getCurrentPathObs();

    return modulePath$.pipe(
      switchMap((modulePath: string) => {
        return lastPath$.pipe(
          map((path: string) => {
            const menu = this.menuService.setMenu(
              this.menuService.getMenu(),
              modulePath,
              'path',
              path
            );
            return menu;
          })
        );
      })
    );
  }

  public onChangeModule(step: CardStepModel) {
    const path: string = `${this.projectPrefix}/${step.path}`;
    this.routerService.navigate(path);
  }

  public onChangeMenu(path: string) {
    console.log(path);
    // path = `${this.projectPrefix}/${path}`;
    this.routerService.navigate(path);
  }
}
