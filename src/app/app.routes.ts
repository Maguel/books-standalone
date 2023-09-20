import { Routes } from '@angular/router';
import { routes as contentRoutes } from './home/content/content.routes';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path:'', redirectTo:'home', pathMatch:'full' },
  { path:'home', component: HomeComponent, children: contentRoutes },
  { path:'**', redirectTo:'home', pathMatch:'full' }
];
