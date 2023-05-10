import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
    this.authService.userAccount$.subscribe(console.log);
  }

  ngOnInit() {
    console.log('Hello Dos!');

    this.doSomething();
  }

  doSomething() {
    console.log('Hello World!');
  }
}
