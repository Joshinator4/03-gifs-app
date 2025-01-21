import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  constructor(private gifsService: GifsService){

  }

  recuperarEtiqueta(indice: number){
    this.gifsService.buscarEtiqueta(this.historialEtiquetas[indice])
  }

  get historialEtiquetas(): string[]{
    return this.gifsService.historialEtiquetas;
  }

}
