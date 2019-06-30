import { Component} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( public afAuth: AngularFireAuth, private router: Router) {
    afAuth.authState.subscribe( x => {
      console.log(x)
      if(x == null) router.navigate(['/login'])
      else router.navigate(['/dashboard'])
    })
  }
}
