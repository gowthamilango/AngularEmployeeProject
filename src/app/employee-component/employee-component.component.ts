import { Component, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from ".././dialog/dialog.component"
  ;
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-employee-component',
  templateUrl: './employee-component.component.html',
  styleUrls: ['./employee-component.component.scss']
})
export class EmployeeComponentComponent {

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'address', 'email', 'gender', 'joiningDate', 'status', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private api: ApiService) {

  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
      }
    });
  }

  editEmployee(row: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
      }
    });
  }

  deleteEmployee(id: number) {
    this.api.deleteEmployee(id)
      .subscribe({
        next: (res) => {
          console.log(res.status);
          console.log("Employee deleted sucessfully");
          this.getAllEmployees();
        },
        error: (err) => {
          console.log("Error while deleting the employee")
        }
      })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllEmployees() {
    this.api.getEmployee()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.log("Error while fetching!!!")
        }
      })
  }

}
