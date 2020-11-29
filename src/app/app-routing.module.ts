import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from './event/event.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { StrategyComponent } from './strategy/strategy.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', redirectTo: '/events', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'events', component: EventComponent},
  {path: 'strategies', component: StrategyComponent},
  {path: 'profile', component: UserComponent},
  {path: '**', redirectTo: '/events', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
