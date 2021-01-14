import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecondScreenComponent } from './components/second-screen/second-screen/second-screen.component';
import { WasteInfoComponent } from './components/second-screen/waste-info/waste-info.component';

const routes: Routes = [
  { path: '', component: SecondScreenComponent },
  { path: ':id', component: WasteInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
