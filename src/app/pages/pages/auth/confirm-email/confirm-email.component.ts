import { Component, OnInit } from '@angular/core';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { VendorService } from '../services/vendor.service';
import { debounceTime, delay } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'vex-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
  animations: [fadeInUp400ms],
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule,
    MatProgressSpinnerModule
  ]
})
export class ConfirmEmailComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vendorService: VendorService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.confirmEmail(params['code']);
    });
  }

  isLoading: boolean = false;

  confirmEmail(code: string) {
    this.isLoading = true;
    this.vendorService
      .confirmEmail({
        code: code,
        type: 'S'
      })
      .pipe(delay(6000))
      .subscribe({
        next: (res) => {
          this.isLoading = false;

          if (res.status === 1) {
            setTimeout(() => {
              this.router.navigate(['/auth/login']);
            }, 4000);
          }
        },
        error: (error) => {
          this.isLoading = false;
        }
      });
  }
}
