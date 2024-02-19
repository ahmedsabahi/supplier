import { Component, OnInit } from '@angular/core';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import {
  UpdateVendorCommend,
  VendorModel
} from 'src/app/pages/pages/auth/models/vendor.model';
import { VendorService } from 'src/app/pages/pages/auth/services/vendor.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DropDownModel } from 'src/app/core/models/api-response.model';
import { MatSelectModule } from '@angular/material/select';
import { th } from 'date-fns/locale';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'vex-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  animations: [fadeInUp400ms, fadeInRight400ms, scaleIn400ms, stagger40ms],
  standalone: true,
  imports: [
    MatRippleModule,
    MatIconModule,
    TextFieldModule,
    MatButtonModule,
    NgFor,
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    TranslateModule
  ]
})
export class EditProfileComponent implements OnInit {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    mobile: [
      '',
      [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern('(05)[0-9 ]{8}')
      ]
    ],
    email: ['', [Validators.required, Validators.email]],
    cityID: ['', [Validators.required]],
    address: ['', [Validators.required]],
    crNumber: ['', [Validators.required]],
    vatNumber: ['', [Validators.required]],
    categoryIDs: [[''], [Validators.required]]
  });

  constructor(
    private readonly vendorService: VendorService,
    private translate: TranslateService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.fetchCities();
    this.fetchCategories();
    this.fetchVendor();
  }

  cities?: DropDownModel[];
  categories?: DropDownModel[];

  fetchCities() {
    this.vendorService.cities().subscribe((res) => {
      this.cities = res.data;
    });
  }

  fetchCategories() {
    this.vendorService.categories().subscribe((res) => {
      this.categories = res.data;
    });
  }

  fetchVendor() {
    this.vendorService.vendor().subscribe((res) => {
      this.initForm(res.data);
    });
  }

  initForm(vendor?: VendorModel) {
    this.form.patchValue({
      name: vendor?.name,
      mobile: vendor?.mobile,
      email: vendor?.email,
      address: vendor?.address,
      cityID: vendor?.cityID,
      crNumber: vendor?.crNumber,
      vatNumber: vendor?.vatNumber,
      categoryIDs: vendor?.categoryIDs
    });
  }

  isLoading = false;

  updateVendor() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.vendorService
      .update(this.form.value as UpdateVendorCommend)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.status === 1) {
            this.snackbar.open(
              (this.translate.defaultLang === 'ar'
                ? res.messageAr
                : res.messageEn) ?? ''
            );
            this.fetchVendor();
          }
        },
        error: (e) => (this.isLoading = false)
      });
  }
}
