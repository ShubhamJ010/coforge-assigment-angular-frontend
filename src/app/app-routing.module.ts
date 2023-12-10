import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './Pages/user-form/user-form.component';
import { ListUserComponent } from './Pages/list-user/list-user.component';
import {UpdateUserFormComponent} from "./Pages/update-user-form/update-user-form.component";

const routes: Routes = [
  { path: 'add', component: UserFormComponent },
  { path: 'all', component: ListUserComponent },
  { path: '', redirectTo: '/add', pathMatch: 'full' },
  {path: 'update/:id', component:UpdateUserFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
