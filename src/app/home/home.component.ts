import {Component} from '@angular/core';
import { MsalService} from "@azure/msal-angular";
import { Router } from '@angular/router'
@Component({
    selector: 'app-todo-list',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent {
  loggedIn: boolean;
  constructor(private authSer: MsalService, private route: Router ){
    if (this.authSer.getUser()) {
      this.loggedIn = true;
    }
    else {
      this.loggedIn = false;
    }
  }


  ngOnInit() {

  }
  
  login() {
    this.authSer.loginPopup(["user.read", "api://6f8ac81a-e1d0-43ac-89e9-79364e5091e6/access_as_user"])
      .then((data)=>{
        console.log(data);
        this.route.navigate(['/customer']);
      })
  }

  regis() {
        this.route.navigate(['/regis']);
  }
}
