import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Noticia } from 'src/app/models/noticia.model';
import { NoticiaModalComponent } from 'src/app/components/noticia-modal/noticia-modal.component';
import { ConfirmacionModalComponent } from 'src/app/components/confirmacion-modal/confirmacion-modal.component';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-noticias-list',
  templateUrl: './noticias-list.component.html',
  styleUrls: ['./noticias-list.component.css']
})
export class NoticiasListComponent implements OnInit {
  noticias: Noticia[] = [];
  cargando = false;
  carouselIndex = 0;
  @ViewChild('carrusel', { static: false }) carrusel!: ElementRef;

  constructor(
    private noticiasService: NoticiasService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadNoticias();
  }

  loadNoticias() {
    this.cargando = true;
    setTimeout(() => {
      this.noticiasService.getNoticias().subscribe(n => {
        this.noticias = n;
        this.cargando = false;
      });
    }, 800);
  }

  abrirCrearModal() {
    const dialogRef = this.dialog.open(NoticiaModalComponent, {
      width: '500px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.noticiasService.crearNoticia(result);
        this.loadNoticias();
      }
    });
  }

  editar(noticia: Noticia) {
    const dialogRef = this.dialog.open(NoticiaModalComponent, {
      width: '500px',
      data: noticia
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.noticiasService.editarNoticia(result);
        this.loadNoticias();
      }
    });
  }

  eliminar(noticia: Noticia) {
    const dialogRef = this.dialog.open(ConfirmacionModalComponent, {
      width: '400px',
      data: `¿Eliminar la noticia "${noticia.titulo}"?`
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.noticiasService.eliminarNoticia(noticia.id);
        this.loadNoticias();
      }
    });
  }

  verDetalle(noticia: Noticia) {
    this.router.navigate(['/noticia', noticia.id]);
  }

  nextSlide() {
    if (this.carouselIndex < this.noticias.length - 1) {
      this.carouselIndex++;
    } else {
      this.carouselIndex = 0;
    }
  }

  prevSlide() {
    if (this.carouselIndex > 0) {
      this.carouselIndex--;
    } else {
      this.carouselIndex = this.noticias.length - 1;
    }
  }

  scrollCarrusel(direccion: 'left' | 'right') {
  const scrollAmount = 300;
  if (this.carrusel) {
    const elemento = this.carrusel.nativeElement;
    if (direccion === 'left') {
      elemento.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      elemento.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}
}
