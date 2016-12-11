import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListComponent } from "./list.component";
import { AuthGuard } from "../auth-guard.service";


const listRoutes: Routes = [
  { path: "", component: ListComponent, canActivate: [AuthGuard] },
];
export const listRouting: ModuleWithProviders = RouterModule.forChild(listRoutes);