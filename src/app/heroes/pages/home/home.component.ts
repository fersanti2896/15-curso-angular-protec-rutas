import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container {
      margin: 30px;
    }
  `
  ]
})
export class HomeComponent {

  constructor(private router: Router) { }

  logout() {
    /* Ir al backend */
    this.router.navigate(['./auth']);
  }
}
