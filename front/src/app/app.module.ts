import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AddNoteComponent } from './pages/add-note/add-note.component';
import {RouterModule, Routes} from "@angular/router";
import { NotesComponent } from './pages/notes/notes.component';
import { LoginComponent } from './pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptor/auth.interceptor";

const appRoutes: Routes = [
  {path: 'note/add', component: AddNoteComponent},
  {path: 'note', component: NotesComponent},
  {path: 'login', component: LoginComponent},
  //{path: '', redirectTo: '/accueil', pathMatch: 'full'},
  //{path: '**', component: InconnuComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AddNoteComponent,
    NotesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
