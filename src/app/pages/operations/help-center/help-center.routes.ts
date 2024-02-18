import { HelpCenterComponent } from './help-center.component';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
  {
    path: '',
    component: HelpCenterComponent,
    data: {
      toolbarShadowEnabled: true
    },
    children: [
      {
        path: '',
        redirectTo: 'getting-started',
        pathMatch: 'full'
      },
    
      {
        path: 'faq',
        loadComponent: () =>
          import('./help-center-faq/help-center-faq.component').then(
            (m) => m.HelpCenterFaqComponent
          )
      },
      {
        path: 'guides',
        loadComponent: () =>
          import('./help-center-guides/help-center-guides.component').then(
            (m) => m.HelpCenterGuidesComponent
          )
      }
    ]
  }
];

export default routes;
