import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViajesService } from '../services/viajes.service';
import { HttpClient } from '@angular/common/http';


interface Viaje {
  destino: string;
  fecha: string;
  vehiculo: string;
  clima:[]
}
interface Vehiculo {
  id: number;
  patente: string;
  tipo: string;
  marca: string;
}

@Component({
  selector: 'app-nuevo-viaje',
  templateUrl: './nuevo-viaje.component.html',
  styleUrls: ['./nuevo-viaje.component.css']
})
export class NuevoViajeComponent implements OnInit {
  nuevoViaje: Viaje = {
    destino: '',
    fecha: '',
    vehiculo: '',
    clima:[]
  };
  data: any;
  options: Vehiculo[] = []; 

  constructor(private dialog: MatDialog, private viajeService: ViajesService) { }

  ngOnInit() {
    this.viajeService.getVehiculo().subscribe(
      (response: Vehiculo[]) => {
        this.options = response;
      },
      (error: any) => {
        console.error('Error al obtener las opciones', error);
      }
    );
  }
  

  popupAbierto: boolean = true;

  cerrarPopup() {
    this.popupAbierto = false;
  }


  async agregarViaje(city: HTMLDataElement, fecha: HTMLInputElement, vehiculo: HTMLDataElement ) {
    try {
      this.data = await this.getWeatherData(city.value, fecha.valueAsNumber);
      // Continuar con el proceso después de recibir la respuesta de la API y guardar los datos en 'data'
      console.log('Proceso continuado');
      console.log('Datos del clima:', this.data);
      // Aquí puedes agregar la lógica para realizar acciones adicionales después de obtener los datos
    } catch (error) {
      console.error('Error al obtener los datos del clima', error);
    }
    this.nuevoViaje = {
      destino: city.value,
      fecha: fecha.value,
      vehiculo: vehiculo.value,
      clima: this.data
    };

    this.viajeService.agregarViaje(this.nuevoViaje);
    this.nuevoViaje = {
      destino: '',
      fecha: '',
      vehiculo: '',
      clima: []
    };
        // Cierra el popup estableciendo la variable de control en falso
        const dialogRef = this.dialog.closeAll();
        this.popupAbierto = false;
  }

  getWeatherData(city: string, fecha: number): Promise<any> {
    const timestampFormatoCompleto = `${fecha} 00:00:00`;

   const timestampEnMilisegundos = new Date(timestampFormatoCompleto).getTime();

    return new Promise((resolve, reject) => {
      this.viajeService.getClima(city, timestampEnMilisegundos).subscribe((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      });
    });
  }


  


}
