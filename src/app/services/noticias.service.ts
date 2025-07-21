import { Injectable } from '@angular/core';
import { Noticia } from '../models/noticia.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private noticias: Noticia[] = [
  {
    id: 1,
    titulo: 'Noticia 1',
    resumen: 'Esta es la primera noticia. Un breve resumen de la misma.',
    contenido: 'Contenido completo de la noticia 1.',
    autor: 'Autor A',
    fecha: new Date('2024-04-24'),
    imagen: 'https://picsum.photos/id/1011/800/300'
  },
  {
    id: 2,
    titulo: 'Noticia 2',
    resumen: 'Resumen de la segunda noticia, que da una idea del contenido.',
    contenido: 'Contenido completo de la noticia 2.',
    autor: 'Autor B',
    fecha: new Date('2024-04-23'),
    imagen: 'https://picsum.photos/id/1022/800/300'
  },
  {
    id: 3,
    titulo: 'Noticia 3',
    resumen: 'Breve descripción de la tercera noticia que se muestra aquí.',
    contenido: 'Contenido completo de la noticia 3.',
    autor: 'Autor C',
    fecha: new Date('2024-04-22'),
    imagen: 'https://picsum.photos/id/1035/800/300'
  },
  {
    id: 4,
    titulo: 'Noticia 4',
    resumen: 'Aquí se presenta un resumen de la cuarta noticia.',
    contenido: 'Contenido completo de la noticia 4.',
    autor: 'Autor D',
    fecha: new Date('2024-04-21'),
    imagen: 'https://picsum.photos/id/1042/800/300'
  }
];



  getNoticias(): Observable<Noticia[]> {
    return of(this.noticias);
  }

  getNoticia(id: number): Observable<Noticia | undefined> {
    return of(this.noticias.find(n => n.id === id));
  }

  crearNoticia(noticia: Noticia) {
    noticia.id = this.noticias.length + 1;
    this.noticias.unshift(noticia);
  }

  editarNoticia(noticia: Noticia) {
    const index = this.noticias.findIndex(n => n.id === noticia.id);
    if (index !== -1) this.noticias[index] = noticia;
  }

  eliminarNoticia(id: number) {
    this.noticias = this.noticias.filter(n => n.id !== id);
  }
}
