import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { UserFormComponent } from './Pages/user-form/user-form.component';
import { ListUserComponent } from './Pages/list-user/list-user.component';
import { UserDataComponent } from './Components/user-data/user-data.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './Pipe/filter.pipe';
import { UpdateUserFormComponent } from './Pages/update-user-form/update-user-form.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    UserFormComponent,
    ListUserComponent,
    UserDataComponent,
    FilterPipe,
    UpdateUserFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
