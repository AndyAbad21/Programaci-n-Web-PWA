import { Component, OnInit } from '@angular/core';
import Nota from 'src/app/interfaces/nota';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-nota-list',
  templateUrl: './nota-list.component.html',
  styleUrls: ['./nota-list.component.scss']
})
export class NotaListComponent implements OnInit {

  notas: Nota[];

  constructor(private firestoreService: FirestoreService){
    this.notas = [{
      titulo: 'Prueba',
      detalle: 'mi nueva nota'
    }];
  }
  ngOnInit(): void{
    this.firestoreService.getNotas().subscribe(notas => {
      console.log(notas);
    })
  }
}
