import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from '../shared/components/root/root.component';
import { AddBeePastureComponent } from './components/add-bee-pasture/add-bee-pasture.component';
import { ResultsBeePastureComponent } from './components/results-bee-pasture/results-bee-pasture.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: 'add',
        component: AddBeePastureComponent,
      },
      {
        path: 'results',
        component: ResultsBeePastureComponent,
      },
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeePastureRoutingModule {}
