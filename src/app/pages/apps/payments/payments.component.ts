import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent
} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexPageLayoutHeaderDirective } from '@vex/components/vex-page-layout/vex-page-layout-header.directive';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PaymentService } from './payment.service';
import { PaymentModel, PaymentSearch } from './payments.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-payments',
  standalone: true,
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss',
  animations: [fadeInUp400ms, stagger40ms],
  imports: [
    VexPageLayoutComponent,
    VexPageLayoutHeaderDirective,
    VexBreadcrumbsComponent,
    MatButtonToggleModule,
    ReactiveFormsModule,
    VexPageLayoutContentDirective,
    NgIf,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    NgFor,
    NgClass,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    TranslateModule,
    CommonModule
  ]
})
export class PaymentsComponent implements OnInit, AfterViewInit {
  @Input()
  columns: TableColumn<PaymentModel>[] = [
    {
      label: 'orderNo',
      property: 'orderNo',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'transactionNo',
      property: 'transactionNo',
      visible: true,
      type: 'text'
    },
    {
      label: 'paidOn',
      property: 'paidOn',
      type: 'date',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'employeeName',
      property: 'employeeName',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'amount',
      property: 'amount',
      type: 'number',
      visible: true,

      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'notes',
      property: 'notes',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    { label: 'status', property: 'status', type: 'button', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];

  dataSource!: MatTableDataSource<PaymentModel>;
  searchCtrl = new UntypedFormControl();

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  search: PaymentSearch = {};

  constructor(
    private paymentService: PaymentService,
    private translate: TranslateService,
    private snackbar: MatSnackBar
  ) {}

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.fetchPayments();

    this.searchCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.onFilterChange(value));
  }

  ngAfterViewInit() {
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }

  changePage(page: any) {
    this.search.page = page;
    this.fetchPayments();
  }

  pageEvent?: PageEvent;
  totalRecords?: number;

  fetchPayments(event?: PageEvent) {
    this.search.page = (event?.pageIndex ?? 0) + 1;
    this.search.limit = event?.pageSize ?? 15;
    this.paymentService.payments(this.search).subscribe((res) => {
      if (res.result.status === 1 && res.data) {
        this.dataSource.data = res.data;
        this.totalRecords = res.totalRecords;
      }
    });
  }

  downloadPayment(id: string) {
    this.paymentService.payment(id).subscribe((res) => {
      if (res.result.status === 1 && res.data) {
        this.downloadFile(res.data);
      }
    });
  }

  downloadFile(model: PaymentModel) {
    if (!model.fileContent || !model.fileName) {
      this.snackbar.open(this.translate.instant('fileNotExists'), 'ok');
      return;
    }
    const linkSource = 'data:application/pdf;base64,' + model.fileContent;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = model?.fileName ?? '';
    downloadLink.click();
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.search.find = value;
    this.fetchPayments();
  }
}
