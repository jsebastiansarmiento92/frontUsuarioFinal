import { Component } from '@angular/core';
export const API_BASE_URL = 'https://quickdomicilios.herokuapp.com';
export const ACCESS_TOKEN = 'accessToken';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'usuarioFinalFront';
}
