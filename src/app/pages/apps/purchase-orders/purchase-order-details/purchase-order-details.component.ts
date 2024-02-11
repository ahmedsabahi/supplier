import { Component, OnInit } from '@angular/core';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { CommonModule, Location, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { VexPageLayoutHeaderDirective } from '@vex/components/vex-page-layout/vex-page-layout-header.directive';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { PurchaseOrderService } from '../purchase-order.service';
import { ActivatedRoute } from '@angular/router';
import { PurchaseOrderModel } from '../purchase-order.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'vex-purchase-order-details',
  animations: [fadeInUp400ms, fadeInRight400ms, scaleIn400ms, stagger40ms],
  standalone: true,
  imports: [
    VexPageLayoutComponent,
    VexPageLayoutHeaderDirective,
    VexBreadcrumbsComponent,
    MatRippleModule,
    MatIconModule,
    TextFieldModule,
    MatButtonModule,
    NgFor,
    NgIf,
    CommonModule,
    TranslateModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    VexPageLayoutContentDirective
  ],
  templateUrl: './purchase-order-details.component.html',
  styleUrl: './purchase-order-details.component.scss'
})
export class PurchaseOrderDetailsComponent implements OnInit {
  constructor(
    public location: Location,
    private route: ActivatedRoute,
    private purchaseOrderService: PurchaseOrderService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.fetchPurchaseOrder(params['id']);
    });
  }

  purchaseOrder?: PurchaseOrderModel;

  fetchPurchaseOrder(id: string) {
    this.purchaseOrderService.purchaseOrder(id).subscribe((res) => {
      this.purchaseOrder = res.data;
    });
  }
}
