import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorDefaultOptions } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NuevoVehiculoComponent } from '../nuevo-vehiculo/nuevo-vehiculo.component';
import { ViajesService } from '../services/viajes.service';

interface SearchResponse{
  data: Vehiculo[];
  pagination: MatPaginatorDefaultOptions;
  meta: Meta;
}

interface Vehiculo {
  id: number;
  patente: string;
  tipo: string;
  marca: string;
}

@Component({
  selector: 'app-add-vehiculo',
  templateUrl: './add-vehiculo.component.html',
  styleUrls: ['./add-vehiculo.component.css']
})
export class AddVehiculoComponent {
  vehiculos: Vehiculo[] = []
  nuevovehiculo: Vehiculo[] = [];

  constructor(private dialog: MatDialog, private viajesService: ViajesService,
    private router: Router,
    private _snackBar: MatSnackBar,) {}

  ngOnInit() {
    this.viajesService.getVehiculo()
    .subscribe(resp =>{
      this.vehiculos = resp;
    },
    error => {
    }
    )
  }

  abrirNuevoVehiculo() {
    const dialogRef = this.dialog.open(NuevoVehiculoComponent, {
      data: { viajeService: this.viajesService }
    });
  }


  agregarVehiculo(nuevoVehiculo: Vehiculo) {
    this.vehiculos.push(nuevoVehiculo);
    const dialogRef = this.dialog.closeAll();
    
  }
  mensajeExito(texto: string) {
    this._snackBar.open(`El vehiculo fue ${texto} con exito`,'', {
      duration: 4000,
      horizontalPosition: 'right',
    });
}

eliminarVehiculo(id: number) {

  this.viajesService.deleteVehiculo(id).subscribe(() => {
    this.mensajeExito('eliminado');      
    this.router.navigate(['add-vehiculo']);
    window.location.reload();
  });    
}
}
