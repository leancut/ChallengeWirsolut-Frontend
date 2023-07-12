import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViajesService } from '../services/viajes.service';
import { NuevoViajeComponent } from '../nuevo-viaje/nuevo-viaje.component';


interface Viaje {
  destino: string;
  fecha: string;
  vehiculo: string;
}


@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent {
  viajes!: any[]; // Aquí deberías definir el tipo de datos correcto para tus viajes
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

  obtenerViajes() {
    this.viajesService.obtenerViajes().subscribe((data: any[]) => {
      this.viajes = data;
    });
  }

  abrirNuevoViaje() {
    // Aquí deberías implementar la lógica para abrir el popup de nuevo viaje
    const dialogRef = this.dialog.open(NuevoViajeComponent, {
      width: '600px', // Define el ancho del diálogo según tus necesidades
      data: { viajeService: this.viajesService }
    });
  }

  verDetalleViaje(viajeId: number) {
    // Aquí deberías implementar la lógica para ver el detalle de un viaje
  }

  eliminarViaje(viajeId: number) {
    // Aquí deberías implementar la lógica para eliminar un viaje
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
