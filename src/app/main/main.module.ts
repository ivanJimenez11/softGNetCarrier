import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { ListComponent } from '../transportation/list/list.component';
// import { AddComponent } from '../transportation/add/add.component';
import { EditComponent } from '../transportation/edit/edit.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { TopHeaderComponent } from '../top-header/top-header.component';
import { MainComponent } from '../main/main.component';
import { MainRoutingModule } from './main-routing.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ListVehiclesComponent } from '../transportation/list-vehicles/list-vehicles.component';
import { EditVehiclesComponent } from '../transportation/edit-vehicles/edit-vehicles.component';
import { ListRoutesComponent } from '../transportation/list-routes/list-routes.component';
import { EditRoutesComponent } from '../transportation/edit-routes/edit-routes.component';
import { MatSelectModule } from '@angular/material/select';
import { SchedulerComponent } from '../transportation/scheduler/scheduler.component';
import { EditSchedulerComponent } from '../transportation/edit-scheduler/edit-scheduler.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    ListComponent,
    EditComponent,
    TopHeaderComponent,
    ListVehiclesComponent,
    EditVehiclesComponent,
    ListRoutesComponent,
    EditRoutesComponent,
    SchedulerComponent,
    EditSchedulerComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule
  ]
})
export class MainModule { }
