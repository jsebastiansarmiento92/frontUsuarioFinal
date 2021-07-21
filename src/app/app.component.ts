import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
export const API_BASE_URL = environment.url;
export const ACCESS_TOKEN = 'accessToken';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'usuarioFinalFront';
}
