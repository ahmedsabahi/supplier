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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import {
  FormControl,
  FormGroup,
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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { combineLatest, merge, Observable, of as observableOf, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  startWith,
  switchMap
} from 'rxjs/operators';
import {
  InvoiceStatus,
  PurchaseOrderStatus
} from 'src/app/core/constants/enums';
import {
  PurchaseOrderModel,
  PurchaseOrderSearch,
  UploadInvoiceCommand
} from './purchase-order.model';
import { PurchaseOrderService } from './purchase-order.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { UploadInvoiceComponent } from './upload-invoice/upload-invoice.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'vex-purchase-orders',
  standalone: true,
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
    MatSelectModule,
    MatOptionModule,
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './purchase-orders.component.html',
  styleUrl: './purchase-orders.component.scss'
})
export class PurchaseOrdersComponent implements OnInit, AfterViewInit {
  @Input()
  displayedColumns: string[] = [
    'orderNo',
    'total',
    'paidAmount',
    'invoiceStatus',
    'invoiceDate',
    'status',
    'actions'
  ];

  searchForm = new FormGroup({
    amountFrom: new FormControl(null),
    amountTo: new FormControl(null),
    invoiceStatus: new FormControl(null),
    find: new FormControl(null),
    status: new FormControl(null)
  });

  PurchaseOrderStatus = PurchaseOrderStatus;
  InvoiceStatus = InvoiceStatus;

  dataSource!: MatTableDataSource<PurchaseOrderModel>;
  pageSizeOptions: number[] = [10, 15, 20, 30, 50];

  purchaseOrders: PurchaseOrderModel[] = [];
  totalRecords?: number;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private translate: TranslateService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.fetchPurchaseOrders();
    }
  }

  fetchPurchaseOrders() {
    merge(this.paginator!.page, this.searchForm.valueChanges)
      .pipe(
        startWith({}),
        takeUntilDestroyed(this.destroyRef),
        debounceTime(800),
        switchMap(() => {
          this.isLoadingResults = true;

          if (this.shouldResetPaginator()) {
            this.dataSource.paginator!.firstPage();
          }

          const search: PurchaseOrderSearch = {
            page: this.paginator!.pageIndex + 1,
            limit: this.paginator!.pageSize,
            excludeStatus: [3]
          };

          const form = this.searchForm.value;

          if (form.find) search.find = form.find;
          if (form.amountFrom) search.amountFrom = Number(form.amountFrom);
          if (form.amountTo) search.amountTo = Number(form.amountTo);
          if (form.invoiceStatus) search.invoiceStatus = form.invoiceStatus!;
          if (form.status) search.status = form.status!;

          return this.purchaseOrderService
            .purchaseOrders(search)
            .pipe(catchError(() => observableOf(null)));
        }),
        map((res) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = !res?.data;

          if (res === null) return [];

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.totalRecords = res.totalRecords;
          return res.data;
        })
      )
      .subscribe(
        (purchaseOrders) => (this.purchaseOrders = purchaseOrders ?? [])
      );
  }

  private shouldResetPaginator(): boolean {
    const form = this.searchForm.value;

    return (
      (this.dataSource.paginator &&
        this.paginator!.pageIndex > 0 &&
        this.purchaseOrders.length < this.paginator!.pageSize &&
        (form.amountFrom ||
          form.amountTo ||
          form.find ||
          form.invoiceStatus ||
          form.status)) ??
      false
    );
  }

  downloadInvoice(id: string) {
    this.purchaseOrderService.purchaseOrderPDF(id).subscribe((res) => {
      if (res.result.status === 1 && res.data) {
        const fileName = `purchase-order-${id}.pdf`;
        this.downloadFile({
          fileContent: res.data,
          fileName: fileName
        });
      }
    });
  }

  downloadFile(model: any) {
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

  uploadInvoice(model: PurchaseOrderModel) {
    this.dialog
      .open(UploadInvoiceComponent, {
        data: model,
        width: '50%'
      })
      .afterClosed()
      .subscribe((model: UploadInvoiceCommand) => {
        if (model) {
          this.purchaseOrderService.uploadInvoice(model).subscribe({
            next: (res) => {
              if (res.status === 1) {
                this.snackbar.open(
                  (this.translate.currentLang === 'ar'
                    ? res.messageAr
                    : res.messageEn) ?? '',
                  'ok'
                );
                this.fetchPurchaseOrders();
              }
            }
          });
        }
      });
  }
}
