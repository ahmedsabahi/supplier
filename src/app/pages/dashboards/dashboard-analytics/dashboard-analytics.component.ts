import { Component, OnInit } from '@angular/core';
import { defaultChartOptions } from '@vex/utils/default-chart-options';
import {
  Order,
  tableSalesData
} from '../../../../static-data/table-sales-data';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import { WidgetTableComponent } from '../components/widgets/widget-table/widget-table.component';
import { WidgetLargeChartComponent } from '../components/widgets/widget-large-chart/widget-large-chart.component';
import { WidgetQuickValueCenterComponent } from '../components/widgets/widget-quick-value-center/widget-quick-value-center.component';
import { WidgetLargeGoalChartComponent } from '../components/widgets/widget-large-goal-chart/widget-large-goal-chart.component';
import { WidgetQuickLineChartComponent } from '../components/widgets/widget-quick-line-chart/widget-quick-line-chart.component';
import { WidgetAssistantComponent } from '../components/widgets/widget-assistant/widget-assistant.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component';
import { DashboardService } from '../dashboard.service';
import { th } from 'date-fns/locale';
import { DashboardModel } from '../dashboard.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  GoogleChartInterface,
  GoogleChartType,
  Ng2GoogleChartsModule
} from 'ng2-google-charts';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'vex-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.scss'],
  standalone: true,
  imports: [
    VexSecondaryToolbarComponent,
    VexBreadcrumbsComponent,
    MatButtonModule,
    MatIconModule,
    WidgetAssistantComponent,
    WidgetQuickLineChartComponent,
    WidgetLargeGoalChartComponent,
    WidgetQuickValueCenterComponent,
    WidgetLargeChartComponent,
    TranslateModule,
    Ng2GoogleChartsModule,
    WidgetTableComponent,
    MatProgressSpinnerModule
  ]
})
export class DashboardAnalyticsComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    private translate: TranslateService
  ) {}
  dashboardModel?: DashboardModel;

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  ngAfterViewInit(): void {
    window.addEventListener('resize', () =>
      this.invoicesChart.component?.draw()
    );
    window.addEventListener('resize', () =>
      this.uploadInvoicesChart.component?.draw()
    );
    window.addEventListener('resize', () =>
      this.purchaseOrdersChart.component?.draw()
    );
  }

  fetchDashboardData() {
    this.dashboardService.dashboard().subscribe((res) => {
      this.dashboardModel = res.data;
      this.initInvoicesChart();
      this.initUploadInvoicesChart();
      this.initPurchaseOrdersChart();
    });
  }

  initInvoicesChart() {
    this.invoicesChart.dataTable = this.dashboardModel?.invoices?.map(
      (item) => [this.translate.instant(item.statusName!), item.count]
    );
    this.invoicesChart.options = {
      width: '100%',
      height: 400,
      is3D: true,
      sliceVisibilityThreshold: 0,
      backgroundColor: 'transparent',
      fontName: "'Cairo', 'sans-serif'"
    };
  }

  initUploadInvoicesChart() {
    this.uploadInvoicesChart.dataTable = this.dashboardModel?.payments?.map(
      (item) => [this.translate.instant(item.statusName!), item.amount]
    );
    this.uploadInvoicesChart.options = {
      width: '100%',
      height: 400,
      is3D: true,
      sliceVisibilityThreshold: 0,
      backgroundColor: 'transparent',
      fontName: "'Cairo', 'sans-serif'"
    };
  }

  initPurchaseOrdersChart() {
    this.purchaseOrdersChart.dataTable = this.dashboardModel?.quotations?.map(
      (item) => [this.translate.instant(item.statusName!), item.count]
    );
    this.purchaseOrdersChart.options = {
      width: '100%',
      height: 400,
      is3D: true,
      sliceVisibilityThreshold: 0,
      backgroundColor: 'transparent',
      fontName: "'Cairo', 'sans-serif'"
    };
  }

  // invoices
  protected invoicesChart: GoogleChartInterface = {
    chartType: GoogleChartType.PieChart,
    firstRowIsData: true
  };

  // uploadInvoices
  protected uploadInvoicesChart: GoogleChartInterface = {
    chartType: GoogleChartType.PieChart,
    firstRowIsData: true
  };

  // purchaseOrders
  protected purchaseOrdersChart: GoogleChartInterface = {
    chartType: GoogleChartType.PieChart,
    firstRowIsData: true
  };
}
