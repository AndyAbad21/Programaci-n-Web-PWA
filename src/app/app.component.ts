import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import 'firebase/compat/firestore';
import Nota from './interfaces/nota';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NotasWeb';

  notas: Nota[];

  nuevaNota: Nota = { titulo: '', detalle: '' };

  notaParaEditar: Nota | null = null;

  ngOnInit() {
    try {
      if (navigator.onLine) {
        this.firestore.getNotas().subscribe(
          notasDB => {
            this.notas = notasDB || [];
            localStorage.setItem('notas', JSON.stringify(this.notas));
            console.log('Con conexión', this.notas);
          }
        );
      } else {
        this.notas = this.obtenerLocalStorage();
        console.log('Sin conexión', this.notas);
      }
    } catch (error) {
      console.log('Error general', error);
    }
  }
  

  constructor(private firestore: FirestoreService) {
    this.notas = [
      // titulo: 'Prueba',
      // detalle: 'mi nueva nota'
    ];
  }

  private fusionarNotas(notasLocal: Nota[], notasDB: Nota[]): Nota[] {
    const notasFusionadas = [...notasLocal];

    for (const notaDB of notasDB) {
      const index = notasFusionadas.findIndex(nota => nota.id === notaDB.id);

      if (index === -1) {
        // Si la nota de la DB no existe localmente, agregarla
        notasFusionadas.push(notaDB);
      } else {
        // Si la nota de la DB ya existe localmente, actualizarla
        notasFusionadas[index] = notaDB;
      }
    }

    return notasFusionadas;
  }

  async onSubmit(titulo: HTMLInputElement, detalle: HTMLTextAreaElement) {
    try {
      let nota: Nota = this.nuevaNota;
      titulo.value = '';
      detalle.value = '';
      this.grabarLocalStorage(nota);
      const response = await this.firestore.addNota(nota);
      console.log('Respuesta del servicio:', response);

      // this.firestore.getNotas().subscribe(notas => {
      //   console.log(notas);
      // })
    } catch (error) {
      console.error('Error en la operación:', error);
    }
  }

  grabarLocalStorage(nota: Nota) {
    this.notas.push(nota);
    localStorage.setItem('notas', JSON.stringify(this.notas));
    console.log(this.notas);
  }

  obtenerLocalStorage(): Nota[] {
    let notasString = localStorage.getItem('notas');
    if (notasString === null) {
      this.notas = [];
    } else {
      this.notas = JSON.parse(notasString);
    }
    return this.notas;
  }

  eliminarLocalStorage(nota: Nota) {
    this.notas = this.notas.filter(n => n !== nota);
    localStorage.setItem('notas', JSON.stringify(this.notas));
  }


  async list() {
    try {
      this.firestore.getNotas().subscribe(notas => {
        console.log(notas);
      })
    } catch (error) {
      console.error('Error en la operación:', error);
    }
  }
  async deleteNota(nota: Nota) {
    try {
      const response = await this.firestore.deleteNotas(nota);
    } catch (error) {
      console.error('Error en la operación:', error);
    }
  }

  editarNota(nota: Nota) {
    // Copia la nota para editar y abre el bloque de edición
    this.notaParaEditar = { ...nota };
  }

  editarNotaSubmit() {
    // Llama a la función de actualización y cierra el bloque de edición
    this.updateNota();
  }

  async updateNota() {
    try {
      // Verifica si notaParaEditar no es null antes de realizar la actualización
      if (this.notaParaEditar) {
        const response = await this.firestore.updateNota(this.notaParaEditar);
        console.log('Respuesta del servicio:', response);
        // Actualiza la lista de notas después de la edición
        this.list();
        // Resetea la notaParaEditar
        this.notaParaEditar = null;
      }
    } catch (error) {
      console.error('Error en la operación:', error);
    }
  }
}
