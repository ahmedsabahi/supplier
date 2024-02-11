import { VexRoutes } from '@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
  {
    path: '',
    loadComponent: () =>
      import('./purchase-orders.component').then(
        (m) => m.PurchaseOrdersComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },
  {
    path: 'purchase-order-details/:id',
    loadComponent: () =>
      import('./purchase-order-details/purchase-order-details.component').then(
        (m) => m.PurchaseOrderDetailsComponent
      ),
    data: {
      toolbarShadowEnabled: true
    }
  }
];

export default routes;
