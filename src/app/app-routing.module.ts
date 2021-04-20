import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/auth/login.component';
import { SignupComponent } from './page/auth/signup.component';
import { TimelineComponent } from './page/timeline/timeline.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: TimelineComponent, canActivate: [AuthGuard] },
  // { path: 'course', component: CourseDetailsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]

})
export class AppRoutingModule { }
