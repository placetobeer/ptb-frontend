import {Component, OnInit} from '@angular/core';
import { AuthService} from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ptb-frontend';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.autoAuthenticate();
  }
}
