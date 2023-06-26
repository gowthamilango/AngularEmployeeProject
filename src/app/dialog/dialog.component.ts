import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  createEmployeeForm !: FormGroup;
  actionBtn: string = "Save"

  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  Firstname: any = "";
  ngOnInit(): void {
    this.createEmployeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      eMail: ['', Validators.required],
      gender: ['', Validators.required],
      date: ['', Validators.required],
      employeeStatus: ['', Validators.required]

    })

    if (this.editData) {
      this.actionBtn = "Update";
      this.createEmployeeForm.controls['firstName'].setValue(this.editData.firstName);
      this.createEmployeeForm.controls['lastName'].setValue(this.editData.lastName);
      this.createEmployeeForm.controls['phone'].setValue(this.editData.phone);
      this.createEmployeeForm.controls['address'].setValue(this.editData.address);
      this.createEmployeeForm.controls['eMail'].setValue(this.editData.eMail);
      this.createEmployeeForm.controls['gender'].setValue(this.editData.gender);
      this.createEmployeeForm.controls['date'].setValue(this.editData.date);
      this.createEmployeeForm.controls['employeeStatus'].setValue(this.editData.employeeStatus);
    }
  }

  addEmployee() {
    if (!this.editData) {
      if (this.createEmployeeForm.valid) {
        this.api.postEmployee(this.createEmployeeForm.value)
          .subscribe({
            next: (res) => {
              alert("Employee added successfully")
              this.createEmployeeForm.reset();
              this.dialogRef.close(true);
            },
            error: () => {
              alert("Error while creating the employee")
              this.dialogRef.close(false);
            }
          })
      }
    }
    else {
      this.updateEmployee()
    }
  }

  updateEmployee() {
    this.api.putEmployee(this.createEmployeeForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Employee updated successfully");
          this.createEmployeeForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating")
        }
      })
  }

}
