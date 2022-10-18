import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from '../transportation/edit/edit.component';
import { ListRoutesComponent } from '../transportation/list-routes/list-routes.component';
import { ListVehiclesComponent } from '../transportation/list-vehicles/list-vehicles.component';
import { ListComponent } from '../transportation/list/list.component';
import { SchedulerComponent } from '../transportation/scheduler/scheduler.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'listVehicles',
        component: ListVehiclesComponent
      },
      {
        path: 'listRoutes',
        component: ListRoutesComponent
      },
      {
        path: 'scheduler',
        component: SchedulerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
