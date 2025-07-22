import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion-modal',
  templateUrl: './confirmacion-modal.component.html',
  styleUrls: ['./confirmacion-modal.component.css']
})
export class ConfirmacionModalComponent implements OnInit {
  soloInformativo: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmacionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string, soloInformativo?: boolean }
  ) {}

  ngOnInit(): void {
    this.soloInformativo = !!this.data.soloInformativo;
  }

  confirmar() {
    this.dialogRef.close(true);
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
