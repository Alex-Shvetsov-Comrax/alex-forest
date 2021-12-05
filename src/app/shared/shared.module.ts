import { NgModule } from '@angular/core';
import { CoreModule } from './../core/core.module';

import { FormInputComponent } from './components/form/form-input/form-input.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { IconComponent } from './components/icon/icon.component';
import { TypographyComponent } from './components/typography/typography.component';
import { MenuComponent } from './components/menu/menu.component';

import { StatusComponent } from './components/status/status.component';
import { RootComponent } from './components/root/root.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarBottomComponent } from './components/navbar-bottom/navbar-bottom.component';

import { TableComponent } from './components/table/table.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ListComponent } from './components/list/list.component';
import { TitleComponent } from './components/title/title.component';

import { DataTableComponent } from './components/data-grid/data-table/data-table.component';
import { DataCellComponent } from './components/data-grid/data-cell/data-cell.component';
import { DataRowComponent } from './components/data-grid/data-row/data-row.component';

import { SpinnerComponent } from './components/spinner/spinner.component';

import { VariantDirective } from './directives/variant.directive';
import { SizeDirective } from './directives/size.directive';
import { ButtonDirective } from './directives/button.directive';
import { UnderlineDirective } from './directives/underline.directive';

import { AreaPipe } from './pipes/area.pipe';

import { ExpandPanelComponent } from './components/expand-panel/expand-panel.component';
import { FormComponent } from './components/form/form/form.component';
import { ColumnFilterComponent } from './components/columns/column-filter/column-filter.component';
import { FormGroupComponent } from './components/form/form-group/form-group.component';
import { FormRadioComponent } from './components/form/form-radio/form-radio.component';
import { LastUpdateComponent } from './components/last-update/last-update.component';
import { ColumnFormComponent } from './components/columns/column-form/column-form.component';

import { CardStatusComponent } from './components/cards/card-status/card-status.component';
import { CardWizardComponent } from './components/cards/card-wizard/card-wizard.component';
import { CardStepComponent } from './components/cards/card-step/card-step.component';
import { CardDashboardComponent } from './components/cards/card-dashboard/card-dashboard.component';
import { ColumnExpandComponent } from './components/columns/column-expand/column-expand.component';
import { ColumnsSelectComponent } from './components/columns/columns-select/columns-select.component';
import { FormAutocompleteComponent } from './components/form/form-autocomplete/form-autocomplete.component';
import { CardUserComponent } from './components/cards/card-user/card-user.component';
import { ColorDirective } from './directives/color.directive';
import { DrawerComponent } from './components/drawer/drawer.component';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { FormatPipe } from './pipes/format.pipe';
import { BorderDirective } from './directives/border.directive';
import { FormDateComponent } from './components/form/form-date/form-date.component';
import { LayoutComponent } from './screens/layout/layout.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { FormInputUploadComponent } from './components/form/form-input-upload/form-input-upload.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { TableFiltersComponent } from './components/table/table-filters/table-filters.component';
import { IconDrawerComponent } from './components/icon-drawer/icon-drawer.component';
import { TableActionsComponent } from './components/table/table-actions/table-actions.component';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';
import { KklFormUploadComponent } from './components/kkl-form-upload/kkl-form-upload.component';
import { RangePipe } from './pipes/range.pipe';
import { FormCurrencyComponent } from './components/form/form-currency/form-currency.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { OutsideDirective } from './directives/outside.directive';
import { DialogComponent } from './components/dialog/dialog.component';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MAT_DIALOG_DATA,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddProductionProcessHeaderComponent } from './components/add-production-process-header/add-production-process-header.component';
import { CardFilterComponent } from './components/cards/card-filter/card-filter.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';

@NgModule({
  declarations: [
    RootComponent,
    FormComponent,
    FormGroupComponent,
    FormDateComponent,
    FormInputComponent,
    FormRadioComponent,
    FormAutocompleteComponent,
    StepperComponent,
    IconComponent,
    TypographyComponent,
    NavbarComponent,
    NavbarBottomComponent,
    MenuComponent,
    MenuItemComponent,
    TableComponent,
    PaginationComponent,
    ColumnFilterComponent,
    ColumnFormComponent,
    ColumnExpandComponent,
    ListComponent,
    ListItemComponent,
    TitleComponent,
    DataTableComponent,
    DataCellComponent,
    DataRowComponent,
    StatusComponent,
    SpinnerComponent,
    ExpandPanelComponent,
    SizeDirective,
    ButtonDirective,
    VariantDirective,
    ColorDirective,
    AreaPipe,
    SvgIconComponent,
    LastUpdateComponent,
    CardStatusComponent,
    CardWizardComponent,
    CardStepComponent,
    CardDashboardComponent,
    CardUserComponent,
    DrawerComponent,
    FormatPipe,
    RangePipe,
    ColumnsSelectComponent,
    UnderlineDirective,
    BorderDirective,
    FormDateComponent,
    LayoutComponent,
    FormInputUploadComponent,
    AdvancedSearchComponent,
    TableFiltersComponent,
    IconDrawerComponent,
    TableActionsComponent,
    UploadButtonComponent,

    KklFormUploadComponent,
    SidenavComponent,
    FormCurrencyComponent,
    OutsideDirective,
    DialogComponent,
    DashboardComponent,
    AddProductionProcessHeaderComponent,
    CardFilterComponent,
    PageFooterComponent,
  ],
  imports: [CoreModule],
  providers: [
    FormatPipe,
    AreaPipe,
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: new MatDialogConfig(),
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    },
  ],

  exports: [
    CoreModule,
    DrawerComponent,
    FormDateComponent,
    SvgIconComponent,
    RootComponent,
    FormComponent,
    FormInputComponent,
    StepperComponent,
    NavbarComponent,
    NavbarBottomComponent,
    MenuComponent,
    MenuItemComponent,
    CardStatusComponent,
    CardWizardComponent,
    CardStepComponent,
    CardDashboardComponent,
    CardUserComponent,
    TableComponent,
    PaginationComponent,
    TitleComponent,
    TypographyComponent,
    StatusComponent,
    IconComponent,
    ExpandPanelComponent,
    SpinnerComponent,
    LastUpdateComponent,
    DataTableComponent,
    ListItemComponent,
    DataCellComponent,
    DataRowComponent,
    ListComponent,
    SizeDirective,
    VariantDirective,
    ButtonDirective,
    ColorDirective,
    AreaPipe,
    FormRadioComponent,
    FormatPipe,
    RangePipe,
    UnderlineDirective,
    FormAutocompleteComponent,
    BorderDirective,
    LayoutComponent,
    FormInputUploadComponent,
    AdvancedSearchComponent,
    TableFiltersComponent,
    IconDrawerComponent,
    TableActionsComponent,
    UploadButtonComponent,

    KklFormUploadComponent,
    FormCurrencyComponent,
    DialogComponent,
    DashboardComponent,
    AddProductionProcessHeaderComponent,
    CardFilterComponent,
    PageFooterComponent,

  ],
  entryComponents: [
    DialogComponent,
  ]
})
export class SharedModule {}
