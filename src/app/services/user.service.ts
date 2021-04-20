import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const api = {
  auth: environment.serverUrl + '/api/users',
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$: Subject<User> = new Subject();
  private userId: string;

  constructor(private httpClient: HttpClient) { }

  getUser() {
    return this.user$.asObservable();
  }

  setUser(user: User) {
    this.userId = user.id;
    this.user$.next(user);
  }

  saveUser(userId: string) {
    this.httpClient.get<User>(`${api.auth}/${userId}`).subscribe(
      (user: User) => this.setUser(User.mapToUser(user)),
      (error) => console.error(error)
    );
  }

  getUserId() {
    return this.userId;
  }
}
