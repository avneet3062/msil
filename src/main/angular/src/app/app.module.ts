import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { Page404Component } from './pages/404/page404.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { User } from './providers/user';
import { CustomHttpService } from './providers/custamHTTP';
import { StorageService } from './providers/localStorage';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [User, CustomHttpService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
