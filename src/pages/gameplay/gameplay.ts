import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { ImageHandlerProvider } from '../../providers/image-handler/image-handler';
import { Api } from '../../providers/api/api';
import { User } from '../../providers/user/user';

/**
 * Generated class for the GameplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gameplay',
  templateUrl: 'gameplay.html',
})
export class GameplayPage {

  picture: any;
  bgImage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, 
              private cameraPreview: CameraPreview, private imagHandler: ImageHandlerProvider, 
              private api: Api, private user: User
      ) {
    this.platform.ready().then(() =>{
      this.picture = null;
      this.bgImage = '../assets\\imgs\\20181103_145908.jpg';

      const cameraPreviewOpts: CameraPreviewOptions = {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height,
        camera: 'rear',
        tapPhoto: false,
        previewDrag: false,
        toBack: true,
        alpha: 1
      };
    
      this.cameraPreview.startCamera(cameraPreviewOpts).then(
        (res)=>{
          console.log("CameraStartSuccess " + res);
      }, 
      (err)=>{
        console.log("CameraFail "+ err);
      });

    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameplayPage');

      // let body = {
      //   username: this.user._user["username"],
      //   game_id: this.user.game_id
      // }    
      let formData: FormData = new FormData(); 
      formData.append('username',  "Sam"); 
      formData.append('game_id', "NewGame1"); 
      // this.api.post('game/target', formData).subscribe((data)=> {
      //   let blob = this.imagHandler.getBlob(data["photo_string"]);
      //   this.bgImage = this.imagHandler.saveFile(blob)

      // });
 

    this.cameraPreview.show();
  }

  // ionViewWillLoad() {
  //   document.getElementsByTagName('html')[0].style.visibility = 'hidden';
  // }

  // ionViewWillLeave() { 
  //   document.getElementsByTagName('html')[0].style.visibility = 'visible';
  // }

  takePicture() {
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1000,
      height: 1000,
      quality: 85
    }
    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      let b64data ='data:image/jpeg;base64,' + imageData;
      let body = new FormData();
        body.append('username', "Sam");
        body.append('imagefile', b64data);
      this.api.post('game/attempt_kill', body).subscribe((res) => {
        
      });
      // this.bgImage = this.imagHandler.saveFile(this.imagHandler.getBlob(b64data));
    }, (err) => {
      console.log(err);
      this.picture = 'assets/img/test.jpg';
    });
  }

  refresh(){
    window['location'].reload();
  }

}
