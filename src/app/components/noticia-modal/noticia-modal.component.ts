import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Noticia } from 'src/app/models/noticia.model';

@Component({
  selector: 'app-noticia-modal',
  templateUrl: './noticia-modal.component.html',
  styleUrls: ['./noticia-modal.component.css']
})
export class NoticiaModalComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NoticiaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Noticia | null,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: [data?.id || null],
      titulo: [data?.titulo || '', Validators.required],
      resumen: [data?.resumen || '', Validators.required],
      contenido: [data?.contenido || '', Validators.required],
      autor: [data?.autor || '', Validators.required],
      fecha: [data?.fecha || new Date(), Validators.required]
    });
  }

  guardar() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
