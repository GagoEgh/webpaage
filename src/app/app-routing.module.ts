import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePasswordComponent, LoginComponent, RegisterComponent } from './components';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'create-password',component:CreatePasswordComponent},
  { path: 'users', loadChildren: () => import('./lazyLoad/users/users.module').then(m => m.UsersModule) },
  { path: 'role', loadChildren: () => import('./lazyLoad/role/role.module').then(m => m.RoleModule) },
  { path: 'trainings', loadChildren: () => import('./lazyLoad/trainings/trainings.module').then(m => m.TrainingsModule) },
  { path: 'projects', loadChildren: () => import('./lazyLoad/projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'vacancies', loadChildren: () => import('./lazyLoad/vacancies/vacancies.module').then(m => m.VacanciesModule) },
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
