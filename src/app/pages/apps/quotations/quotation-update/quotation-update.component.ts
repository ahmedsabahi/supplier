import { TextFieldModule } from '@angular/cdk/text-field';
import {
  AsyncPipe,
  CommonModule,
  Location,
  NgFor,
  NgIf,
  formatDate
} from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { VexPageLayoutHeaderDirective } from '@vex/components/vex-page-layout/vex-page-layout-header.directive';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { PageLayoutDemoComponent } from 'src/app/pages/ui/page-layouts/page-layout-demo/page-layout-demo.component';
import { QuotationService } from '../quotation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ItemModel, QuotationModel } from '../quotation.model';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { FileModel } from 'src/app/core/models/api-response.model';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ItemCreateUpdateComponent } from '../item-create-update/item-create-update.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'vex-quotation-update',
  standalone: true,
  animations: [fadeInUp400ms, fadeInRight400ms, scaleIn400ms, stagger40ms],
  imports: [
    VexPageLayoutComponent,
    VexPageLayoutHeaderDirective,
    VexPageLayoutContentDirective,
    PageLayoutDemoComponent,
    MatIconModule,
    TranslateModule,
    CommonModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatRippleModule,
    TextFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    NgIf,
    MatAutocompleteModule,
    NgFor,
    MatDatepickerModule,
    MatSliderModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTooltipModule,
    AsyncPipe,
    MatFormFieldModule,
    MatDialogModule,
    CommonModule,
    SweetAlert2Module,
    MatDividerModule
  ],
  templateUrl: './quotation-update.component.html',
  styleUrl: './quotation-update.component.scss'
})
export class QuotationUpdateComponent implements OnInit {
  dataSource = new MatTableDataSource<QuotationModel>();

  @Input()
  displayedColumns: string[] = [
    'productName',
    'qty',
    'unitName',
    'price',
    'isVATExcluded',
    'itemTotal',
    'actions'
  ];

  form = this.fb.group({
    supplierName: '',
    createdOn: '',
    createdByName: '',
    createdByEmail: '',
    createdByMobile: '',
    notes: '',
    supplierNotes: '',
    fileContent: '',
    fileContentType: '',
    fileName: '',
    deliveryFees: 0,
    itemsTotal: 0,
    vat: 0,
    total: 0,
    items: this.fb.array([])
  });

  selectedFile?: FileModel;
  quotation?: QuotationModel;

