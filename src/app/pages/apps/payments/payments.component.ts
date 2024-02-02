import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import {
  aioTableData,
  aioTableLabels
} from '../../../../static-data/aio-table-data';
import { SelectionModel } from '@angular/cdk/collections';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl
} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexPageLayoutHeaderDirective } from '@vex/components/vex-page-layout/vex-page-layout-header.directive';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { Customer } from '../aio-table/interfaces/customer.model';
import { CustomerCreateUpdateComponent } from '../aio-table/customer-create-update/customer-create-update.component';
import { TranslateModule } from '@ngx-translate/core';
import { PaymentService } from './payment.service';
import { PaymentModel } from './payments.model';

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
    TranslateModule
  ]
})
export class PaymentsComponent implements OnInit, AfterViewInit {
  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  // subject$: ReplaySubject<Customer[]> = new ReplaySubject<Customer[]>(1);
  // data$: Observable<Customer[]> = this.subject$.asObservable();
  // customers: Customer[] = [];

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
      type: 'text',
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
      type: 'text',
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
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<PaymentModel>;
  searchCtrl = new UntypedFormControl();

  labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private paymentService: PaymentService) {}

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.fetchPayments();
    // this.getData().subscribe((customers) => {
    //   this.subject$.next(customers);
    // });

    // this.data$.pipe(filter<Customer[]>(Boolean)).subscribe((customers) => {
    //   this.customers = customers;
    //   this.dataSource.data = customers;
    // });

    this.searchCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.onFilterChange(value));
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  fetchPayments(find?: string) {
    this.paymentService.payments(find).subscribe((res) => {
      if (res.data) this.dataSource.data = res.data;
    });
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.fetchPayments(value);
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  // onLabelChange(change: MatSelectChange, row: Customer) {
  //   const index = this.customers.findIndex((c) => c === row);
  //   this.customers[index].labels = change.value;
  //   this.subject$.next(this.customers);
  // }
}
