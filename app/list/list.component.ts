import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Page} from "ui/page";
import {BackendService, FirebaseService} from "../services";
import {Gift} from "../models";
import {RouterExtensions} from 'nativescript-angular/router/router-extensions';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: "gf-list",
  templateUrl: "list.html"
})
export class ListComponent implements OnInit {

  id: string;
  name: string;
  date: string;
  description: string;
  imagepath: string;
  UID: string;
  public gift: Gift;

  public gifts$: Observable<any>;
  public message$: Observable<any>;
  
  constructor(private routerExtensions: RouterExtensions,
    private firebaseService: FirebaseService,
    private router: Router
    ) {}

ngOnInit(){
  this.gifts$ = <any>this.firebaseService.getMyWishList();
  this.message$ = <any>this.firebaseService.getMyMessage();
}

  add() {
     this.gift = new Gift(
      this.id,
      this.name,
      this.date,
      this.description,
      this.imagepath,
      this.UID)
    let myGift:string = this.gift.name;
    this.firebaseService.add(myGift).then((message:any) => {
      this.name = "";
      alert(message);
    })   
    
  }

  delete(gift: Gift) {
    this.firebaseService.delete(gift)
      .catch(() => {
        alert("An error occurred while deleting an item from your list.");
      });
  }

  viewDetail(id: string){
    this.router.navigate(["/list-detail", id]);
  }

  logout() {
    this.firebaseService.logout();
    this.routerExtensions.navigate(["/login"], { clearHistory: true } );
  }
}