  constructor(
    public location: Location,
    private quotationService: QuotationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private translate: TranslateService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.fetchQuotation(params['id']);
    });
  }

  fetchQuotation(id: string) {
    this.quotationService.quotation(id).subscribe((res) => {
      this.quotation = res.data;
      this.dataSource.data = this.quotation?.items!;
      this.initForm();
    });
  }

  initForm() {
    this.form.patchValue({
      supplierName: this.quotation?.supplierName,
      createdOn: this.quotation?.createdOn
        ? formatDate(this.quotation!.createdOn!, 'dd/MM/yyyy', 'en-US')
        : '',
      createdByName: this.quotation?.createdByName,
      createdByEmail: this.quotation?.createdByEmail,
      createdByMobile: this.quotation?.createdByMobile,
      notes: this.quotation?.notes,
      supplierNotes: this.quotation?.supplierNotes,
      fileContent: this.quotation?.fileContent,
      fileContentType: this.quotation?.fileContentType,
      fileName: this.quotation?.fileName,
      deliveryFees: this.quotation?.deliveryFees,
      itemsTotal: this.quotation?.itemsTotal,
      vat: this.quotation?.vat,
      total: this.quotation?.total
    });
    this.updateItemsForm(this.quotation?.items!);
  }

  updateItemsForm(items: ItemModel[]) {
    this.form.setControl('items', this.fb.array([]));
    items.forEach((item) => {
      this.form.value.items?.push({
        supplierQuotationDetailID: item.supplierQuotationDetailID,
        supplierQuotationID: item.supplierQuotationID,
        supplierID: item.supplierID,
        productID: item.productID,
        productName: item.productName,
        item: item.item,
        unitID: item.unitID,
        unitName: item.unitName,
        qty: item.qty,
        price: item.price,
        isVATExcluded: item.isVATExcluded
      });
    });
  }

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
      this.quotation!.fileName = this.selectedFile.fileName;
      this.quotation!.fileContentType = this.selectedFile.fileContentType;
      this.quotation!.fileContent = this.selectedFile.fileContent;
    };
    reader.readAsDataURL(filePicked);
  }

  resetFile() {
    this.selectedFile = undefined;
    this.quotation!.fileName = '';
    this.quotation!.fileContentType = '';
    this.quotation!.fileContent = '';
    this.form.patchValue({
      fileName: '',
      fileContentType: '',
      fileContent: ''
    });
  }

  updateProduct(model: ItemModel) {
    this.dialog
      .open(ItemCreateUpdateComponent, {
        width: '50%',
        data: model,
        direction: this.translate.defaultLang === 'ar' ? 'rtl' : 'ltr'
      })
      .afterClosed()
      .subscribe((item: ItemModel) => {
        if (item) {
          const index = this.quotation?.items?.findIndex(
            (existingItem) =>
              existingItem.supplierQuotationDetailID ===
              item.supplierQuotationDetailID
          );
          this.quotation!.items![index!] = item;
          this.updateItemsForm(this.quotation?.items!);
          this.dataSource.data = this.quotation?.items!;
          this.updateTotal();
        }
      });
  }

  updateTotal() {
    let total = 0;
    let vat = 0;
    let deliveryFees = Number(this.form.value.deliveryFees) ?? 0;
    let vatPer = Number(this.quotation?.vatPer ?? 15) / 100;
    this.quotation?.items?.forEach((item) => {
      total += Number(item.qty!) * Number(item.price!);
      if (!item.isVATExcluded) {
        vat += Number(item.qty!) * Number(item.price!) * vatPer;
      }
    });
    this.form.patchValue({
      itemsTotal: total
    });
    vat += deliveryFees * vatPer;
    total += deliveryFees + vat;
    this.form.patchValue({
      total: total,
      vat: vat
    });
    this.quotation!.itemsTotal! = Number(this.form.value.itemsTotal);
    this.quotation!.deliveryFees! = deliveryFees;
    this.quotation!.vat = vat;
    this.quotation!.total = total;
  }

  update() {
    this.quotationService.update(this.quotation!).subscribe((res) => {
      if (res.status === 1) {
        this.snackbar.open(
          (this.translate.defaultLang === 'ar'
            ? res.messageAr
            : res.messageEn) ?? '',
          'ok'
        );
        this.location.back();
      }
    });
  }

  submit() {
    if (!this.quotation!.fileContent) {
      Swal.fire({
        icon: 'error',
        title: this.translate.instant('pleaseAttachFile')
      });
      return;
    }

    this.quotationService.submit(this.quotation!).subscribe((res) => {
      if (res.status === 1) {
        this.snackbar.open(
          (this.translate.defaultLang === 'ar'
            ? res.messageAr
            : res.messageEn) ?? '',
          'ok'
        );
        this.location.back();
      }
    });
  }

  isThereLowerPrice(isSubmit: boolean) {
    this.quotationService
      .isThereLowerPrice(this.quotation!)
      .subscribe((res) => {
        if (res.status === 1) {
          isSubmit ? this.submit() : this.update();
        } else {
          Swal.fire({
            icon: 'warning',
            title: this.translate.instant('areYouSureYouWantToContinue'),
            text:
              res.messageAr ??
              res.messageEn ??
              this.translate.instant('thereIsLowerPriceForSomeItems'),
            showCancelButton: true,
            confirmButtonText: this.translate.instant('yes')
          }).then((result) => {
            if (result.isConfirmed) {
              isSubmit ? this.submit() : this.update();
            }
          });
        }
      });
  }
}
