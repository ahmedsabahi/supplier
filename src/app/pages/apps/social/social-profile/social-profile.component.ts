import { Component, OnInit } from '@angular/core';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserModel } from 'src/app/pages/pages/auth/auth.model';
import { EncryptStorageService } from 'src/app/core/services/encrypt-storage.service';
import { TranslateModule } from '@ngx-translate/core';
import { VendorModel } from '../vendor.model';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'vex-social-profile',
  templateUrl: './social-profile.component.html',
  styleUrls: ['./social-profile.component.scss'],
  animations: [fadeInUp400ms, fadeInRight400ms, scaleIn400ms, stagger40ms],
  standalone: true,
  imports: [MatIconModule, NgFor, NgIf, MatButtonModule, TranslateModule]
})
export class SocialProfileComponent implements OnInit {
  vendor?: VendorModel;

  constructor(private readonly vendorService: VendorService) {}

  ngOnInit() {
    this.fetchVendor();
  }

  fetchVendor() {
    this.vendorService.vendor().subscribe((res) => {
      this.vendor = res.data;
    });
  }
}
