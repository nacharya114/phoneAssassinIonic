import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { User } from '../../providers/user/user'

/**
 * Generated class for the HubPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hub',
  templateUrl: 'hub.html',
})
export class HubPage {

  gamePhrase: { phrase: string} = {
    phrase: "Hello"
};

  constructor(public navCtrl: NavController, public navParams: NavParams, private user: User,
            public api: Api) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HubPage');
  }

  createGame() {
    let body = {
      "username": this.user._user["username"],
       "game_id": this.gamePhrase.phrase
    };

    let seq = this.api.get('game/create', body).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      console.log(res);
      if (res.status == 'success') {
        console.log(this.user._user);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });
    
    
  }

  joinGame() {
    let body = {
      "username": this.user._user["username"],
      "game_id": this.gamePhrase.phrase
    };
    let seq = this.api.get('game/join', body).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      console.log(res);
      if (res.status == 'success') {
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });
   
  }
}
