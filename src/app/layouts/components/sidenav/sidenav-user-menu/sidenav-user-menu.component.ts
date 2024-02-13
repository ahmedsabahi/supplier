import { Component, OnInit } from '@angular/core';
import { VexPopoverRef } from '@vex/components/vex-popover/vex-popover-ref';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { EncryptStorageService } from 'src/app/core/services/encrypt-storage.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'vex-sidenav-user-menu',
  templateUrl: './sidenav-user-menu.component.html',
  styleUrls: ['./sidenav-user-menu.component.scss'],
  imports: [MatRippleModule, RouterLink, MatIconModule, TranslateModule],
  standalone: true
})
export class SidenavUserMenuComponent implements OnInit {
  constructor(
    private readonly popoverRef: VexPopoverRef,
    private readonly encryptStorageService: EncryptStorageService
  ) {}

  ngOnInit(): void {}

  close(): void {
    /** Wait for animation to complete and then close */
    setTimeout(() => this.popoverRef.close(), 250);
  }

  logout(): void {
    this.encryptStorageService.clear();
    this.close();
  }
}
