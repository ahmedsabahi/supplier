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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { merge, of as observableOf } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  startWith,
  switchMap
} from 'rxjs/operators';
import { QuotationModel, QuotationSearch } from './quotation.model';
import { QuotationService } from './quotation.service';
import { QuotationStatus } from 'src/app/core/constants/enums';
import { RouterModule } from '@angular/router';
import { ExportExcelService } from 'src/app/core/services/export-excel.service';
@Component({
  selector: 'vex-quotations',
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
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './quotations.component.html',
  styleUrl: './quotations.component.scss'
})
export class QuotationsComponent implements OnInit, AfterViewInit {
  @Input()
  displayedColumns: string[] = [
    'orderNo',
    'total',
    'createdOn',
    'createdBy',
    'notes',
    'status',
    'actions'
  ];

  toggleCtrl = new UntypedFormControl(null);

  QuotationStatus = QuotationStatus;
  dataSource!: MatTableDataSource<QuotationModel>;
  searchCtrl = new UntypedFormControl();
  pageSizeOptions: number[] = [10, 15, 20, 30, 50];

  quotations: QuotationModel[] = [];
  totalRecords?: number;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private quotationService: QuotationService,
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
      this.fetchQuotations();
    }
  }

  fetchQuotations() {
    merge(
      this.searchCtrl.valueChanges,
      this.toggleCtrl.valueChanges,
      this.paginator!.page
    )
      .pipe(
        startWith({}),
        takeUntilDestroyed(this.destroyRef),
        debounceTime(800),
        switchMap(() => {
          this.isLoadingResults = true;

          if (this.dataSource.paginator && this.searchCtrl.value) {
            this.dataSource.paginator.firstPage();
          }

          const search: QuotationSearch = {
            page: this.paginator!.pageIndex + 1,
            limit: this.paginator!.pageSize
          };

          const findValue = this.searchCtrl.value;
          const toggleValue = this.toggleCtrl.value;
          if (findValue) search.find = findValue;
          if (toggleValue) search.includeStatus = toggleValue;

          return this.quotationService
            .quotations(search)
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
      .subscribe((quotations) => (this.quotations = quotations ?? []));
  }

  downloadFile(model: QuotationModel) {
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
    this.quotationService
      .quotations({
        page: 1,
        limit: 1000
      })
      .subscribe((res) => {
        if (!res.data) return;
        let dataForExcel: any[] = [];

        let result = res.data!.map((res) => ({
          orderNo: res.orderNo,
          total: res.total,
          createdOn: res.createdOn,
          createdBy: res.createdBy,
          notes: res.notes,
          status: res.statusName
        }));

        result.forEach((row: any) => {
          dataForExcel.push(Object.values(row));
        });

        this.ete.exportExcel({
          title: 'All Quotations - Report',
          data: dataForExcel,
          headers: [
            this.translate.instant('orderNo'),
            this.translate.instant('total'),
            this.translate.instant('createdOn'),
            this.translate.instant('createdBy'),
            this.translate.instant('notes'),
            this.translate.instant('status')
          ],
          worksheetName: 'Quotations Data',
          footerDesc: 'Quotations Report Generated from fintech.mdd.sa at '
        });
      });
  }
}
