import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthentificated: boolean = false;
  user: User;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.authService.isAuthentificated.subscribe(
      (data: boolean) => this.isAuthentificated = data
    );
    this.userService.getUser().subscribe(
      (user: User) => this.user = user
    );
  }

  logout(): void {
    this.authService.logout();
  }


}
