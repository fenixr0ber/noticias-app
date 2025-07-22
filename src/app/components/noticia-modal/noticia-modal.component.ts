import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Noticia } from 'src/app/models/noticia.model';
import { ConfirmacionModalComponent } from '../confirmacion-modal/confirmacion-modal.component';

@Component({
  selector: 'app-noticia-modal',
  templateUrl: './noticia-modal.component.html',
  styleUrls: ['./noticia-modal.component.css']
})
export class NoticiaModalComponent {
  form: FormGroup;
  guardando = false;

  constructor(
    public dialogRef: MatDialogRef<NoticiaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Noticia | null,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      id: [data?.id || null],
      titulo: [data?.titulo || '', Validators.required],
      resumen: [data?.resumen || '', Validators.required],
      contenido: [data?.contenido || '', Validators.required],
      autor: [data?.autor || '', Validators.required],
      fecha: [data?.fecha || new Date(), Validators.required],
      imagen: [data?.imagen || '', Validators.required]
    });
  }

  guardar() {
    if (this.form.valid) {
      this.guardando = true;

      setTimeout(() => {
        this.guardando = false;

        this.dialog.open(ConfirmacionModalComponent, {
          width: '400px',
          data: {
            mensaje: 'La noticia se creó correctamente.',
            soloInformativo: true
          }
        });

        this.dialogRef.close(this.form.value);
      }, 1500);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
