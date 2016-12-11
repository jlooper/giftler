import { NativeScriptModule } from "nativescript-angular/platform";
import { NgModule } from "@angular/core";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { authProviders, appRoutes } from "./app.routes";
import { AppComponent } from "./app.component";
import { BackendService, FirebaseService, UtilsService } from "./services";

import { LoginModule } from "./login/login.module";
import { ListModule } from "./list/list.module";
import { ListDetailModule } from "./list-detail/list-detail.module";

@NgModule({
  providers: [
    BackendService,
    FirebaseService,
    UtilsService,
    authProviders
  ],
  imports: [
    NativeScriptModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(appRoutes),
    LoginModule,
    ListModule,
    ListDetailModule    
  ],
  declarations: [
      AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
