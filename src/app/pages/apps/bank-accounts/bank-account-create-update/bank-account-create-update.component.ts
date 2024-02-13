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
import { CommonModule, NgIf } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BankAccountModel } from '../bank-account.model';
import { MatSelectModule } from '@angular/material/select';
import { BankAccountService } from '../bank-account.service';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  DropDownModel,
  FileModel
} from 'src/app/core/models/api-response.model';

@Component({
  selector: 'vex-bank-account-create-update',
  standalone: true,
  animations: [scaleIn400ms, fadeInRight400ms],
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
    MatSnackBarModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatSelectModule,
    CommonModule
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
    isDefault: this.defaults?.isDefault || false,
    fileContent: this.defaults?.fileContent || '',
    fileContentType: this.defaults?.fileContentType || '',
    fileName: this.defaults?.fileName || ''
  });

  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: BankAccountModel | undefined,
    private dialogRef: MatDialogRef<BankAccountCreateUpdateComponent>,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
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
    const bA = this.form.value;

    if (!this.defaults) {
      throw new Error(
        'Bank Account ID does not exist, this bank account cannot be updated'
      );
    }
    console.log(bA);
    if (bA.supplierAccountID)
      this.defaults.supplierAccountID = bA.supplierAccountID!;
    if (bA.bankID) this.defaults.bankID = bA.bankID!;
    if (bA.name) this.defaults.name = bA.name!;
    if (bA.accountNo) this.defaults.accountNo = bA.accountNo!;
    if (bA.iban) this.defaults.iban = bA.iban!;
    if (bA.branch) this.defaults.branch = bA.branch!;
    this.defaults.isDefault = bA.isDefault!;
    if (bA.fileName) this.defaults.fileName = bA.fileName!;
    if (bA.fileContentType) this.defaults.fileContentType = bA.fileContentType!;
    if (bA.fileContent) this.defaults.fileContent = bA.fileContent!;

    this.dialogRef.close(this.defaults);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  selectedFile?: FileModel;

  onFileSelected(event: any): void {
    const filePicked = event.target.files[0];
    const max_size = 20971520;
    if (!filePicked) return;
    if (filePicked.size > max_size) {
      this.snackbar.open(
        'Maximum size allowed is ' + max_size / 1000 + 'Mb',
        'ok'
      );
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedFile = {
        fileName: filePicked.name,
        fileContentType: filePicked.type,
        size: filePicked.size / 1024,
        fileContent: e.target.result.split(',')[1]
      };
      this.form.patchValue(this.selectedFile);
    };
    reader.readAsDataURL(filePicked);
  }

  resetFile() {
    this.selectedFile = undefined;
    this.form.patchValue({
      fileName: '',
      fileContentType: '',
      fileContent: ''
    });
  }
}
