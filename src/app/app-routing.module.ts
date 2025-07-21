import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticiasListComponent } from './pages/noticias-list/noticias-list.component';
import { NoticiaDetalleComponent } from './pages/noticia-detalle/noticia-detalle.component';

const routes: Routes = [
  { path: '', component: NoticiasListComponent },
  { path: 'noticia/:id', component: NoticiaDetalleComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
