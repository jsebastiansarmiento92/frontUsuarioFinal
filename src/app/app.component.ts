import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
export const API_BASE_URL = 'http://localhost:8080';
export const ACCESS_TOKEN = 'accessToken';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'usuarioFinalFront';
}
