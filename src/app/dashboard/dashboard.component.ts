import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user={uid: "", pseudo: ""}
  announce= {title: "", document: "", content: "", coachId: "", coachPseudo: "", time: null, views: null, likes: null, key: ""}
  announces: Observable<any[]>;

  constructor(public db: AngularFireDatabase, public auth: AngularFireAuth) { }

  sendAnnounce() {
    this.announce.time = Date.now(),
    this.db.object('Announces/' + this.user.uid + '/' + this.announce.key)
    .set(this.announce);
    this.createAnnounce()
  }

  createAnnounce() {
    this.announce.title = "",
    this.announce.document = "",
    this.announce.content = "",
    this.announce.key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    this.announce.time = Date.now(),
    this.announce.coachId = this.user.uid,
    this.announce.coachPseudo = this.user.pseudo
  }

  deleteAnnounce(item) {
    this.db.object('Announces/' + this.user.uid + '/' + item.key).remove()
  }

  ngOnInit() {
    this.announce.key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),

    this.auth.authState.subscribe(User => {
      this.db.object('Users/'+ User.uid).valueChanges()   
        .subscribe(x => {
          let bridge: any = x
          this.user = bridge
          this.announce.coachId = bridge.uid
          this.announce.coachPseudo = bridge.pseudo
        })
    

    this.announces = this.db.list('Announces/' + User.uid, ref => ref.orderByChild('time')).valueChanges()
  })
    }

}
