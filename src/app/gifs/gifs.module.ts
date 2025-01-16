import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http'

import { HomePagesComponent } from './pages/home-pages/home-pages.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { CardListComponent } from './components/card-list/card-list.component';



@NgModule({
  declarations: [
    HomePagesComponent,
    SearchBoxComponent,
    CardListComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    HomePagesComponent
  ]
})
export class GifsModule { }
