import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  // se genera array para historial de las etiquetas
  private _historialEtiquetas: string[] = [];
  private apiKey: string = 'wVtABfpJzq2QKtUoCSHivJNQVlUtJKP9';
  private serviceUrl: string = "https://api.giphy.com/v1/gifs"

  //creamos un get para acceder al dato. Lo creamos como privado para evitar que se modifique el array accidentalmente. De hecho, utilizamos el spread (...) para evitar que se cree una referencia al dato al realizar el return.
  get historialEtiquetas(){
    return [...this._historialEtiquetas];
  }


  ordenarHistorial(etiqueta: string): void{
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

  //Este método filtarará la etiqueta llamando a ordenarHistorial, y creará una peticion get al servidor de gifs
  buscarEtiqueta(etiqueta: string){
    this.ordenarHistorial(etiqueta);

    const params = new HttpParams() //!Con esto podemos generar los parametros de un http. generará algo asi como ?api_key=wVtABfpJzq2QKtUoCSHivJNQVlUtJKP9&limit=10&q=(lo que entre por etiqueta)
                    .set('api_key', this.apiKey)
                    .set('limit', 10)
                    .set('q', etiqueta);

    //!Se realiza la peticion get con la url generada. El subscribe es para generar un observable. Un observable es un objeto en el cual a lo largo del tiempo, puede estar emitiendo diferentes valores. Nos subscribirnos a un observable para estar escuchando las emisiones que ese objeto está emitiendo
    this.http.get(`${ this.serviceUrl }/search`, { params }).subscribe(resp => {
      console.log(resp);

    });


  }

  constructor(private http: HttpClient) { }
}
