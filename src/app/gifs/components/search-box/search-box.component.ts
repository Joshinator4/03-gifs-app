import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})

export class SearchBoxComponent {

  //esto es sin @ViewChild
  // buscarEtiqueta(nuevaEtiqueta: string): void{
  //   console.log(nuevaEtiqueta);

  // }



  @ViewChild('txtInputEtiqueta')//esto coge el valor de la etiqueta generada en el html #txtInputEtiqueta
  public inputEtiqueta!: ElementRef<HTMLInputElement>; //esto recibe el elemento que hay en el input del html
  //si no se pone la exclamación da error. la exclamación indica a angular que va a tener un valor si o si, por eso no hay que inicializarla
  buscarEtiqueta(): void{
    const nuevaEtiqueta = this.inputEtiqueta.nativeElement.value;
    console.log({nuevaEtiqueta});
  }
}
