import { Component, OnInit } from '@angular/core';
import {BroadcastService} from "@azure/msal-angular";
import { MsalService} from "@azure/msal-angular";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subscription} from "rxjs/Subscription";
import { Observable } from 'rxjs/Rx'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import axios from 'axios';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  
  name:any;
  password: any;
  email: any;
  username: any;
  public registrationForm  : FormGroup;
  public subscription: Subscription;
  url = "https://graph.microsoft.com/v1.0/users";
  token_user: any;


  constructor(public router: Router,private fb: FormBuilder, private authService: MsalService, private http: HttpClient, private broadcastService: BroadcastService) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],  
      })
  }

  ngOnInit() {
    var url = 'https://login.microsoftonline.com/e403cb99-0806-42e8-bf6f-35ed9586ce6f/oauth2/token';
    var requestParams = {
        grant_type: 'client_credentials',
        client_id: '6f8ac81a-e1d0-43ac-89e9-79364e5091e6',
        client_secret: 'Oh]FLQkF+XMRyJ6RC*W/d55ELmDt2y/o',
        resource: 'https://graph.microsoft.com'
    };
    var headers ={
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
    axios.post(url, requestParams)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }

  createUser(){
    console.log('click one')

    const user = {
      accountEnabled: true,
      displayName: this.name,
      mailNickname: this.username,
      userPrincipalName: this.email,
      "passwordProfile": {
        forceChangePasswordNextSignIn: true,
        password: this.password
      }
    }

    console.log(user)

    
    
    this.http.post(this.url, user)
      .map(response => {
        console.log(response);
        this.router.navigate(['/login'])
      })
      .catch(response => (Observable.throw(response)
      ))
  }

}
