import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViajesComponent } from './viajes/viajes.component';
import { AddVehiculoComponent } from './add-vehiculo/add-vehiculo.component';

const routes: Routes = [
  {
    path:'viajes',
    component:ViajesComponent
  },
  {
    path: 'add-vehiculo',
    component: AddVehiculoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
