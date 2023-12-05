import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FirestoreModule } from '@angular/fire/firestore';  // Cambié AngularFirestoreModule a FirestoreModule

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    FirestoreModule,  // Cambié AngularFirestoreModule a FirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

