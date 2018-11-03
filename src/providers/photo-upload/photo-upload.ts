import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Api } from '../api/api' 

/*
  Generated class for the PhotoUploadProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PhotoUploadProvider {

  constructor(private transfer: FileTransfer, private file: File, private api: Api) { }

  uploadImage(URI, username, creatingAccount=true) {
    var p = new Promise((resolve, reject)=> {
      const fileTransfer: FileTransferObject = this.transfer.create();
      let body = {}
      let url = ""
      if(creatingAccount == true) {
        url = '/api/add_picture';
        body["username"] = username;
      } else {
      //TODO ADD Assasination Attempt URL                                          
      }
  
      let options: FileUploadOptions = {
        fileKey: 'imagefile',
        fileName: 'name.jpg',
        headers: {}
     }            
      fileTransfer.upload(URI, url, options,true).then((result) => {
          resolve(result.response);
      }).catch((err) => {
        console.log(err);
      });
    });
    return p;
  }
}
