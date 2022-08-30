import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { WebClientService } from 'src/app/services/web-cliente.service';
import { map } from 'rxjs/operators';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
@Component({
  selector: 'app-nueva-cuenta',
  templateUrl: './nueva-cuenta.component.html',
  styleUrls: ['./nueva-cuenta.component.scss'],
})
export class NuevaCuentaComponent implements OnInit {

  myDate:string;
  myTime:string;
  myDateNTime:string;

  public formregistro = this.fb.group({
    nombreCompleto: ['', [Validators.required]],
    usuario: ['', [Validators.required]],
    contrasenia: ['', [Validators.required]],
    fechaRegistro: ['', [Validators.required]]
  });

  public usuarioServicio: any = null;

  get nombreCompleto(){
    return this.formregistro.get("nombreCompleto")
  }
  get usuario() {
    return this.formregistro.get("usuario");
  }

  get contrasenia() {
    return this.formregistro.get("contrasenia");
  }

  get fechaRegistro() {
    return this.formregistro.get("fechaRegistro");
  }


  public mensajesValidacion = {
    nombreCompleto: [
      { type: "required", message: "El campo es requerido." },
    ],
    usuario: [
      { type: "required", message: "El campo es requerido." },
    ],
    contrasenia: [
      { type: "required", message: "El campo es requerido." },
    ],
    fechaRegistro: [
      { type: "required", message: "El campo es requerido." },
    ],
  };

  constructor(private fb: FormBuilder,  
    private navCtrl: NavController, 
    public webService: WebClientService, 
    public utilitiesService: UtilitiesService,
    public datePicker: DatePicker) {}

  async ngOnInit() {
    const loading = await this.utilitiesService.loadingAsync();
    loading.present();

    this.usuarioServicio = await this.webService.getAsync("https://randomuser.me/api")
    this.usuarioServicio = this.usuarioServicio.results[0]
    console.log(this.usuarioServicio)
    this.nombreCompleto.setValue(`${this.usuarioServicio.name.first} ${this.usuarioServicio.name.last}`)
    this.usuario.setValue(`${this.usuarioServicio.login.username}`)
    this.contrasenia.setValue(`${this.usuarioServicio.login.password}`)
    this.fechaRegistro.setValue(this.usuarioServicio.registered.date.split("T")[0])
    loading.dismiss()
  }

  public crearCuenta(){
    localStorage.setItem("usuario", null)
    console.log("entramos a crear cuenta");
    let usuario = {
      nombreCompleto: this.nombreCompleto.value,
      usuario: this.usuario.value,
      contrasenia: this.contrasenia.value,
      fechaRegistro: this.fechaRegistro.value
    };
    console.log(usuario)
    localStorage.setItem("usuario", JSON.stringify(usuario))
    this.navCtrl.navigateForward("login")
    this.utilitiesService.notificacion("Cuenta creada correctamente!")
  }


  showDatepicker(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      okText:"Seleccionar",
      todayText:"hoy"
    }).then(
      date => {
        this.myDate = date.getDate()+"/"+date.toLocaleString('default', { month: 'long' })+"/"+date.getFullYear();
        this.fechaRegistro.setValue(this.myDate)
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

}
