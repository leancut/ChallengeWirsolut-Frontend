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
  minDate!: string;
  maxDate!: string;

  constructor(private dialog: MatDialog, private viajeService: ViajesService) { 

  }

  ngOnInit() {
    this.viajeService.getVehiculo().subscribe(
      (response: Vehiculo[]) => {
        this.options = response;
      },
      (error: any) => {
        console.error('Error al obtener las opciones', error);
      }
    );
    const today = new Date();
    const limit = new Date();
    limit.setDate(today.getDate() + 10);
    
    this.minDate = this.formatDate(today);
    this.maxDate = this.formatDate(limit);

  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
  

  popupAbierto: boolean = true;

  cerrarPopup() {
    this.popupAbierto = false;
  }


  async agregarViaje(city: HTMLDataElement, fecha: HTMLInputElement, vehiculo: HTMLDataElement ) {
    console.log(fecha.valueAsNumber);
    try {
      this.data = await this.getWeatherData(city.value, fecha.valueAsNumber);

      console.log('Datos del clima:', this.data);
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
          const dialogRef = this.dialog.closeAll();
          this.popupAbierto = false;
    } catch (error) {
      console.error('Error al obtener los datos del clima', error);
    }
   
  }

  getWeatherData(city: string, fecha: number): Promise<any> {
    const timestampFormatoCompleto = `${fecha}`;

   const timestampEnMilisegundos = new Date(timestampFormatoCompleto).getTime();
    return new Promise((resolve, reject) => {
      this.viajeService.getClima(city, fecha).subscribe((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      });
    });
  }


  


}
