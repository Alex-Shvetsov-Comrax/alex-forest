import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from '../shared/components/root/root.component';
import { ForestryManagementsDashboardComponent } from './components/forestry-managements-dashboard/forestry-managements-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: '',
        component: ForestryManagementsDashboardComponent,
      },
      {
        path: 'production-process',
        loadChildren: () => import('../fm-production-process/fm-production-process.module').then(
            (m) => m.FMProductionProcessModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForestryManagementRoutingModule {}
