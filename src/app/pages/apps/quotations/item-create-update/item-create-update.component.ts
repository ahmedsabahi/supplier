import { TextFieldModule } from '@angular/cdk/text-field';
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormControl,
  Validators
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

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
import { ItemModel } from '../quotation.model';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { DropDownModel } from 'src/app/core/models/api-response.model';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap
} from 'rxjs';
import { ProductPriceService } from '../../products-prices/product-price.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'vex-item-create-update',
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
    NgIf,
    MatAutocompleteModule,
    NgFor,
    MatDatepickerModule,
    MatSliderModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatDividerModule,
    MatDialogModule,
    AsyncPipe
  ],
  templateUrl: './item-create-update.component.html',
  styleUrl: './item-create-update.component.scss'
})
export class ItemCreateUpdateComponent implements OnInit {
  mode: 'create' | 'update' = 'update';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: ItemModel | undefined,
    private dialogRef: MatDialogRef<ItemCreateUpdateComponent>,
    private productPriceService: ProductPriceService,
    private quotationService: QuotationService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private snackbar: MatSnackBar
  ) {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.mode = 'create';
    }
  }

  ngOnInit(): void {
    if (!this.defaults) this.defaults = {} as ItemModel;

    this.fetchUnits();
    this.form.patchValue(this.defaults);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  units?: DropDownModel[];

  fetchUnits() {
    this.quotationService.units().subscribe((res) => {
      this.units = res.data;
    });
  }

  form = this.fb.group({
    supplierQuotationDetailID: [this.defaults?.supplierQuotationDetailID],
    supplierQuotationID: [this.defaults?.supplierQuotationID],
    supplierID: [this.defaults?.supplierID],
    item: [this.defaults?.item],
    productID: [this.defaults?.productID, Validators.required],
    productName: [this.defaults?.productName],
    unitID: [{ value: this.defaults?.unitID, disabled: this.isUpdateMode() }],
    unitName: [this.defaults?.unitName],
    qty: [
      { value: this.defaults?.qty, disabled: this.isUpdateMode() },
      Validators.required
    ],
    price: [this.defaults?.price, Validators.required],
    isVATExcluded: [
      {
        value: this.defaults?.isVATExcluded || false,
        disabled: this.isUpdateMode()
      }
    ]
  });

  productCtrl = new UntypedFormControl({
    value: {
      id: this.defaults?.productID,
      textAr: this.defaults?.productName,
      textEn: this.defaults?.productName
    },
    disabled: this.isUpdateMode()
  });

  products: DropDownModel[] = [];

  filteredProducts$ = this.productCtrl.valueChanges.pipe(
    startWith(''),
    filter((res) => {
      return res !== null && res.length >= 2;
    }),
    debounceTime(400),
    distinctUntilChanged(),
    switchMap((find) => {
      return this.productPriceService.products(find).pipe(
        map((res) => {
          return res.data;
        })
      );
    })
  );

  displayFn(product?: DropDownModel): string {
    return product?.textAr ?? product?.textEn ?? '';
  }

  save() {
    if (this.mode === 'create') {
      this.createProduct();
    } else if (this.mode === 'update') {
      this.updateProduct();
    }
  }

  createProduct() {
    const product = this.form.value;
    product.productID = this.productCtrl.value?.id;
    product.productName = this.productCtrl.value?.textAr;
    let unit = this.units?.find((u) => u.id === product.unitID);
    product.unitID = unit?.id;
    product.unitName = unit?.textAr;
    product.price = Number(product.price);
    product.qty = Number(product.qty);

    this.dialogRef.close(product);
  }

  updateProduct() {
    this.defaults!.price! = Number(this.form.value.price)!;

    if (!this.defaults) {
      throw new Error(
        'Product ID does not exist, this product cannot be updated'
      );
    }
    this.dialogRef.close(this.defaults);
  }
}
