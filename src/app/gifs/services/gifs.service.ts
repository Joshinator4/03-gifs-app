import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  // se genera array para historial de las etiquetas
  private _historialEtiquetas: string[] = [];

  //creamos un get para acceder al dato. Lo creamos como privado para evitar que se modifique el array accidentalmente. De hecho, utilizamos el spread (...) para evitar que se cree una referencia al dato al realizar el return.
  get historialEtiquetas(){
    return [...this._historialEtiquetas];
  }

  //este método pone en la primera posicion del array la etiqueta recibida por parámetro
  buscarEtiqueta(etiqueta: string): void{
    this._historialEtiquetas.unshift(etiqueta);
    console.log(this.historialEtiquetas);
  }

  constructor() { }
}
