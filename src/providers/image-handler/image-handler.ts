import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { File } from '@ionic-native/file';
/*
  Generated class for the ImageHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageHandlerProvider {

  constructor(public http: HttpClient, private file: File) {
    console.log('Hello ImageHandlerProvider Provider');
  }


  getBlob (b64Data) {
    let contentType: any = 'image/jpeg';
    const sliceSize = 512;

    b64Data = b64Data.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');

    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }

      let byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    let blob = new Blob(byteArrays, {type: contentType});
   
    return blob;
  }

  saveFile(blob) {
    let filename = "target.jpeg";
    let directory = this.file.dataDirectory;

    this.file.writeFile(directory, filename, blob);

    return directory + filename;

  }

  
}
