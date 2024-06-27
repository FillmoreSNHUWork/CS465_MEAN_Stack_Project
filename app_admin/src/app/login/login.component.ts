import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formError: string = '';
  public credentials = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  public onLoginSubmit(): void {
    this.formError = '';
    console.log('onLoginSubmit called with credentials:', this.credentials);
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
      console.log('Form error: All fields are required');
    } else {
      console.log('Form is valid, calling doLogin with credentials:', this.credentials);
      this.doLogin();
    }
  }

  private doLogin(): void {
    console.log('doLogin called with credentials:', this.credentials);
    const user: User = { name: '', ...this.credentials };
    this.authenticationService.login(user)
      .then(() => {
        console.log('Login successful');
        this.router.navigateByUrl('#');
      })
      .catch((error: Error) => {
        console.log('Login failed', error);
        this.formError = error.message;
      });
  }
}
