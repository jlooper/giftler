import { NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { listRouting } from "./list.routes";
import { ListComponent } from "./list.component";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    listRouting
  ],
  declarations: [    
    ListComponent
  ]
})
export class ListModule {}