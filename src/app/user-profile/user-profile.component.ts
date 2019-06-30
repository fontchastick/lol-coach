import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'app/services/database.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user= {pseudo: "voui", role: "", server: "", decription: ""}

  constructor(public db: AngularFireDatabase, public auth: AngularFireAuth) { }

  saveDatas() {
    
  }

  ngOnInit() {
    this.auth.authState.subscribe(User => {
      this.db.object('Users/'+ User.uid).valueChanges()   
        .subscribe(x => {
          let bridge: any = x
          this.user = bridge
        })
     })
  }

}
