import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Noticia } from 'src/app/models/noticia.model';

@Component({
  selector: 'app-noticia-detalle',
  templateUrl: './noticia-detalle.component.html',
  styleUrls: ['./noticia-detalle.component.css']
})
export class NoticiaDetalleComponent implements OnInit, OnDestroy {
  noticia?: Noticia;
  esPantallaChica: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.noticiasService.getNoticia(id).subscribe(n => {
      if (!n) this.router.navigate(['/']);
      this.noticia = n;
    });

    this.verificarTamanioPantalla();
    window.addEventListener('resize', this.verificarTamanioPantalla);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.verificarTamanioPantalla);
  }

  verificarTamanioPantalla = () => {
    this.esPantallaChica = window.innerWidth <= 480;
  };

  volverAlListado() {
    this.router.navigate(['/']);
  }

  editarNoticia() {
    if (this.noticia) {
      const dialogRef = this.noticiasService.abrirModalEdicion(this.noticia);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.noticia = { ...result };
        }
      });
    }
  }

  eliminarNoticia() {
    if (this.noticia) {
      this.noticiasService.abrirModalEliminacion(this.noticia, () => {
        this.router.navigate(['/']);
      });
    }
  }
}
