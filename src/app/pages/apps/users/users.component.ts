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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
import { merge, of as observableOf, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  startWith,
  switchMap
} from 'rxjs/operators';
import { UserModel, UserSearch } from './user.model';
import { UserService } from './user.service';
import { UserCreateUpdateComponent } from './user-create-update/user-create-update.component';

@Component({
  selector: 'vex-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
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
export class UsersComponent implements OnInit, AfterViewInit {
  @Input()
  displayedColumns: string[] = [
    'fullName',
    'email',
    'mobile',
    'address',
    'isActive',
    'actions'
  ];

  dataSource!: MatTableDataSource<UserModel>;
  searchCtrl = new UntypedFormControl();
  pageSizeOptions: number[] = [10, 15, 20, 30, 50];

  users: UserModel[] = [];
  totalRecords?: number;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private userService: UserService,
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
      this.fetchUsers();
    }
  }

  fetchUsers() {
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

          const search: UserSearch = {
            page: this.paginator!.pageIndex + 1,
            limit: this.paginator!.pageSize
          };

          const findValue = this.searchCtrl.value;
          if (findValue) search.find = findValue;

          return this.userService
            .users(search)
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
      .subscribe((users) => (this.users = users ?? []));
  }

  createUser() {
    this.dialog
      .open(UserCreateUpdateComponent, {
        direction: this.translate.defaultLang === 'ar' ? 'rtl' : 'ltr',
        width: '50%'
      })
      .afterClosed()
      .subscribe((user: UserModel) => {
        if (user) {
          this.userService.create(user).subscribe({
            next: (res) => {
              if (res.status === 1) {
                this.snackbar.open(
                  (this.translate.defaultLang === 'ar'
                    ? res.messageAr
                    : res.messageEn) ?? ''
                );
                this.fetchUsers();
              }
            }
          });
        }
      });
  }

  updateUser(user: UserModel) {
    this.dialog
      .open(UserCreateUpdateComponent, {
        data: user,
        direction: this.translate.defaultLang === 'ar' ? 'rtl' : 'ltr',
        width: '50%'
      })
      .afterClosed()
      .subscribe((updatedUser: UserModel) => {
        if (updatedUser) {
          this.userService.update(updatedUser).subscribe({
            next: (res) => {
              if (res.status === 1) {
                this.snackbar.open(
                  (this.translate.defaultLang === 'ar'
                    ? res.messageAr
                    : res.messageEn) ?? ''
                );
                this.fetchUsers();
              }
            }
          });
        }
      });
  }
}
