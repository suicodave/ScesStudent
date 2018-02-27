import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';
import { PublishedElectionComponent } from './published-election/published-election.component';
import { ElectionComponent } from './election/election.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth', component: AuthComponent
  },
  {
    path: '', component: IndexComponent, canActivateChild: [AuthGuard], children: [
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'election', component: ElectionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
