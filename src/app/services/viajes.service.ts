import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatPaginatorDefaultOptions } from '@angular/material/paginator';
import { Meta } from '@angular/platform-browser';

interface SearchResponse{
  data: Vehiculo[];
  pagination: MatPaginatorDefaultOptions;
  meta: Meta;
}

interface Viaje {
    destino: string;
    fecha: string;
    vehiculo: string;
  }

  interface Vehiculo {
    id: number;
    patente: string;
    tipo: string;
    marca: string;
  }

@Injectable({
  providedIn: 'root'
})
export class ViajesService {
  private apiKey= 'fe94205b4e062aca3e9243e0277db2b2';
  private apiUrl = 'https://localhost:44371/api/Vehiculo'; // Reemplaza con la URL de la API para obtener los datos de viajes y el pronóstico del tiempo
  private viajes: Viaje[] = [];
  private vehiculo: Vehiculo[] = [];

  constructor(private http: HttpClient) {
  
  }

  // Método para obtener todos los viajes
  obtenerViajes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/viajes`);
  }

  getClima(city: string, fecha: number){
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q='+city+'&dt='+fecha+'&APPID='+this.apiKey);
  }
  

  getViajes(): Viaje[] {
    return this.viajes;
  }

  agregaVehiculo(vehiculo: Vehiculo) {
    this.vehiculo.push(vehiculo);
  }

  agregarViaje(viaje: Viaje) {
    this.viajes.push(viaje);
  }

  getVehiculo (): Observable<Vehiculo[]>{
    return this.http.get<Vehiculo[]>('https://localhost:44371/api/Vehiculo')
  }


  agregarVehiculo(data: any): Observable<any> {
    return this.http.post<any>('https://localhost:44371/api/Vehiculo', data)
  }

  deleteVehiculo(id: number): Observable<void> {
    return this.http.delete<void>('https://localhost:44371/api/Vehiculo/'+id);
  }
}
