import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  // se genera array para historial de las etiquetas
  private _historialEtiquetas: string[] = [];
  private apiKey: string = "wVtABfpJzq2QKtUoCSHivJNQVlUtJKP9";

  //creamos un get para acceder al dato. Lo creamos como privado para evitar que se modifique el array accidentalmente. De hecho, utilizamos el spread (...) para evitar que se cree una referencia al dato al realizar el return.
  get historialEtiquetas(){
    return [...this._historialEtiquetas];
  }


  buscarEtiqueta(etiqueta: string): void{
    //* Primero elimino espacios en blanco en los extremos y se pasa todo a minúsculas
    etiqueta = etiqueta.trim().toLocaleLowerCase();
    //* Se filtra si la etiqueta recibida está vacía, si es así se pasa un mensaje de alerta y se hace el return para salir del método si ha entrado en este if.
    if(etiqueta == ""){
      window.alert("No se admiten busquedas vacías");
      return;
    }
    //* Si no es vacía llega aquí y se filtra si la etiqueta ya existe en _historialEtiquetas. Si existe ya la etiqueta se filtran los elementos que no sean iguales a la etiqueta generando un nuevo array, tras esto tenemos un array sin la etiqueta dupplicada y se le inserta la etiqueta recibida en la primera posicion del array. Se hace return para salir del método si ha entrado en este if.
    if(this._historialEtiquetas.includes(etiqueta)){
      this._historialEtiquetas =  this._historialEtiquetas.filter((elemento) => elemento != etiqueta);
      console.log(this._historialEtiquetas);
      this._historialEtiquetas.unshift(etiqueta);
      return;
    }

    //* Si no es vacía ni la etiqueta está repetida, llega a este filtro, que, si el array ya tiene 10 posiciones, eliminará el último elemento e insertará la nueva etiqueta en la primera posición
    if(this._historialEtiquetas.length == 10){
      this._historialEtiquetas.splice(9,1);//tambien se puede usar pop()
    }
    //si llega aquí es porque hay 9 elementos o menos, por eso añade la etiqueta en la primera posición
    this._historialEtiquetas.unshift(etiqueta);
    console.log(this._historialEtiquetas);

  }

  constructor() { }
}
