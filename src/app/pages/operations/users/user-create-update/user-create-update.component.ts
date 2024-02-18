import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UserModel } from '../user.model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'vex-user-create-update',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    NgIf,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    MatSlideToggleModule,
    MatCheckboxModule
  ],
  templateUrl: './user-create-update.component.html',
  styleUrl: './user-create-update.component.scss'
})
export class UserCreateUpdateComponent implements OnInit {
  form = this.fb.group({
    supplierContactID: [this.defaults?.supplierContactID || ''],
    fullname: [
      this.defaults?.fullName || '',
      [Validators.required, Validators.minLength(3)]
    ],
    mobile: [
      this.defaults?.mobile || '',
      [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern('(05)[0-9 ]{8}')
      ]
    ],
    email: [
      this.defaults?.email || '',
      [Validators.required, Validators.email]
    ],
    address: [this.defaults?.address || '', [Validators.required]],
    isActive: this.defaults?.isActive || false,
    isAccountManager: this.defaults?.isAccountManager || false
  });

  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: UserModel | undefined,
    private dialogRef: MatDialogRef<UserCreateUpdateComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as UserModel;
    }

    this.form.patchValue(this.defaults);
  }

  save() {
    if (this.mode === 'create') {
      this.createUser();
    } else if (this.mode === 'update') {
      this.updateUser();
    }
  }

  createUser() {
    delete this.form.value.supplierContactID;
    const user = this.form.value;
    this.dialogRef.close(user);
  }

  updateUser() {
    const user = this.form.value;

    if (!this.defaults) {
      throw new Error(
        'Contact ID does not exist, this contact cannot be updated'
      );
    }

    user.supplierContactID = this.defaults.supplierContactID;

    this.dialogRef.close(user);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
