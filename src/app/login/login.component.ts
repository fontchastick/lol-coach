import { Component } from '@angular/core';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})
export class LoginComponent {

  errorMessage: string = '';

  constructor(private router: Router, private fb: FormBuilder, public afAuth: AngularFireAuth) 
  {
  }

  loginForm = new FormGroup({
    pseudo: new FormControl(''),
    password: new FormControl(''),
  });

  submitForm() {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.pseudo + "@yahoo.com", this.loginForm.value.password)
    .then(x =>  console.log(x))
    .catch(error => alert(error));
    console.log(this.afAuth.auth.currentUser)
  }

}
