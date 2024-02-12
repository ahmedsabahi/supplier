import { VexRoutes } from '@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
  {
    path: '',
    loadComponent: () =>
      import('./quotations.component').then((m) => m.QuotationsComponent),
    data: {
      toolbarShadowEnabled: false
    }
  },
  {
    path: 'update/:id',
    loadComponent: () =>
      import('./quotation-update/quotation-update.component').then(
        (m) => m.QuotationUpdateComponent
      ),
    data: {
      toolbarShadowEnabled: true
    }
  }
];

export default routes;
