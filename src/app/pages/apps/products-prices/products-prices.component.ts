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
import { ProductPriceModel, ProductPriceSearch } from './product-price.model';
import { ProductPriceService } from './product-price.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductPriceCreateUpdateComponent } from './product-price-create-update/product-price-create-update.component';
import { ExportExcelService } from 'src/app/core/services/export-excel.service';

@Component({
  selector: 'vex-products-prices',
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
    MatProgressSpinnerModule
  ],
  templateUrl: './products-prices.component.html',
  styleUrl: './products-prices.component.scss'
})
export class ProductsPricesComponent implements OnInit, AfterViewInit {
  @Input()
  displayedColumns: string[] = [
    'skuNumber',
    'productName',
    'price',
    'isFixedPrice',
    'expiryDate'
  ];

  dataSource!: MatTableDataSource<ProductPriceModel>;
  searchCtrl = new UntypedFormControl();
  pageSizeOptions: number[] = [10, 15, 20, 30, 50];

  productsPrices: ProductPriceModel[] = [];
  totalRecords?: number;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private productPriceService: ProductPriceService,
    private snackbar: MatSnackBar,
    private ete: ExportExcelService,
    private translate: TranslateService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.fetchProductsPrices();
    }
  }

  fetchProductsPrices() {
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

          const search: ProductPriceSearch = {
            page: this.paginator!.pageIndex + 1,
            limit: this.paginator!.pageSize
          };

          const findValue = this.searchCtrl.value;
          if (findValue) search.find = findValue;

          return this.productPriceService
            .productsPrices(search)
            .pipe(catchError(() => observableOf(null)));
        }),
        map((res) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = !res?.data;

          if (res === null) return [];
          this.totalRecords = res.totalRecords;
          return res.data;
        })
      )
      .subscribe((products) => (this.productsPrices = products ?? []));
  }

  createProductsPrice() {
    this.dialog
      .open(ProductPriceCreateUpdateComponent, {
        width: '50%',
        direction: this.translate.defaultLang === 'ar' ? 'rtl' : 'ltr'
      })
      .afterClosed()
      .subscribe((productPrice: ProductPriceModel) => {
        if (productPrice) {
          this.productPriceService.create(productPrice).subscribe({
            next: (res) => {
              if (res.status === 1) {
                this.snackbar.open(
                  (this.translate.defaultLang === 'ar'
                    ? res.messageAr
                    : res.messageEn) ?? ''
                );
                this.fetchProductsPrices();
              }
            }
          });
        }
      });
  }

  exportExcel() {
    this.productPriceService
      .productsPrices({
        page: 1,
        limit: 1000
      })
      .subscribe((res) => {
        if (!res.data) return;
        let dataForExcel: any[] = [];

        let result = res.data!.map((res) => ({
          skuNumber: res.skuNumber,
          productName: res.productName,
          price: res.price,
          createdBy: res.createdBy,
          isFixedPrice: res.isFixedPrice,
          expiryDate: res.expiryDate
        }));

        result.forEach((row: any) => {
          dataForExcel.push(Object.values(row));
        });

        this.ete.exportExcel({
          title: 'All Products Prices - Report',
          data: dataForExcel,
          headers: [
            this.translate.instant('skuNumber'),
            this.translate.instant('productName'),
            this.translate.instant('price'),
            this.translate.instant('createdBy'),
            this.translate.instant('isFixedPrice'),
            this.translate.instant('expiryDate')
          ],
          worksheetName: 'Products Prices Data',
          footerDesc: 'Products Prices Report Generated from fintech.mdd.sa at '
        });
      });
  }
}
