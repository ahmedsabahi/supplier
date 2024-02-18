import { Component, OnInit } from '@angular/core';
import { Link } from '@vex/interfaces/link.interface';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { EncryptStorageService } from 'src/app/core/services/encrypt-storage.service';
import { UserModel } from '../../pages/auth/models/auth.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export interface FriendSuggestion {
  name: string;
  imageSrc: string;
  friends: number;
  added: boolean;
}

@Component({
  selector: 'vex-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [scaleIn400ms, fadeInRight400ms],
  standalone: true,
  imports: [
    MatTabsModule,
    NgFor,
    RouterLinkActive,
    RouterLink,
    RouterOutlet,
    TranslateModule
  ]
})
export class ProfileComponent implements OnInit {
  links: Link[] = [
    {
      label: 'profile',
      route: './',
      routerLinkActiveOptions: { exact: true }
    },
    {
      label: 'editProfile',
      route: './edit'
    }
  ];

  user: UserModel;

  constructor(private readonly encryptStorageService: EncryptStorageService) {
    this.user = this.getUser();
  }

  ngOnInit() {}

  getUser() {
    return this.encryptStorageService.getCurrentUser();
  }
}
