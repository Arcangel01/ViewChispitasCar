import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Vehiculos } from '../shared/vehiculos';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private toast: ToastrService) { }

  URL = 'https://localhost:44326/api/autos/';

  // Metodo para traer las ciudades
  getCiudades() {
    return this.http.get(this.URL + 'ciudad')
     .pipe(tap(x => {
       console.log(x);
     }));
   }
   
   // Metodo para traer las marcas
   marcasServ: any[];
   getMarcas() {
    return this.http.get(this.URL + 'marcas')
    .pipe(tap(x => {
      console.log(x);
    }));
   }
 
     // Metodo para traer los modelos segun las marcas
     getModelos(cod:number) {
       return  this.http.get(this.URL + 'modelos/' + cod)
       .pipe(tap(x => {
         console.log(x);
       }));
     }
 
     // Metodo para traer los datos completos
     getAutos() {
       return this.http.get(this.URL + 'cars')
       .pipe(tap(x => {
         console.log(x);
       }));
     }
 
     // Registrar los vehiculos
     postVehiculos(detalles: Vehiculos) {
       return this.http.post<boolean>(this.URL + 'detalle', detalles)
       .pipe(tap(res => {
         this.toast.success('Vehiculo registrado', 'Chispitas Car');
       },
       err => {
         this.toast.error('No se logro registrar', 'Chispitas Car');
       }))
     }
}
