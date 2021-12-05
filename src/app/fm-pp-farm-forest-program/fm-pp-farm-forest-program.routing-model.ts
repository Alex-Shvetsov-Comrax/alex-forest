import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from '../shared/components/root/root.component';
import { FarmForestResultsComponent } from './components/farm-forest-results/farm-forest-results.component';
import { FarmForestComponent } from './components/farm-forest/farm-forest.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: 'add',
        component: FarmForestComponent,
      },
      {
        path: 'results',
        component: FarmForestResultsComponent,
      },
      {
        path:'trees',
        loadChildren:()=>import('../farm-forest-tree-type/farm-forest-tree-type.module').then((m)=>m.FarmForestTreeTypeModule)
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FMPPPFarmForestProgramRoutingModule {}
