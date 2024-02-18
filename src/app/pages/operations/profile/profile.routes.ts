import { VexRoutes } from '@vex/interfaces/vex-route.interface';
import { ProfileComponent } from './profile.component';

const routes: VexRoutes = [
  {
    path: '',
    component: ProfileComponent,
    data: {
      toolbarShadowEnabled: true
    },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./view-profile/view-profile.component').then(
            (m) => m.ViewProfileComponent
          )
      },
      {
        path: 'edit',
        loadComponent: () =>
          import('./edit-profile/edit-profile.component').then(
            (m) => m.EditProfileComponent
          )
      }
    ]
  }
];

export default routes;
