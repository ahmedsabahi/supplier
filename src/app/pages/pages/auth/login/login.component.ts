import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth.service';
import { UserLoginCommand } from '../auth.model';
import { EncryptStorageService } from 'src/app/core/services/encrypt-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInUp400ms],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatCheckboxModule,
    RouterLink,
    MatSnackBarModule,
    TranslateModule
  ]
})
export class LoginComponent {
  form = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  inputType = 'password';
  visible = false;
  isLoading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
    private translate: TranslateService,
    private encryptStorageService: EncryptStorageService
  ) {}

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.authService
      .login({
        username: this.form.value.username ?? '',
        password: this.form.value.password ?? ''
      })
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.data) {
            let user = res.data;
            if (res.result.status === 1) {
              if (user.userType === 'S') {
                this.encryptStorageService.cacheUser(user);
                this.router.navigate(['/']);
              } else {
                Swal.fire({
                  icon: 'error',
                  title: this.translate.instant('thisUserIsNotVendor')
                });
              }
            }
          }
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
