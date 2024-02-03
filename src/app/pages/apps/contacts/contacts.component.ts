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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContactService } from './contact.service';
import { ContactModel, ContactSearch } from './contact.model';

@Component({
  selector: 'vex-contacts',
  standalone: true,
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
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent implements OnInit, AfterViewInit {
  @Input()
  columns: TableColumn<ContactModel>[] = [
    {
      label: 'fullName',
      property: 'fullName',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'email',
      property: 'email',
      visible: true,
      type: 'text'
    },
    {
      label: 'address',
      property: 'address',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'isActive',
      property: 'isActive',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];

  dataSource!: MatTableDataSource<ContactModel>;
  searchCtrl = new UntypedFormControl();

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  search: ContactSearch = {};

  constructor(
    private contactService: ContactService,
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
    this.fetchContacts();

    this.searchCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.onFilterChange(value));
  }

  ngAfterViewInit() {
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }

  changePage(page: any) {
    this.search.page = page;
    this.fetchContacts();
  }

  pageEvent?: PageEvent;
  totalRecords?: number;

  fetchContacts(event?: PageEvent) {
    this.search.page = (event?.pageIndex ?? 0) + 1;
    this.search.limit = event?.pageSize ?? 15;
    this.contactService.contacts(this.search).subscribe((res) => {
      if (res.result.status === 1 && res.data) {
        this.dataSource.data = res.data;
        this.totalRecords = res.totalRecords;
      }
    });
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.search.find = value;
    this.fetchContacts();
  }
}
