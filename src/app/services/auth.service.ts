import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { UserService } from './user.service';

const api = {
  auth: environment.serverUrl + '/api/users',
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    this.isAuth$.next(!!this.getToken());
    // this.userService.saveUser(this.getUserId());
  }

  createNewUser(user: User, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        api.auth + '/signup',
        { ...user, password })
        .subscribe(
          () => {
            this.login(user.email, password).then(
              () => {
                resolve(true);
              }
            ).catch(
              (error) => {
                reject(error);
              }
            );
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        api.auth + '/login',
        { email, password })
        .subscribe(
          (authData: { token: string, userId: string }) => {
            localStorage.setItem('userId', authData.userId);
            localStorage.setItem('token', authData.token);
            this.isAuth$.next(true);
            this.userService.saveUser(authData.userId);
            resolve(true);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  logout() {
    this.isAuth$.next(false);
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  get isAuthentificated() {
    return this.isAuth$.asObservable();
  }
}
