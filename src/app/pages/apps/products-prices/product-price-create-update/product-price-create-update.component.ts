import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormControl,
  Validators
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap
} from 'rxjs/operators';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component';
import { ProductPriceModel } from '../product-price.model';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { ProductPriceService } from '../product-price.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { DropDownModel } from 'src/app/core/models/api-response.model';

@Component({
  selector: 'vex-product-price-create-update',
  standalone: true,
  imports: [
    VexSecondaryToolbarComponent,
    VexBreadcrumbsComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
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
    AsyncPipe,
    ReactiveFormsModule,
    MatDialogModule,
    MatMenuModule,
    MatDividerModule,
    TranslateModule
  ],
  templateUrl: './product-price-create-update.component.html',
  styleUrl: './product-price-create-update.component.scss'
})
export class ProductPriceCreateUpdateComponent implements OnInit {
  form = this.fb.group({
    productPriceID: [
      this.defaults?.productPriceID || '',
      [Validators.required]
    ],
    productID: [this.defaults?.productID || '', [Validators.required]],
    price: [this.defaults?.price || '', [Validators.required]],
    skuNumber: [this.defaults?.skuNumber || '', [Validators.required]],
    expiryDate: [this.defaults?.expiryDate || '', [Validators.required]],
    isFixedPrice: this.defaults?.isFixedPrice || false,
    description: [this.defaults?.description || '']
  });

  mode: 'create' | 'update' = 'create';

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: ProductPriceModel | undefined,
    private dialogRef: MatDialogRef<ProductPriceCreateUpdateComponent>,
    private fb: FormBuilder,
    private productPriceService: ProductPriceService
  ) {}

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as ProductPriceModel;
    }

    this.form.patchValue(this.defaults);
  }

  save() {
    if (this.mode === 'create') {
      this.createProductPrice();
    } else if (this.mode === 'update') {
      this.updateProductPrice();
    }
  }

  createProductPrice() {
    const productPrice = this.form.value;

    delete productPrice.productPriceID;

    productPrice.expiryDate = new Date(productPrice.expiryDate!);
    productPrice.productID = this.productCtrl.value?.id;
    this.dialogRef.close(productPrice);
  }

  updateProductPrice() {
    const productPrice = this.form.value;

    if (!this.defaults) {
      throw new Error(
        'Product Price ID does not exist, this product price cannot be updated'
      );
    }

    productPrice.productPriceID = this.defaults.productPriceID;

    this.dialogRef.close(productPrice);
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  productCtrl = new UntypedFormControl();

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
}
