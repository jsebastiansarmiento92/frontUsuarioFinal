import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/auth/token.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  isLogin = false;
  roles: string[];
  authority: string;
  
  constructor(private tokenService: TokenService,
    private router: Router) { }

  ngOnInit() {
    console.log("verificacion is login");
    if (localStorage.getItem("isLoggedin")) {
      this.isLogin = true;
    }
  }
  logOut(): void {
    if (confirm("desea cerrar sesion?")) {
      console.log("cerrar sesion");
      this.tokenService.logOut();
      this.isLogin = false;
      this.authority = '';
      //this.router.navigate([""]);
    } else {

    }
  }
  login() {
    this.router.navigate(["login"]);

  }
  inicio() {
    this.router.navigate(["inicio"]);

  }
  getIslogin() {
    return localStorage.getItem("isLoggedin");
  }

  

}
