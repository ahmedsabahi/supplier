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
import { PaymentModel, PaymentSearch } from './payment.model';
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
import { ExportExcelService } from 'src/app/core/services/export-excel.service';

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
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class PaymentsComponent implements OnInit, AfterViewInit {
  @Input()
  displayedColumns: string[] = [
    'orderNo',
    'transactionNo',
    'paidOn',
    'employeeName',
    'amount',
    'notes',
    'isReturnedPayment',
    'actions'
  ];

  dataSource!: MatTableDataSource<PaymentModel>;
  searchCtrl = new UntypedFormControl();
  pageSizeOptions: number[] = [10, 15, 20, 30, 50];

  payments: PaymentModel[] = [];
  totalRecords?: number;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private paymentService: PaymentService,
    private translate: TranslateService,
    private ete: ExportExcelService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.fetchPayments();
    }
  }

  fetchPayments() {
    merge(this.searchCtrl.valueChanges, this.paginator!.page)
      .pipe(
        startWith({}),
        takeUntilDestroyed(this.destroyRef),
        debounceTime(800),
        switchMap(() => {
          this.isLoadingResults = true;

          if (this.dataSource.paginator && this.searchCtrl.value) {
            this.dataSource.paginator.firstPage();
          }

          const search: PaymentSearch = {
            page: this.paginator!.pageIndex + 1,
            limit: this.paginator!.pageSize
          };

          const findValue = this.searchCtrl.value;
          if (findValue) search.find = findValue;

          return this.paymentService
            .payments(search)
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
      .subscribe((payments) => (this.payments = payments ?? []));
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

  exportExcel() {
    this.paymentService
      .payments({
        page: 1,
        limit: 1000
      })
      .subscribe((res) => {
        if (!res.data) return;
        let dataForExcel: any[] = [];

        let result = res.data!.map((res) => ({
          orderNo: res.orderNo,
          transactionNo: res.transactionNo,
          paidOn: res.paidOn,
          employeeName: res.employeeName,
          amount: res.amount,
          notes: res.notes,
          isReturnedPayment: res.isReturnedPayment
        }));

        result.forEach((row: any) => {
          dataForExcel.push(Object.values(row));
        });

        this.ete.exportExcel({
          title: 'All Products Prices - Report',
          data: dataForExcel,
          headers: [
            this.translate.instant('orderNo'),
            this.translate.instant('transactionNo'),
            this.translate.instant('paidOn'),
            this.translate.instant('employeeName'),
            this.translate.instant('amount'),
            this.translate.instant('notes'),
            this.translate.instant('isReturnedPayment')
          ],
          worksheetName: 'Products Prices Data',
          footerDesc: 'Products Prices Report Generated from fintech.mdd.sa at '
        });
      });
  }
}
