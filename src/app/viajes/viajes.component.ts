import { Component, Pipe, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViajesService } from '../services/viajes.service';
import { NuevoViajeComponent } from '../nuevo-viaje/nuevo-viaje.component';


interface Viaje {
  destino: string;
  fecha: string;
  vehiculo: string;
}

@Pipe({
  name: 'capitalizarPrimeraLetra'
})
export class CapitalizarPrimeraLetraPipe implements PipeTransform {
  transform(cadena: string): string {
    return cadena.charAt(0).toUpperCase() + cadena.slice(1);
  }
}


@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})



export class ViajesComponent {
  viajes!: any[];
  filtroFecha!: string;
  filtroDestino!: string;
  filtroVehiculo!: string;
  nuevoViaje: Viaje[] = [];
  fechaInicio!: string | number | Date;
  fechaFin!: string | number | Date;

  
  constructor(private dialog: MatDialog, private viajesService: ViajesService) {}

  ngOnInit() {
    this.viajes = this.viajesService.getViajes();
  }


  abrirNuevoViaje() {
    const dialogRef = this.dialog.open(NuevoViajeComponent, {
      data: { viajeService: this.viajesService }
    });
  }



  eliminarViaje(viajeId: number) {
    const indice = this.viajes.indexOf(viajeId);
    if (indice !== -1) {
      this.viajes.splice(indice, 1);
  }
}


  agregarViaje(nuevoViaje: Viaje) {
    this.viajes.push(nuevoViaje);
    const dialogRef = this.dialog.closeAll();
  }
  
  filtrarViajes() {
    this.viajes = this.viajes.filter((viaje) => {
      const fechaViaje = new Date(viaje.fecha);
      const fechaInicio = new Date(this.fechaInicio);
      const fechaFin = new Date(this.fechaFin);

      return fechaViaje >= fechaInicio && fechaViaje <= fechaFin;
    });
  }
  
}
