import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user/user';
import { Api } from '../../providers/api/api';
/**
 * Generated class for the LobbyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lobby',
  templateUrl: 'lobby.html',
})
export class LobbyPage {
  value : string = "0";
  constructor(public navCtrl: NavController, public navParams: NavParams, private  user: User, public api: Api){
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad LobbyPage');
    this.gamePlayers().then((res)=> {
      this.value = res.toString();
    });

  }

  update() {
    let gameStarted;
    let players;
    console.log(this.user.game_id);
    this.hasGameStarted().then((res)=>{
      gameStarted = res;
    });
    this.gamePlayers().then((res)=> {
      this.value = res.toString();
    });
    if(gameStarted) {
      //Go to gameplay screen
    }

  }
  hasGameStarted() {
    let seq = this.api.get('game/status', this.user.game_id).share();

    let p = new Promise((resolve, reject) => {
      seq.subscribe((res: any) => {

        // If the API returned a successful response, mark the user as logged in
        //console.log(res);
        if (res.status == '200') {
          //console.log(this.user._user);
          resolve(res.succesful_start); //TODO

        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });
    });
    return p;

  }

  gamePlayers() {
    let seq = this.api.get('game/numAlive', this.user.game_id).share();
    let p  = new Promise((resolve, reject) => {
      seq.subscribe((res: any) => {

        // If the API returned a successful response, mark the user as logged in
        //console.log(res);
        if (res.status == '200') {
          //console.log(this.user._user);
          resolve(res.num_alive); //TODO

        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });
    });
  return p;
  }
   poll(fn, timeout, interval) {
    var endTime = Number(new Date()) + (timeout || 2000);
    interval = interval || 100;
    var checkCondition = function(resolve, reject) {
      // If the condition is met, we're done!
      var result = fn();
      if(result == 1) {
        resolve(result);
      }
      // If the condition isn't met but the timeout hasn't elapsed, go again
      else if (Number(new Date()) < endTime) {
        setTimeout(checkCondition, interval, resolve, reject);
      }
      // Didn't match and too much time, reject!
      else {
        reject();
      }
    };

    return new Promise(checkCondition);
  }



}
