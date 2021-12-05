import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from '../shared/components/root/root.component';
import { FarmForestTreeTypeComponent } from './components/farm-forest-tree-type/farm-forest-tree-type.component';

const routes: Routes = [
  {
    path: '',
    component: FarmForestTreeTypeComponent,
    children: [
    //   {
    //     path: 'add',
    //     component: FarmForestComponent,
    //   },
    
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmForestTreeTypeRoutingModule {}
