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
import { ContactModel, ContactSearch } from './contact.model';
import { ContactService } from './contact.service';
import { ContactCreateUpdateComponent } from './contact-create-update/contact-create-update.component';
@Component({
  selector: 'vex-contacts',
  standalone: true,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
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
export class ContactsComponent implements OnInit, AfterViewInit {
  @Input()
  displayedColumns: string[] = [
    'fullName',
    'email',
    'mobile',
    'address',
    'isActive',
    'actions'
  ];

  dataSource!: MatTableDataSource<ContactModel>;
  searchCtrl = new UntypedFormControl();
  pageSizeOptions: number[] = [10, 20, 30, 50];

  search: ContactSearch = {};
  contacts: ContactModel[] = [];
  totalRecords?: number;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private contactService: ContactService,
    private translate: TranslateService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.fetchContacts();
    }
  }

  fetchContacts() {
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

          const search: any = {
            page: this.paginator!.pageIndex + 1,
            limit: this.paginator!.pageSize
          };

          const findValue = this.searchCtrl.value;
          if (findValue) search.find = findValue;

          return this.contactService
            .contacts(search)
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
      .subscribe((contacts) => (this.contacts = contacts ?? []));
  }

  createContact() {
    this.dialog
      .open(ContactCreateUpdateComponent)
      .afterClosed()
      .subscribe((contact: ContactModel) => {
        /**
         * Customer is the updated customer (if the user pressed Save - otherwise it's null)
         */
        if (contact) {
          this.contactService.create(contact).subscribe({
            next: (res) => {
              if (res.status === 1) {
                this.snackbar.open(
                  (this.translate.currentLang === 'ar'
                    ? res.messageAr
                    : res.messageEn) ?? '',
                  'ok'
                );
                this.fetchContacts();
              }
            }
          });
        }
      });
  }

  updateContact(contact: ContactModel) {
    this.dialog
      .open(ContactCreateUpdateComponent, {
        data: contact
      })
      .afterClosed()
      .subscribe((updatedContact: ContactModel) => {
        /**
         * Customer is the updated customer (if the user pressed Save - otherwise it's null)
         */
        if (updatedContact) {
          this.contactService.update(updatedContact).subscribe({
            next: (res) => {
              if (res.status === 1) {
                this.snackbar.open(
                  (this.translate.currentLang === 'ar'
                    ? res.messageAr
                    : res.messageEn) ?? '',
                  'ok'
                );
                this.fetchContacts();
              }
            }
          });
        }
      });
  }
}
