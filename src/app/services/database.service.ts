import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { ComponentsModule } from 'app/components/components.module';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(public db: AngularFireDatabase, public auth: AngularFireAuth) {   
  }

  getUserProfile(): Observable<any> {
    let user: Observable<any>
    this.auth.authState.subscribe(User => {
     user = this.db.object('Users/'+ User.uid).valueChanges()   
    })
    
    return user
  }

}
