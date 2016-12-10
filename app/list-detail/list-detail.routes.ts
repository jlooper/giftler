import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListDetailComponent } from "./list-detail.component";

const listDetailRoutes: Routes = [
  { path: "list-detail/:id", component: ListDetailComponent },
];
export const listDetailRouting: ModuleWithProviders = RouterModule.forChild(listDetailRoutes);