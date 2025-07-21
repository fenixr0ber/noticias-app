import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoticiasListComponent } from './pages/noticias-list/noticias-list.component';
import { NoticiaDetalleComponent } from './pages/noticia-detalle/noticia-detalle.component';
import { NoticiaModalComponent } from './components/noticia-modal/noticia-modal.component';
import { ConfirmacionModalComponent } from './components/confirmacion-modal/confirmacion-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NoticiasListComponent,
    NoticiaDetalleComponent,
    NoticiaModalComponent,
    ConfirmacionModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
