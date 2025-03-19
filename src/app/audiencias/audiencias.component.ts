import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-audiencias',
  standalone: false,
  templateUrl: './audiencias.component.html',
  styleUrl: './audiencias.component.css'
})
export class AudienciasComponent {
  constructor(
    public dialogRef: MatDialogRef<AudienciasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.data);
  }
}
