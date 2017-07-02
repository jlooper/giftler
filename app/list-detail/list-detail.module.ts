import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";

import { listDetailRouting } from "./list-detail.routes";
import { ListDetailComponent } from "./list-detail.component";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    listDetailRouting
  ],
  declarations: [
    ListDetailComponent
  ]
})
export class ListDetailModule { }
