import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginComponent } from './page/auth/login.component';
import { SignupComponent } from './page/auth/signup.component';
import { HeaderComponent } from './page/header/header.component';
import { TimelineComponent } from './page/timeline/timeline.component';

@NgModule({
  declarations: [
    AppComponent,
    // CourseDetailsComponent,
    // CreateEditCourseComponent,
    HeaderComponent,
    TimelineComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
