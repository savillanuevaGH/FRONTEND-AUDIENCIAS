import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface Audiencia {
  CUIJ: number;
  caratula: string;
  tipo: number;
}

const AUDIENCIA_DATA: Audiencia[] = [
  {CUIJ: 1, caratula: 'Cara Tula', tipo: 1},
  {CUIJ: 2, caratula: 'Cara Tula', tipo: 2},
  {CUIJ: 3, caratula: 'Cara Tula', tipo: 1},
  {CUIJ: 1, caratula: 'Cara Tula', tipo: 1},
  {CUIJ: 2, caratula: 'Cara Tula', tipo: 2},
  {CUIJ: 3, caratula: 'Cara Tula', tipo: 1},
  {CUIJ: 1, caratula: 'Cara Tula', tipo: 1},
  {CUIJ: 2, caratula: 'Cara Tula', tipo: 2},
  {CUIJ: 3, caratula: 'Cara Tula', tipo: 1}
];

@Component({
  selector: 'app-tabla',
  standalone: false,
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css',
})
export class TablaComponent {
  displayedColumns: string[] = ['CUIJ', 'caratula', 'tipo', 'accion'];
  dataSource = new MatTableDataSource(AUDIENCIA_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
