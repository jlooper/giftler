import {Component, OnInit, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router, ActivatedRoute} from '@angular/router';
import { FirebaseService } from "../services";
import {Gift} from "../models";
//camera imports
import { Image } from "ui/image";
import { ImageSource, fromAsset } from "image-source";
import { ImageAsset } from "image-asset";

import * as camera from "nativescript-camera";
import * as fs from "file-system";

var imageModule = require("ui/image");
var img;
var myImageSource: ImageSource;

@Component({
  moduleId: module.id,
  selector: "gf-list-detail",
  templateUrl: "list-detail.html"
})
export class ListDetailComponent implements OnInit {
  
  id: string;
  name: string;
  description: string;
  image: ImageSource;
  private sub: any;
  public gift: Observable<any>;
  
  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ngZone: NgZone,
        private firebaseService: FirebaseService
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
          }
        });
      });
    });  
  }

takePhoto() {
    camera.takePicture()
        .then(imageAsset => {
            console.log("Result is an image asset instance");
            fromAsset(imageAsset).then(res => {
                myImageSource = res;
                this.image = myImageSource;
            })
        }).catch(function (err) {
            console.log("Error -> " + err.message);
        });
}

saveToFile(): void {

    var knownPath = fs.knownFolders.documents();
    var folderPath = fs.path.join(knownPath.path, "Giftler");

    var folder = fs.Folder.fromPath(folderPath);
    var path = fs.path.join(folderPath, "myPhoto.png");

    var saved = myImageSource.saveToFile(path, "png");
    console.log(saved);
}

editGift(id: string){
    this.firebaseService.editGift(id,this.description).then((result:any) => {
          alert(result)
        }, (error: any) => {
          alert(error);
        }); 
}



}