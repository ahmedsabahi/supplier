import { LayoutComponent } from './layouts/layout/layout.component';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';
import { DashboardAnalyticsComponent } from './pages/dashboards/dashboard-analytics/dashboard-analytics.component';
import { authGuard } from './auth.guard';

export const appRoutes: VexRoutes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/pages/auth/login/login.component').then(
        (m) => m.LoginComponent
      )
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/pages/auth/register/register.component').then(
        (m) => m.RegisterComponent
      )
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import(
        './pages/pages/auth/forgot-password/forgot-password.component'
      ).then((m) => m.ForgotPasswordComponent)
  },
  {
    path: 'coming-soon',
    loadComponent: () =>
      import('./pages/pages/coming-soon/coming-soon.component').then(
        (m) => m.ComingSoonComponent
      )
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
        path: 'apps',
        children: [
          {
            path: 'social',
            loadChildren: () => import('./pages/apps/social/social.routes')
          },
          {
            path: 'payments',
            loadComponent: () =>
              import('./pages/apps/payments/payments.component').then(
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
                './pages/apps/products-prices/products-prices.component'
              ).then((m) => m.ProductsPricesComponent),
            data: {
              toolbarShadowEnabled: false
            }
          },
          {
            path: 'users',
            loadComponent: () =>
              import('./pages/apps/users/users.component').then(
                (m) => m.UsersComponent
              ),
            data: {
              toolbarShadowEnabled: false
            }
          },
          {
            path: 'bank-accounts',
            loadComponent: () =>
              import('./pages/apps/bank-accounts/bank-accounts.component').then(
                (m) => m.BankAccountsComponent
              ),
            data: {
              toolbarShadowEnabled: false
            }
          },
          {
            path: 'quotations',
            loadChildren: () =>
              import('./pages/apps/quotations/quotation.routes')
          },
          {
            path: 'purchase-orders',
            loadChildren: () =>
              import('./pages/apps/purchase-orders/purchase-orders.routes')
          },
          {
            path: 'help-center',
            loadChildren: () =>
              import('./pages/apps/help-center/help-center.routes')
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
