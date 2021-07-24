import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatCardComponent } from './mat-card/mat-card.component';


const routes: Routes = [
  { path: '', component: MatCardComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
