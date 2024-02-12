import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  UntypedFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { VendorService } from 'src/app/pages/apps/social/vendor.service';

@Component({
  selector: 'vex-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeInUp400ms],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    NgIf,
    MatIconModule,
    MatCheckboxModule,
    RouterLink,
    MatSnackBarModule,
    TranslateModule
  ]
})
export class RegisterComponent implements OnInit {
  registerationForm: FormGroup = new FormGroup({});

  inputType = 'password';
  matcher = new MyErrorStateMatcher();

  visible = false;
  isLoading = false;

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private translate: TranslateService,
    private vendorService: VendorService
  ) {
    this.registerationForm = new FormGroup(
      {
        fullname: new FormControl('', [
          Validators.required,
          Validators.minLength(3)
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8)
        ]),
        confirmPassword: new FormControl(''),
        phone: new FormControl(null, [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern('(05)[0-9 ]{8}')
        ]),
        companyName: new FormControl('', Validators.required),
        terms: new FormControl(false, Validators.requiredTrue)
      },
      {
        validators: validateAreEqual
      }
    );
  }

  ngOnInit() {}

  register() {
    if (this.registerationForm.invalid) {
      this.registerationForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.vendorService
      .register({
        fullname: this.registerationForm.value.fullname ?? '',
        companyName: this.registerationForm.value.companyName ?? '',
        email: this.registerationForm.value.email ?? '',
        phone: this.registerationForm.value.phone ?? '',
        password: this.registerationForm.value.password ?? '',
        confrimPassword: this.registerationForm.value.confirmPassword ?? ''
      })
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.status === 1) this.router.navigate(['/login']);
          this.snackbar.open(
            (this.translate.currentLang === 'ar'
              ? res.messageAr
              : res.messageEn) ?? '',
            'ok'
          );
        },
        error: (e) => (this.isLoading = false)
      });
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}

export const validateAreEqual: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value === confirmPassword.value
    ? null
    : { notMatch: true };
};

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(
      control?.parent?.invalid && control?.parent?.dirty
    );
    return (
      (control?.parent?.errors &&
        control?.parent?.errors &&
        control?.touched &&
        (invalidCtrl || invalidParent)) ??
      false
    );
  }
}
