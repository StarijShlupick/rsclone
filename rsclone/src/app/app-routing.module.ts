import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CognitiveInfoComponent } from './components/second-screen/cognitive-info/cognitive-info.component';
import { WasteInfoComponent } from './components/second-screen/waste-info/waste-info.component';

const routes: Routes = [
  { path: '', component: CognitiveInfoComponent },
  { path: ':title', component: WasteInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
