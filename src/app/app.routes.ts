import { LayoutComponent } from './layouts/layout/layout.component';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';
import { DashboardAnalyticsComponent } from './pages/dashboards/dashboard-analytics/dashboard-analytics.component';
import { authGuard } from './auth.guard';

export const appRoutes: VexRoutes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/pages/auth/auth.routes')
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboards/analytics',
        redirectTo: '/',
        pathMatch: 'full'
      },
      {
        path: '',
        canActivate: [authGuard],
        loadComponent: () =>
          import(
            './pages/dashboards/dashboard-analytics/dashboard-analytics.component'
          ).then((m) => m.DashboardAnalyticsComponent)
      },
      {
        path: 'operations',
        children: [
          {
            path: 'profile',
            loadChildren: () =>
              import('./pages/operations/profile/profile.routes')
          },
          {
            path: 'payments',
            loadComponent: () =>
              import('./pages/operations/payments/payments.component').then(
                (m) => m.PaymentsComponent
              ),
            data: {
              toolbarShadowEnabled: false
            }
          },
          {
            path: 'products-prices',
            loadComponent: () =>
              import(
                './pages/operations/products-prices/products-prices.component'
              ).then((m) => m.ProductsPricesComponent),
            data: {
              toolbarShadowEnabled: false
            }
          },
          {
            path: 'users',
            loadComponent: () =>
              import('./pages/operations/users/users.component').then(
                (m) => m.UsersComponent
              ),
            data: {
              toolbarShadowEnabled: false
            }
          },
          {
            path: 'bank-accounts',
            loadComponent: () =>
              import(
                './pages/operations/bank-accounts/bank-accounts.component'
              ).then((m) => m.BankAccountsComponent),
            data: {
              toolbarShadowEnabled: false
            }
          },
          {
            path: 'quotations',
            loadChildren: () =>
              import('./pages/operations/quotations/quotation.routes')
          },
          {
            path: 'purchase-orders',
            loadChildren: () =>
              import(
                './pages/operations/purchase-orders/purchase-orders.routes'
              )
          },
          {
            path: 'help-center',
            loadChildren: () =>
              import('./pages/operations/help-center/help-center.routes')
          }
        ]
      },
      {
        path: 'pages',
        children: [
          {
            path: 'pricing',
            loadComponent: () =>
              import('./pages/pages/pricing/pricing.component').then(
                (m) => m.PricingComponent
              )
          },
          {
            path: 'faq',
            loadComponent: () =>
              import('./pages/pages/faq/faq.component').then(
                (m) => m.FaqComponent
              )
          },
          {
            path: 'guides',
            loadComponent: () =>
              import('./pages/pages/guides/guides.component').then(
                (m) => m.GuidesComponent
              )
          },

          {
            path: 'error-404',
            loadComponent: () =>
              import('./pages/pages/errors/error-404/error-404.component').then(
                (m) => m.Error404Component
              )
          },
          {
            path: 'error-500',
            loadComponent: () =>
              import('./pages/pages/errors/error-500/error-500.component').then(
                (m) => m.Error500Component
              )
          }
        ]
      },
      {
        path: 'ui',
        children: [
          {
            path: 'page-layouts',
            loadChildren: () =>
              import('./pages/ui/page-layouts/page-layouts.routes')
          }
        ]
      },
      {
        path: 'documentation',
        loadChildren: () => import('./pages/documentation/documentation.routes')
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/pages/errors/error-404/error-404.component').then(
            (m) => m.Error404Component
          )
      }
    ]
  }
];
