import {AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AudienciasComponent } from '../audiencias/audiencias.component';

@Component({
  selector: 'app-tabla',
  standalone: false,
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['CUIJ', 'caratula', 'tipo', 'acciones'];
  dataSource = new MatTableDataSource(AUDIENCIA_DATA);
  expandedRow: Audiencias | null = null;

  filtros: { [key: string]: string } = {
    fecha: '',
    sala: '',   // Este campo no está presente en la interfaz, así que puedes eliminarlo si no lo necesitas.
    juez: '',   // Lo mismo aquí, si no lo tienes, puedes quitarlo.
    tipoCausa: ''
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {
    this.dataSource.filterPredicate = this.customFilter;
  }

  applyFilter(event: Event, filtro: string): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filtros[filtro] = filterValue.trim().toLowerCase();  // Actualizamos el filtro correspondiente

    // Aplicamos el filtro a la tabla
    this.dataSource.filter = JSON.stringify(this.filtros);  // Pasamos el objeto de filtros como cadena JSON
  }

  // Función personalizada para el filtrado
  customFilter = (data: Audiencias, filter: string): boolean => {
    const filterObj = JSON.parse(filter);  // Convertimos la cadena JSON a un objeto
    return (
      (!filterObj.fecha || data.fecha.toLowerCase().includes(filterObj.fecha)) &&
      (!filterObj.tipoCausa || data.tipo.toString().toLowerCase().includes(filterObj.tipoCausa))  // Ajustado para tipo (número)
    );
  };

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  openDialog(): void {
    const dialogRef = this.dialog.open(AudienciasComponent, {
      width: '300px',
      data: { CUIJ: '', caratula: '', tipo: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = [...this.dataSource.data, result];
      }
    });
  }

  editAudiencia(audiencia: Audiencias): void {
    const dialogRef = this.dialog.open(AudienciasComponent, {
      width: '300px',
      data: { ...audiencia } // Pasamos una copia del objeto para editar
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.data.findIndex(a => a.CUIJ === audiencia.CUIJ);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource.data = [...this.dataSource.data]; // Actualizar la tabla
        }
      }
    });
  }
  
  deleteAudiencia(audiencia: Audiencias): void {
    const confirmDelete = confirm(`¿Estás seguro de cancelar la audiencia con CUIJ ${audiencia.CUIJ}?`);
    if (confirmDelete) {
      this.dataSource.data = this.dataSource.data.filter(a => a.CUIJ !== audiencia.CUIJ);
    }
  }

  toggleRow(row: any) {
    this.expandedRow = this.expandedRow === row ? null : row;
  }
}


export interface Audiencias {
  CUIJ: number;
  caratula: string;
  tipo: number;
  fecha: string;
  horaInicio: string;
  duracion: number;
}

const AUDIENCIA_DATA: Audiencias[] = [
  { CUIJ: 556, caratula: 'Cara Tula 1', tipo: 3, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 209, caratula: 'Cara Tula 2', tipo: 4, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 284, caratula: 'Cara Tula 3', tipo: 3, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 881, caratula: 'Cara Tula 4', tipo: 2, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 740, caratula: 'Cara Tula 5', tipo: 4, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 251, caratula: 'Cara Tula 6', tipo: 2, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 843, caratula: 'Cara Tula 7', tipo: 3, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 588, caratula: 'Cara Tula 8', tipo: 3, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 252, caratula: 'Cara Tula 9', tipo: 2, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 169, caratula: 'Cara Tula 10', tipo: 1, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 930, caratula: 'Cara Tula 11', tipo: 3, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 272, caratula: 'Cara Tula 12', tipo: 1, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 299, caratula: 'Cara Tula 13', tipo: 1, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 467, caratula: 'Cara Tula 14', tipo: 2, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 717, caratula: 'Cara Tula 15', tipo: 2, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 191, caratula: 'Cara Tula 16', tipo: 2, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 470, caratula: 'Cara Tula 17', tipo: 1, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 283, caratula: 'Cara Tula 18', tipo: 3, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 483, caratula: 'Cara Tula 19', tipo: 4, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 584, caratula: 'Cara Tula 20', tipo: 3, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 379, caratula: 'Cara Tula 21', tipo: 3, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 874, caratula: 'Cara Tula 22', tipo: 2, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 887, caratula: 'Cara Tula 23', tipo: 4, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 885, caratula: 'Cara Tula 24', tipo: 1, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 },
  { CUIJ: 548, caratula: 'Cara Tula 25', tipo: 2, fecha: '2024-03-19', horaInicio: '10:00', duracion: 60 }
];
