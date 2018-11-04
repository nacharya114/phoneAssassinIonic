import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { Api } from '../../providers/api/api';
import { User } from '../../providers/user/user'
import {PhotoUploadProvider} from '../../providers/photo-upload/photo-upload'
import { createOrJoin } from '../';

/**
 * Generated class for the CreateUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html',
})
export class CreateUserPage {



  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, 
              public api: Api, private user: User, private photUpload: PhotoUploadProvider) {

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateUserPage');
    const options: CameraOptions = {
      quality: 20,
      destinationType: this.camera.DestinationType.DATA_URL ,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(this.user);
      let formData: FormData = new FormData(); 
      formData.append('username',  this.user._user["username"]); 
      formData.append('imagefile', base64Image); 
      let reqOpts = {
        headers: {
          'Content-Type':  "application/x-www-form-urlencoded"
        }
      }
      this.api.post("add_picture",  formData).subscribe((resp)=> {
        console.log(resp);
       this.navCtrl.push(createOrJoin); 
      });
      // this.postImage(base64Image).then((resp) => {
      //   console.log(resp);      
      //   //this.navCtrl.push(Create/Join Game);  
      // });
      // this.photUpload.uploadImage(imageData, this.user["username"]).then((resp: any) => {
      //   if (resp.status == 200) {
      //     //this.navCtrl.push(GameHubPage)
      //   }
      // });
  
     }, (err) => {
      // Handle error
     });
  }
  postImage(image) {
    let body = {
      "username": this.user._user["username"],
      "imagefile": image 
    }
    return this.api.post("add_picture", body).toPromise()
  }
  
}
