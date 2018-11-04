import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { ImageHandlerProvider } from '../../providers/image-handler/image-handler'

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
              private cameraPreview: CameraPreview, private imagHandler: ImageHandlerProvider
      ) {
    this.platform.ready().then(() =>{
      this.picture = null;
      this.bgImage = new URL('../assets/imgs/ionball.png');

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
      this.bgImage = this.imagHandler.getBlob('data:image/jpeg;base64,' + imageData);
    }, (err) => {
      console.log(err);
      this.picture = 'assets/img/test.jpg';
    });
  }

  refresh(){
    window['location'].reload();
  }

}
