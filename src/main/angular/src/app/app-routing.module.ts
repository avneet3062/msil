import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './pages/404/page404.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './providers/auth.guard';
import { LoginAuthGuard } from './providers/loginAuth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
    // , canActivate: [LoginAuthGuard]
  },
  {
    path: 'home', loadChildren: './pages/main/main.module#MainModule'
    // , canActivate: [AuthGuard]
  },

  {
    path: '**',
    redirectTo: '/page404'
  },
  {
    path: 'page404',
    component: Page404Component
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
