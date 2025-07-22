import { Injectable } from '@angular/core';
import { Noticia } from '../models/noticia.model';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NoticiaModalComponent } from '../components/noticia-modal/noticia-modal.component';
import { ConfirmacionModalComponent } from '../components/confirmacion-modal/confirmacion-modal.component';


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
    },
    {
      id: 5,
      titulo: 'Innovaciones en IA para el 2025',
      resumen: 'La inteligencia artificial evoluciona con nuevas aplicaciones en salud y educación.',
      contenido: 'Los desarrollos recientes en IA están revolucionando sectores clave como medicina personalizada y plataformas educativas inteligentes.',
      autor: 'Carla Gómez',
      fecha: new Date('2024-06-01'),
      imagen: 'https://picsum.photos/id/1050/800/400'
    },
    {
      id: 6,
      titulo: 'Angular lanza su versión 18',
      resumen: 'Nuevas herramientas y mejoras en performance marcan esta versión del framework.',
      contenido: 'La versión 18 incluye mejoras en renderizado y soporte de signals, facilitando la reactividad de las aplicaciones.',
      autor: 'Luis Ramírez',
      fecha: new Date('2024-06-15'),
      imagen: 'https://picsum.photos/id/1025/800/400'
    },
    {
      id: 7,
      titulo: 'Tecnologías sostenibles: el futuro es verde',
      resumen: 'El crecimiento de startups enfocadas en energías limpias no se detiene.',
      contenido: 'Las inversiones en energías renovables y transporte sostenible lideran el mercado tecnológico del 2025.',
      autor: 'Ana Martínez',
      fecha: new Date('2024-07-02'),
      imagen: 'https://picsum.photos/id/1003/800/400'
    },
    {
      id: 8,
      titulo: 'Ciberseguridad en la era post-digital',
      resumen: 'Los ataques crecen y las soluciones también: blockchain, IA y nuevos marcos legales.',
      contenido: 'La ciberseguridad avanza con tecnologías más inteligentes y regulaciones más estrictas para proteger los datos.',
      autor: 'Federico Silva',
      fecha: new Date('2024-07-10'),
      imagen: 'https://picsum.photos/id/1039/800/400'
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

  mostrarConfirmacion(mensaje: string) {
  this.dialog.open(ConfirmacionModalComponent, {
    width: '400px',
    data: {
      mensaje: mensaje,
      soloInformativo: true
    }
  });
}

  constructor(private dialog: MatDialog) { }

  abrirModalEdicion(noticia: Noticia) {
    const dialogRef = this.dialog.open(NoticiaModalComponent, {
      width: '600px',
      data: { ...noticia }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editarNoticia(result);
        this.mostrarConfirmacion('La noticia se editó correctamente');
      }
    });

    return dialogRef;
  }


  abrirModalEliminacion(noticia: Noticia, callback?: () => void) {
    const dialogRef = this.dialog.open(ConfirmacionModalComponent, {
      width: '400px',
      data: {
        mensaje: `¿Estás seguro de que querés eliminar la noticia "${noticia.titulo}"?`
      }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.eliminarNoticia(noticia.id);
        if (callback) callback();
      }
    });
  }

}


