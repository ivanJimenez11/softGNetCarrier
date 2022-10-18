import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { ListComponent } from './transportation/list/list.component';
import { EditComponent } from './transportation/edit/edit.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MainModule } from './main/main.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiClient } from './api/api-client';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule, 
  ],
  providers: [HttpClientModule,ApiClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
