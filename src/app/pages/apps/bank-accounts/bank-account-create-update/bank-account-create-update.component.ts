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
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BankAccountModel, DropDownModel } from '../bank-account.model';
import { MatSelectModule } from '@angular/material/select';
import { BankAccountService } from '../bank-account.service';

@Component({
  selector: 'vex-bank-account-create-update',
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
    MatCheckboxModule,
    MatSelectModule
  ],
  templateUrl: './bank-account-create-update.component.html',
  styleUrl: './bank-account-create-update.component.scss'
})
export class BankAccountCreateUpdateComponent implements OnInit {
  form = this.fb.group({
    supplierAccountID: [this.defaults?.supplierAccountID || ''],
    name: [
      this.defaults?.name || '',
      [Validators.required, Validators.minLength(3)]
    ],
    iban: [
      this.defaults?.iban || '',
      [Validators.required, Validators.maxLength(24), Validators.minLength(24)]
    ],
    bankID: [this.defaults?.bankID || '', [Validators.required]],
    accountNo: [
      this.defaults?.accountNo || '',
      [Validators.required, Validators.pattern('^[0-9]*$')]
    ],
    branch: [this.defaults?.branch || '', [Validators.required]],
    isDefault: this.defaults?.isDefault || false
  });

  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: BankAccountModel | undefined,
    private dialogRef: MatDialogRef<BankAccountCreateUpdateComponent>,
    private fb: FormBuilder,
    private bankAccountService: BankAccountService
  ) {}

  ngOnInit() {
    this.fetchBanks();
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as BankAccountModel;
    }

    this.form.patchValue(this.defaults);
  }

  banks?: DropDownModel[];

  fetchBanks() {
    this.bankAccountService.banks().subscribe((res) => {
      this.banks = res.data;
    });
  }

  save() {
    if (this.mode === 'create') {
      this.createBankAccount();
    } else if (this.mode === 'update') {
      this.updateBankAccount();
    }
  }

  createBankAccount() {
    delete this.form.value.supplierAccountID;
    const bankAccount = this.form.value;
    this.dialogRef.close(bankAccount);
  }

  updateBankAccount() {
    const bankAccount = this.form.value;

    if (!this.defaults) {
      throw new Error(
        'Bank Account ID does not exist, this bank account cannot be updated'
      );
    }

    this.defaults.supplierAccountID = bankAccount.supplierAccountID!;
    this.defaults.bankID = bankAccount.bankID!;
    this.defaults.name = bankAccount.name!;
    this.defaults.accountNo = bankAccount.accountNo!;
    this.defaults.iban = bankAccount.iban!;
    this.defaults.branch = bankAccount.branch!;
    this.defaults.isDefault = bankAccount.isDefault!;

    this.dialogRef.close(this.defaults);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }
}
