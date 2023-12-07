// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule} from '@angular/forms';
import { NotaListComponent } from './components/nota-list/nota-list.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    NotaListComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
         provideFirebaseApp(() => initializeApp({"projectId":"proyecto-e53e0","appId":"1:619628939478:web:dfe722b653e5827327a177","storageBucket":"proyecto-e53e0.appspot.com","apiKey":"AIzaSyDUL8MljY6qGxpKnOZfmmE-l8Qn-PdRunU","authDomain":"proyecto-e53e0.firebaseapp.com","messagingSenderId":"619628939478","measurementId":"G-V81NWXLTTR"})),
         provideFirestore(() => getFirestore()),
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }), // Agrega FormsModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
