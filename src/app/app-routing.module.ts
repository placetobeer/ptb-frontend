import {RouterModule, Routes} from '@angular/router';
import {ErrorPageComponent} from './error/error-page/error-page.component';
import {NgModule} from '@angular/core';
import {HubpageComponent} from './hubpage/hubpage.component';

const routes: Routes = [
  {path: 'hubpage', component: HubpageComponent },
  {path: 'error', component: ErrorPageComponent},
  {path: '', redirectTo: '/hubpage', pathMatch: 'full'},
  {path: '**', redirectTo: '/error?message=Page+not+found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
