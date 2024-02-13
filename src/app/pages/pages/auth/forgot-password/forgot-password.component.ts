import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';

@Component({
  selector: 'vex-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [fadeInUp400ms],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    MatSnackBarModule,
    TranslateModule
  ]
})
export class ForgotPasswordComponent {
  isLoading = false;
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private translate: TranslateService,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {}

  restPassword() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.authService.resetPassword(this.form.value.email!).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.status === 1) this.router.navigate(['/login']);
        this.snackbar.open(
          (this.translate.defaultLang === 'ar'
            ? res.messageAr
            : res.messageEn) ?? '',
          'ok'
        );
      },
      error: (e) => (console.log(e), (this.isLoading = false))
    });
  }
}
