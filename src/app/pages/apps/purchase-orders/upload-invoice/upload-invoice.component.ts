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
import { MatSelectModule } from '@angular/material/select';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FileModel } from 'src/app/core/models/api-response.model';
import { PurchaseOrderModel } from '../purchase-order.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { InvoiceStatus } from 'src/app/core/constants/enums';

@Component({
  selector: 'vex-upload-invoice',
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
    MatDatepickerModule,
    CommonModule
  ],
  templateUrl: './upload-invoice.component.html',
  styleUrl: './upload-invoice.component.scss'
})
export class UploadInvoiceComponent {
  form = this.fb.group({
    purchaseOrderID: [this.defaults?.purchaseOrderID || ''],
    purchaseOrderDetailID: [this.defaults?.purchaseOrderDetailID || ''],
    fileContent: '',
    fileContentType: '',
    fileName: '',
    invoiceDate: ['', Validators.required]
  });

  InvoiceStatus = InvoiceStatus;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: PurchaseOrderModel | undefined,
    private dialogRef: MatDialogRef<UploadInvoiceComponent>,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {}

  save() {
    this.dialogRef.close(this.form.value);
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
