import {
  Component,
  DestroyRef,
  ElementRef,
  HostBinding,
  inject,
  OnInit
} from '@angular/core';
import { VexLayoutService } from '@vex/services/vex-layout.service';
import { VexConfigService } from '@vex/config/vex-config.service';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { NavigationService } from '../../../core/navigation/navigation.service';
import { VexPopoverService } from '@vex/components/vex-popover/vex-popover.service';
import { MegaMenuComponent } from './mega-menu/mega-menu.component';
import { Observable, of } from 'rxjs';
import { NavigationComponent } from '../navigation/navigation.component';
import { ToolbarUserComponent } from './toolbar-user/toolbar-user.component';
import { ToolbarNotificationsComponent } from './toolbar-notifications/toolbar-notifications.component';
import { NavigationItemComponent } from '../navigation/navigation-item/navigation-item.component';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavigationItem } from '../../../core/navigation/navigation-item.interface';
import { checkRouterChildsData } from '@vex/utils/check-router-childs-data';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'vex-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    NgIf,
    RouterLink,
    MatMenuModule,
    NgClass,
    NgFor,
    NavigationItemComponent,
    ToolbarNotificationsComponent,
    ToolbarUserComponent,
    NavigationComponent,
    AsyncPipe
  ]
})
export class ToolbarComponent implements OnInit {
  @HostBinding('class.shadow-b')
  showShadow: boolean = false;

  navigationItems$: Observable<NavigationItem[]> =
    this.navigationService.items$;

  isHorizontalLayout$: Observable<boolean> = this.configService.config$.pipe(
    map((config) => config.layout === 'horizontal')
  );
  isVerticalLayout$: Observable<boolean> = this.configService.config$.pipe(
    map((config) => config.layout === 'vertical')
  );
  isNavbarInToolbar$: Observable<boolean> = this.configService.config$.pipe(
    map((config) => config.navbar.position === 'in-toolbar')
  );
  isNavbarBelowToolbar$: Observable<boolean> = this.configService.config$.pipe(
    map((config) => config.navbar.position === 'below-toolbar')
  );
  userVisible$: Observable<boolean> = this.configService.config$.pipe(
    map((config) => config.toolbar.user.visible)
  );
  title$: Observable<string> = this.configService.select((config) =>
    this.translateService.instant(config.sidenav.title)
  );

  isDesktop$: Observable<boolean> = this.layoutService.isDesktop$;
  megaMenuOpen$: Observable<boolean> = of(false);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private readonly layoutService: VexLayoutService,
    private readonly configService: VexConfigService,
    private readonly navigationService: NavigationService,
    private readonly popoverService: VexPopoverService,
    private readonly router: Router,
    private readonly translateService: TranslateService
  ) {}

  ngOnInit() {
    localStorage.getItem('selectedLanguage') === 'ar'
      ? (this.siteLanguage = this.languageList[1])
      : (this.siteLanguage = this.languageList[0]);
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.showShadow = checkRouterChildsData(
          this.router.routerState.root.snapshot,
          (data) => data.toolbarShadowEnabled ?? false
        );
      });
  }

  openQuickpanel(): void {
    this.layoutService.openQuickpanel();
  }

  openSidenav(): void {
    this.layoutService.openSidenav();
  }

  openMegaMenu(origin: ElementRef | HTMLElement): void {
    this.megaMenuOpen$ = of(
      this.popoverService.open({
        content: MegaMenuComponent,
        origin,
        offsetY: 12,
        position: [
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top'
          },
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top'
          }
        ]
      })
    ).pipe(
      switchMap((popoverRef) => popoverRef.afterClosed$.pipe(map(() => false))),
      startWith(true)
    );
  }

  openSearch(): void {
    this.layoutService.openSearch();
  }

  siteLanguage: any = {};

  languageList = [
    { code: 'en', label: 'English', flag: 'flag:united-states' },
    { code: 'ar', label: 'العربية', flag: 'flag:saudi-arabia' }
  ];

  changeSiteLanguage(localeCode: string): void {
    if (localeCode === localStorage.getItem('selectedLanguage')) return;

    const selectedLanguage = this.languageList.find(
      (language) => language.code === localeCode
    );
    if (selectedLanguage) {
      this.siteLanguage = selectedLanguage;
      this.translateService.setDefaultLang(localeCode);
      this.translateService.use(localeCode);
      localStorage.setItem('selectedLanguage', localeCode);
      this.layoutRTLChange(localeCode);
      // this.translateService.use(localStorage.getItem('selectedLanguage') ?? 'en');

      // localStorage.setItem('layout_type', localeCode == 'ar' ? 'rtl' : 'ltr');
    }
    const currentLanguage = this.translateService.currentLang;
    console.log('currentLanguage', localStorage.getItem('selectedLanguage'));
  }

  layoutRTLChange(localeCode: string): void {
    this.configService.updateConfig({
      direction: localeCode == 'ar' ? 'rtl' : 'ltr'
    });
  }
}
