import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { EncryptStorageService } from 'src/app/core/services/encrypt-storage.service';
import { DashboardModel } from '../../../dashboard.model';

@Component({
  selector: 'vex-widget-assistant',
  templateUrl: './widget-assistant.component.html',
  styleUrls: ['./widget-assistant.component.scss'],
  standalone: true,
  imports: [MatIconModule, TranslateModule]
})
export class WidgetAssistantComponent implements OnInit {
  @Input({ required: true }) model!: DashboardModel;

  constructor(private readonly encryptStorageService: EncryptStorageService) {}

  ngOnInit() {}

  fullName() {
    return this.encryptStorageService.getCurrentUser()?.fullName;
  }
}
