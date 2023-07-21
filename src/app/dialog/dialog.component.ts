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
      email: ['', Validators.required],
      gender: ['', Validators.required],
      joiningDate: ['', Validators.required],
      status: ['', Validators.required]

    })

    if (this.editData) {
      this.actionBtn = "Update";
      this.createEmployeeForm.controls['firstName'].setValue(this.editData.firstName);
      this.createEmployeeForm.controls['lastName'].setValue(this.editData.lastName);
      this.createEmployeeForm.controls['phone'].setValue(this.editData.phone);
      this.createEmployeeForm.controls['address'].setValue(this.editData.address);
      this.createEmployeeForm.controls['email'].setValue(this.editData.email);
      this.createEmployeeForm.controls['gender'].setValue(this.editData.gender);
      this.createEmployeeForm.controls['joiningDate'].setValue(this.editData.joiningDate);
      this.createEmployeeForm.controls['status'].setValue(this.editData.status);
    }
  }

  addEmployee() {
    if (!this.editData) {
      if (this.createEmployeeForm.valid) {
        this.api.postEmployee(this.createEmployeeForm.value)
          .subscribe({
            next: (res) => {
              console.log("Employee added successfully")
              this.createEmployeeForm.reset();
              this.dialogRef.close(true);
            },
            error: () => {
              console.log("Error while creating the employee")
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
          console.log("Employee updated successfully");
          this.createEmployeeForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          console.log("Error while updating")
        }
      })
  }

}
