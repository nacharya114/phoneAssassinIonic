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
      "username": this.user["username"],
       "game_id": this.gamePhrase.phrase
    }
    return this.api.post("game/create", body).subscribe((resp)=> {
      console.log(resp); 
      this.navCtrl.push('gameHub'); 
    });
    
  }

  joinGame() {
    let body = {
      "username": this.user["username"],
       "game_id": this.gamePhrase.phrase
    }
    return this.api.post("game/join", body).subscribe((resp)=> {
      console.log(resp); 
      //this.navCtrl.push(wait); 
    });
  }
}