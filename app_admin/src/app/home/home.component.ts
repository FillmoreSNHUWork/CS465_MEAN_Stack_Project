import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { SharedModule } from '../shared_module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void { }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
