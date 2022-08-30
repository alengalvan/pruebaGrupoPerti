import { Injectable } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { DetallePokemonComponent } from '../componentes/detalle-pokemon/detalle-pokemon.component';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  website = { name: 'Edupala.com', created: '12-July-2016', topic: 'Tutorial on Ionic' };

  constructor(private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController, 
    public modalController: ModalController,
    private localNotifications: LocalNotifications) { }

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  public async alert(title: string, message: string, nombreBoton?: string) {
    this.alertCtrl.create({
      cssClass: "alertCustom",
      mode: "ios",
      header: title,
      message: message,
      buttons: [{
        text: nombreBoton ? nombreBoton : "Aceptar"
      }]
    }).then(alert => {
      alert.present();
    });
  }

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  public toast(message: string, duration: number = 3000, position: any = "middle") {
    this.toastController.create({
        message: message,
        cssClass: "toast",
        duration: duration,
        position: position //"top" | "bottom" | "middle"
    }).then(toast => {
        toast.present();
    });
}

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  public async loadingAsync(mensaje?: string) {
    return await this.loadingController.create({
      message: mensaje? mensaje : null
        // cssClass: 'custom-loading',
        // spinner: null,
    });
  }


  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  async presentModal(pokemon: any) {
    const modal = await this.modalController.create({
      component: DetallePokemonComponent,
      componentProps: { pokemon: pokemon },
      cssClass: 'setting-modal',
      backdropDismiss: false,
    });
    return await modal.present();
  }

  //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  notificacion(mensaje: string) {
    this.localNotifications.schedule({
      id: 1,
      text: mensaje,
      data: { secret: 'secret' }
    });
  }
}
