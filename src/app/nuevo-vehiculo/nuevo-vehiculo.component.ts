import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ViajesService } from '../services/viajes.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

interface Vehiculo {
  id?: number;
  patente: string;
  tipo: string;
  marca: string;
}

@Component({
  selector: 'app-nuevo-vehiculo',
  templateUrl: './nuevo-vehiculo.component.html',
  styleUrls: ['./nuevo-vehiculo.component.css']
})
export class NuevoVehiculoComponent implements OnInit{

  obs: Subscription | undefined;
  vehiculoForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private viajesService: ViajesService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,

  ) {

    this.vehiculoForm = this.formBuilder.group({
      patente: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      marca: ['', [Validators.required]]
    });
  

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  submit() {

    if (this.vehiculoForm.status === 'VALID') {
      const data  = {
        patente: this.vehiculoForm.value.patente,
        tipo: this.vehiculoForm.value.tipo,
        marca: this.vehiculoForm.value.marca,
      };
      console.log(data);

    this.obs = this.viajesService
    .agregarVehiculo(data).subscribe((resp) => {
      this.mensajeExito('registrado');
      const dialogRef = this.dialog.closeAll();
      this.router.navigate(['add-vehiculo']);
      window.location.reload();
    }, (err)   => {
    }
    )
  }
    this.vehiculoForm.reset();
  }
  ngOnDestroy() {
    this.obs?.unsubscribe;
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
    this.router.navigate(["/add-vehiculo"]);
  });    
}
}
