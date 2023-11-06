import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup,Validators } from '@angular/forms';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  message: any;
  usererror: any;

  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router) {

    this.myForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    })

  }

  ngOnInit() {
  }

  onSubmit(form:any){

    this.authService.login(form.value.email, form.value.password).then((data) => {
      console.log(data);
      this.message = "You have been logged in successfully.";
      this.usererror = null;

      this.router.navigate(['/myblogs'])

    }).catch((error) => {
      console.log(error);
      this.message ="null";
      this.usererror = error;
    })

  }

}