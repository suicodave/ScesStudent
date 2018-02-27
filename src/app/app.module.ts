import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
import { MyMaterialModule } from './my-material/my-material.module';
import { HomeComponent } from './home/home.component';
import { OpenElectionComponent } from './open-election/open-election.component';
import { PublishedElectionComponent } from './published-election/published-election.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ElectionComponent } from './election/election.component';
import { AuthService } from './services/auth.service';
import { ElectionService } from './services/election.service';
import { ShowCandidateComponent } from './modals/show-candidate/show-candidate.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AuthComponent,
    ProfileComponent,
    HomeComponent,
    OpenElectionComponent,
    PublishedElectionComponent,
    ElectionComponent,
    ShowCandidateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MyMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ShowCandidateComponent
  ],
  providers: [AuthService, ElectionService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
