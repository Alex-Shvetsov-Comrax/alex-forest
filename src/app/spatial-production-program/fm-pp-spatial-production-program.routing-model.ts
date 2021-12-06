import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from '../shared/components/root/root.component';
import { SpaialProductionProgramComponent } from './components/spaial-production-program/spaial-production-program.component';

const routes: Routes = [
  {
    path: '',
    component: SpaialProductionProgramComponent,
    children: [
    //   {
    //     path: '',
    //     component: ProductionProcessComponent,
    //   },
    //   {
    //     path: 'add',
    //     component: AddProductionProcessComponent,
    //   },
    
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FMPPPSpatialProductionProgramRoutingModule {}
