import { Component, OnInit } from '@angular/core';
import { Vehiculos } from 'src/app/shared/vehiculos';
import { DataService } from 'src/app/api/data.service';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formulario:FormGroup;
  marcas:any[];
  modelos:any[];
  ciudades:any[];
  idMarca: any;
  vehiculos: Vehiculos = new Vehiculos();

  constructor(public service: DataService, private builder: FormBuilder) {
    this.formulario = this.builder.group({
      id_MARCA: [''],
      id_MODELO: [''],
      pLACA: [''],
      id_CIUDAD: [''],
      pUERTAS: [''],
      fecha: new Date().toISOString()
    });
   }

  ngOnInit() {
        // Marcas
        this.service.getMarcas()
        .subscribe((x:any) => {
          this.marcas = x;
        },
        err => {
          console.log(err);
        });
    
        // Ciudades
        this.service.getCiudades()
        .subscribe((x:any) => {
          this.ciudades = x;
        },
        err => {
          console.log(err);
        });
  }

  obtMarcar(marca:number){
    console.log('aqui',marca);
    this.service.getModelos(marca)
    .subscribe((x:any) => {
      this.modelos = x;
    });
  }
  // Registrar
  register(value) {
    console.log(value);
    this.vehiculos = this.formulario.value;
    console.log(this.vehiculos);
    this.service.postVehiculos(this.vehiculos)
    .subscribe(x =>{
      console.log('se guarda');
      // this.toast.success('Vehiculo registrado', 'Chispitas Car');
      this.vehiculos = new Vehiculos();
      console.log(this.vehiculos);
    },
    err => {
      console.log('no se guarda', err);
    })
  }
}
