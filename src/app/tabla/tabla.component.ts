import {AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-tabla',
  standalone: false,
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['CUIJ', 'caratula', 'tipo'];
  dataSource = new MatTableDataSource(AUDIENCIA_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


export interface Audiencias {
  CUIJ: number;
  caratula: string;
  tipo: number;
}

const AUDIENCIA_DATA: Audiencias[] = [
  { CUIJ: 556, caratula: 'Cara Tula 1', tipo: 3 },
  { CUIJ: 209, caratula: 'Cara Tula 2', tipo: 4 },
  { CUIJ: 284, caratula: 'Cara Tula 3', tipo: 3 },
  { CUIJ: 881, caratula: 'Cara Tula 4', tipo: 2 },
  { CUIJ: 740, caratula: 'Cara Tula 5', tipo: 4 },
  { CUIJ: 251, caratula: 'Cara Tula 6', tipo: 2 },
  { CUIJ: 843, caratula: 'Cara Tula 7', tipo: 3 },
  { CUIJ: 588, caratula: 'Cara Tula 8', tipo: 3 },
  { CUIJ: 252, caratula: 'Cara Tula 9', tipo: 2 },
  { CUIJ: 169, caratula: 'Cara Tula 10', tipo: 1 },
  { CUIJ: 930, caratula: 'Cara Tula 11', tipo: 3 },
  { CUIJ: 272, caratula: 'Cara Tula 12', tipo: 1 },
  { CUIJ: 299, caratula: 'Cara Tula 13', tipo: 1 },
  { CUIJ: 467, caratula: 'Cara Tula 14', tipo: 2 },
  { CUIJ: 717, caratula: 'Cara Tula 15', tipo: 2 },
  { CUIJ: 191, caratula: 'Cara Tula 16', tipo: 2 },
  { CUIJ: 470, caratula: 'Cara Tula 17', tipo: 1 },
  { CUIJ: 283, caratula: 'Cara Tula 18', tipo: 3 },
  { CUIJ: 483, caratula: 'Cara Tula 19', tipo: 4 },
  { CUIJ: 584, caratula: 'Cara Tula 20', tipo: 3 },
  { CUIJ: 379, caratula: 'Cara Tula 21', tipo: 3 },
  { CUIJ: 874, caratula: 'Cara Tula 22', tipo: 2 },
  { CUIJ: 887, caratula: 'Cara Tula 23', tipo: 4 },
  { CUIJ: 885, caratula: 'Cara Tula 24', tipo: 1 },
  { CUIJ: 548, caratula: 'Cara Tula 25', tipo: 2 }
];
