import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor( public afAuth: AngularFireAuth ) { }

  loginForm = new FormGroup({
    pseudo: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl(''),
  });

  submitForm() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.loginForm.value.pseudo + "@yahoo.com", this.loginForm.value.password)
    .then(x =>  console.log(x))
    .catch(error => alert(error));
  }

  ngOnInit() {
  }

}
