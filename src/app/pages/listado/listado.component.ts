import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/api/data.service';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  detalles:any[];

  constructor(private service: DataService) { }

  ngOnInit() {
    this.service.getAutos()
    .subscribe((x:any) => {
      this.detalles = x;
    },
    err => {
      console.log(err);
    });
  }

}
