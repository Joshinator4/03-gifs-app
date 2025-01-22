import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public listadoGifs: Gif[] = []

  // se genera array para historial de las etiquetas
  private _historialEtiquetas: string[] = [];
  private apiKey: string = 'wVtABfpJzq2QKtUoCSHivJNQVlUtJKP9';//esto es la clave generada de la aplicacion de giphy
  private serviceUrl: string = "https://api.giphy.com/v1/gifs"//esta es elprincipio de la url de giphy para buscar los gifs

  constructor(private http: HttpClient) {this.cargarLocalStorage() }


  //creamos un get para acceder al dato. Lo creamos como privado para evitar que se modifique el array accidentalmente. De hecho, utilizamos el spread (...) para evitar que se cree una referencia al dato al realizar el return.
  get historialEtiquetas(){
    return [...this._historialEtiquetas];
  }

  //! Este método cogerá el historial del localStorage que esta en JSON y se parsea al historial de etiquetas como array
  private cargarLocalStorage(){
    if(!localStorage.getItem('historial'))return;
    this._historialEtiquetas = JSON.parse(localStorage.getItem('historial')!)// LA ! INDICA QUE NO SERÁ NULL PORQUE YA LO HEMOS FILTRADO JUSTO ARRIBA EN ESTE METODO

    if(this._historialEtiquetas.length == 0)return; //Si el array no tiene etiquetas salimos
    this.buscarEtiqueta(this._historialEtiquetas[0]);//para que se muestre los gifs de la ultima búsqueda hacemos la llamada a buscarEtiquetas con la posicion0 del array de historialEtiquetas
  }


  ordenarHistorial(etiqueta: string): void{
    //* Primero elimino espacios en blanco en los extremos y se pasa todo a minúsculas
    etiqueta = etiqueta.trim().toLocaleLowerCase();

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

    this.almacenarLocalStorage();
  }

  //Este método filtarará la etiqueta llamando a ordenarHistorial, y creará una peticion get al servidor de gifs
  buscarEtiqueta(etiqueta: string){
    //* Se filtra si la etiqueta recibida está vacía, si es así se pasa un mensaje de alerta y se hace el return para salir del método si ha entrado en este if.
    if(etiqueta == ""){
      window.alert("No se admiten busquedas vacías");
      return;
    }
    this.ordenarHistorial(etiqueta);

    const params = new HttpParams() //!Con esto podemos generar los parametros de un http. generará algo asi como ?api_key=wVtABfpJzq2QKtUoCSHivJNQVlUtJKP9&limit=10&q=(lo que entre por etiqueta)
                    .set('api_key', this.apiKey)
                    .set('limit', 10)
                    .set('q', etiqueta);

    //!Se realiza la peticion get con la url generada. El subscribe es para generar un observable. Un observable es un objeto en el cual a lo largo del tiempo, puede estar emitiendo diferentes valores. Nos subscribirnos a un observable para estar escuchando las emisiones que ese objeto está emitiendo
    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params }).subscribe(resp => {//*Se ha tipado el get indicandole el interfaz SearchResponse, para poder acceder a los datos con el resp y pasarselo al array de gifs listadoGifs
      this.listadoGifs = resp.data;
      console.log({gifs: this.listadoGifs});

    });

  }
  //! Este método es para guardar en el localStorage el historial de etiquetas en el formato json, ya que localstorage solo guarda strings
  private almacenarLocalStorage(){
    localStorage.setItem('historial', JSON.stringify(this._historialEtiquetas))//*stringyfy convierte el array a sting para guardarlo como un JSON
  }


}

