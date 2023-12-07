import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Nota from '../interfaces/nota';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  // private path = '/Notas';

  constructor(private firestore: Firestore) {}

  async addNota(nota: Nota){
    try {
      const notaRef = collection(this.firestore,'Notas');
      return addDoc(notaRef,nota) ;
    } catch (error) {
      console.error('Error al agregar nota:', error);
      throw error;
    }
  }
  getNotas(): Observable<Nota[]>{
    const notaRef = collection(this.firestore,'Notas');
    return collectionData(notaRef,{idField: 'id'}) as Observable<Nota[]>
  }

  deleteNotas(nota: Nota){
    const notaDocRef = doc(this.firestore, `Notas/${nota.id}`);
    return deleteDoc(notaDocRef);
  }

  async updateNota(nota: Nota) {
    try {
      const notaDocRef = doc(this.firestore, `Notas/${nota.id}`);
      return setDoc(notaDocRef, nota);
    } catch (error) {
      console.error('Error al actualizar nota:', error);
      throw error;
    }
  }
}