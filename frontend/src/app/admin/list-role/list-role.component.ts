import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../../services/role.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
//Importa librerias de angular para paginar, organizar y colocar tablas
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css'],
})
export class ListRoleComponent implements OnInit {
  //variable de las columnas
  displayedColumns: string[] = ['NAME', 'DESCRIPTION', 'ACTIONS'];
  //Informacion que tendra la tabla
  dataSource: MatTableDataSource<any>;
  //permite paginar y organizar los roles
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  //MatSort metodo de organizacion
  //NOTA: NO funciona el metodo ordenar
  sort: MatSort = new MatSort();
  roleData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _roleService: RoleService,
    private _snackBar: MatSnackBar
  ) {
    this.roleData = {};
    //Coloca la informacion de roleData en la tabla y es almacenada en una variable
    this.dataSource = new MatTableDataSource(this.roleData);
  }

  //Metodo que inicia mostrando la lista de roles
  ngOnInit(): void {
    //NOTA: Se mejoro la estructura del subscribe
    //y se obtiene el roleList para poder mostrar en la tabla
    this._roleService.listRole().subscribe({
      next: (v) => {
        this.roleData = v.roleList;
        this.dataSource = new MatTableDataSource(this.roleData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (e) => {
        this.message = e.error;
        this.openSnackBarError();
      },
    });
  }

  //Filtra por el nombre
  //Se cambia todo a minusculas para validar la informacion
  //trim() quita los espacios en blanco y saltos de linea
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; //obtiene lo escrito
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //Valida que exista un paginador, y si existe lo coloca en primera pagina (firstPage())
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'],
    });
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    });
  }
}
