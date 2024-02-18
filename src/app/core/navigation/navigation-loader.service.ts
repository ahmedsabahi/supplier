import { Injectable } from '@angular/core';
import { VexLayoutService } from '@vex/services/vex-layout.service';
import { NavigationItem } from './navigation-item.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationLoaderService {
  private readonly _items: BehaviorSubject<NavigationItem[]> =
    new BehaviorSubject<NavigationItem[]>([]);

  get items$(): Observable<NavigationItem[]> {
    return this._items.asObservable();
  }

  constructor(private readonly layoutService: VexLayoutService) {
    this.loadNavigation();
  }

  loadNavigation(): void {
    this._items.next([
      {
        type: 'subheading',
        label: 'dashboards',
        children: [
          {
            type: 'link',
            label: 'analytics',
            route: '/',
            icon: 'mat:insights',
            routerLinkActiveOptions: { exact: true }
          }
        ]
      },

      {
        type: 'subheading',
        label: 'operations',
        children: [
          {
            type: 'link',
            label: 'quotations',
            route: '/operations/quotations',
            icon: 'mat:monetization_on'
          },
          {
            type: 'link',
            label: 'purchaseOrders',
            route: '/operations/purchase-orders',
            icon: 'mat:shopping_bag'
          },
          {
            type: 'link',
            label: 'productsPrices',
            route: '/operations/products-prices',
            icon: 'mat:assignment'
          },
          {
            type: 'link',
            label: 'payments',
            route: '/operations/payments',
            icon: 'mat:attach_money'
          }
        ]
      },
      {
        type: 'subheading',
        label: 'settings',
        children: [
          {
            type: 'link',
            label: 'users',
            route: '/operations/users',
            icon: 'mat:perm_identity'
          },
          {
            type: 'link',
            label: 'bankAccounts',
            route: '/operations/bank-accounts',
            icon: 'mat:credit_card'
          }
        ]
      },
      {
        type: 'subheading',
        label: 'help',
        children: [
          {
            type: 'link',
            label: 'guides',
            route: '/operations/help-center/guides',
            icon: 'mat:help'
          },
          {
            type: 'link',
            label: 'FAQ',
            route: '/operations/help-center/faq',
            icon: 'mat:book'
          },
          {
            type: 'link',
            label: 'changelog',
            route: '/documentation/changelog',
            icon: 'mat:update'
          }
        ]
      }
    ]);
  }
}
