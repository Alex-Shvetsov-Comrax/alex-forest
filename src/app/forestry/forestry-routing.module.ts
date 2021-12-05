import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForestryDashboardComponent } from './components/forestry-dashboard/forestry-dashboard.component';
import { ForestryRootComponent } from './components/forestry-root/forestry-root.component';

const routes: Routes = [
  {
    path: '',
    component: ForestryRootComponent,
    children: [
      {
        path: '',
        component: ForestryDashboardComponent,
      },
      {
        path: 'forest-management',
        loadChildren: () => import('../forest-management/forest-management.module').then(
            (m) => m.ForestryManagementModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForestryRoutingModule {}
