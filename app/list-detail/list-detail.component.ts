import {Component, OnInit, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router, ActivatedRoute} from '@angular/router';
import { FirebaseService, UtilsService } from "../services";
import {Gift} from "../models";
import * as enums from 'ui/enums';
import * as imageSource from 'image-source';
import { isAndroid } from "platform";
import { View } from "ui/core/view";

import * as camera from "nativescript-camera";
import * as fs from "file-system";

var imageModule = require("ui/image");
var img;

@Component({
  moduleId: module.id,
  selector: "gf-list-detail",
  templateUrl: "list-detail.html"
})
export class ListDetailComponent implements OnInit {
  
  id: string;
  name: string;
  description: string;
  imagepath: string;
  image: any;
  private sub: any;
  private imagePath: string;
  private uploadedImageName: string;
  private uploadedImagePath: string;
  public gift: Observable<any>;
  
  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ngZone: NgZone,
        private firebaseService: FirebaseService,
        private utilsService: UtilsService
    ) {}

 ngOnInit() {
   camera.requestPermissions();
   this.sub = this.route.params.subscribe((params: any) => {
      this.id = params['id'];
      this.firebaseService.getMyGift(this.id).subscribe((gift) => {
        this.ngZone.run(() => {
          for (let prop in gift) {
            //props
            if (prop === "id") {
              this.id = gift[prop];
            }
            if (prop === "name") {
              this.name = gift[prop];
            }
            if (prop === "description") {
              this.description = gift[prop];
            }
            if (prop === "imagepath") {
              this.imagepath = gift[prop];
            }                       
          }
        });
      });
    });  
  }

takePhoto() {
  let options = {
            width: 300,
            height: 300,
            keepAspectRatio: true,
            saveToGallery: true
        };
    camera.takePicture(options)
        .then(imageAsset => {
            imageSource.fromAsset(imageAsset).then(res => {
                this.image = res;
                //save the source image to a file, then send that file path to firebase
                this.saveToFile(this.image);
            })
        }).catch(function (err) {
            console.log("Error -> " + err.message);
        });
}

saveToFile(res){
  let imgsrc = res;
        this.imagePath = this.utilsService.documentsPath(`photo-${Date.now()}.png`);
        imgsrc.saveToFile(this.imagePath, enums.ImageFormat.png);       
}


editGift(id: string){
  if(this.image){
    //upload the file, then save all
    this.firebaseService.uploadFile(this.imagePath).then((uploadedFile: any) => {
          this.uploadedImageName = uploadedFile.name;
          //get downloadURL and store it as a full path;
          this.firebaseService.getDownloadUrl(this.uploadedImageName).then((downloadUrl: string) => {
            this.firebaseService.editGift(id,this.description,downloadUrl).then((result:any) => {
              alert(result)
            }, (error: any) => {
                alert(error);
            });
          })
        }, (error: any) => {
          alert('File upload error: ' + error);
        });
  }
  else {
    //just edit the description
    this.firebaseService.editDescription(id,this.description).then((result:any) => {
        alert(result)
    }, (error: any) => {
        alert(error);
    });
  }    
}

}