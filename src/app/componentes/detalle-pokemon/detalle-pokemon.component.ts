import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-pokemon',
  templateUrl: './detalle-pokemon.component.html',
  styleUrls: ['./detalle-pokemon.component.scss'],
})
export class DetallePokemonComponent implements OnInit {

  constructor(public modal: ModalController) { }

  ngOnInit() {}

  closeModal() {
     this.modal.dismiss(null, 'cancel'); 
   }
}
