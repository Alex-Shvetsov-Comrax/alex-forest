import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from '../shared/components/root/root.component';
import { AddProductionProcessComponent } from './components/add-production-process/add-production-process.component';
import { ProductionProcessStatusTableComponent } from './components/production-process-status-table/production-process-status-table.component';
import { ProductionProcessStatusComponent } from './components/production-process-status/production-process-status.component';
import { ProductionProcessComponent } from './components/production-process/production-process.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: '',
        component: ProductionProcessComponent,
      },
      {
        path: 'add',
        component: AddProductionProcessComponent,
      },
      {
        path: 'status',
        component: ProductionProcessStatusComponent,
      },
      {
        path: 'spatial',
        loadChildren: () =>
          import(
            '../fm-pp-spatial-production-program/fm-pp-spatial-production-program.module'
          ).then((m) => m.FmPpSpatialProductionProgramModule),
      },
      {
        path: 'farm-forest',
        loadChildren: () =>
          import(
            '../fm-pp-farm-forest-program/fm-pp-farm-forest-program.module'
          ).then((m) => m.FmPpFarmForestProgramModule),
      },
      {
        path: 'bee-pasture',
        loadChildren: () =>
          import(
            '../bee-pasture/bee-pasture.module'
          ).then((m) => m.BeePastureModule),
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FMProductionProccesRoutingModule {}
