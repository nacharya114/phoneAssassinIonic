import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { User } from '../../providers/user/user'
import {Lobby} from '../'

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

  gamePhrase: { game_id: string} = {
    game_id: "Hello"
};

  constructor(public navCtrl: NavController, public navParams: NavParams, private user: User,
            public api: Api) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HubPage');
  }

  createGame() {
    this.user.setCreatedGameStats(true);
    this.user.setGameId(this.gamePhrase);
    let body = {
      "username": this.user._user["username"],
       "game_id": this.gamePhrase.game_id
    };

    let seq = this.api.get('game/create', body).share();

    seq.subscribe((res: any) => {

      // If the API returned a successful response, mark the user as logged in
      console.log(res);
      if (res.status == 'success') {
        console.log(this.user._user);
        this.navCtrl.push(Lobby);

      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });
    
    
  }

  joinGame() {
    this.user.setCreatedGameStats(false);
    this.user.setGameId(this.gamePhrase);
    let body = {
      "username": this.user._user["username"],
      "game_id": this.gamePhrase.game_id
    };
    let seq = this.api.get('game/join', body).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      console.log(res);

      if (res.status == 200) {
        this.navCtrl.push(Lobby);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });
   
  }
}
