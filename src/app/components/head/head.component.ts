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

  constructor(private tokenService:TokenService,
    private router: Router) { }

  ngOnInit(){
    if(this.tokenService.getToken){
      this.isLogin=true;
    }
  }
  logOut(): void {
    if(confirm("desea cerrar sesion?")){
      console.log("cerrar sesion");
      this.tokenService.logOut();
      this.isLogin = false;
      this.authority = '';
      this.router.navigate([""]);
    }else{
      
    }
    
}
}
