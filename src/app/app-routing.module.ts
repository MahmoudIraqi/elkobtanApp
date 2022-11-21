import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeContainerComponent} from "./components/home-container/home-container.component";
import {HomepageComponent} from "./components/homepage/homepage.component";

const routes: Routes = [
  {
    path: '', component: HomeContainerComponent, children: [
      {path: '', component: HomepageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
