import { Component, OnInit } from '@angular/core';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { VendorModel } from '../../../pages/auth/models/vendor.model';
import { VendorService } from '../../../pages/auth/services/vendor.service';

@Component({
  selector: 'vex-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
  animations: [fadeInUp400ms, fadeInRight400ms, scaleIn400ms, stagger40ms],
  standalone: true,
  imports: [MatIconModule, NgFor, NgIf, MatButtonModule, TranslateModule]
})
export class ViewProfileComponent implements OnInit {
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
