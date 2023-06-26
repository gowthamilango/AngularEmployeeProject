import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { EmployeeComponentComponent } from './employee-component/employee-component.component';
import { ReportsComponentComponent } from './reports-component/reports-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {path:'', component: AppComponent},
  {path:'dashboard', component: DashboardComponentComponent},
  {path:'employee', component: EmployeeComponentComponent},
  {path:'reports', component: ReportsComponentComponent},
];

@NgModule({

  exports: [RouterModule],
  declarations: [
    AppComponent,
    DashboardComponentComponent,
    EmployeeComponentComponent,
    ReportsComponentComponent,
    DialogComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    [RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule

  ]
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
