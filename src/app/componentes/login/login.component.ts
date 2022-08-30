import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { WebClientService } from 'src/app/services/web-cliente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public usuarioGuardadoLocal: any = null;

  public formLogin = this.fb.group({
    usuario: ['', [Validators.required]],
    contrasenia: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder,  
    private navCtrl: NavController,
    public WebClientService: WebClientService) { }

  ngOnInit() {

  }

  ionViewDidEnter(){
    console.log("ionViewDidEnter")
    this.usuarioGuardadoLocal = JSON.parse(localStorage.getItem("usuario"))
  }

  

  public iniciarSesion(){

    if(this.usuarioGuardadoLocal == null){
      console.log("no entras chavo primero registrate")
      return;
    }

    console.log(this.formLogin.controls.contrasenia.value, this.usuarioGuardadoLocal.contrasenia)
    console.log(this.formLogin.controls.usuario.value, this.usuarioGuardadoLocal.usuario)
    
    
    if(this.formLogin.controls.contrasenia.value.trim() == this.usuarioGuardadoLocal.contrasenia &&  
      this.formLogin.controls.usuario.value.trim() == this.usuarioGuardadoLocal.usuario){
        console.log("pasamos la validación")
        this.navCtrl.navigateForward("home")
      }else{
        console.log("no cumplimos la validacion")
      }
  }

  public irCrearCuenta(){
    this.navCtrl.navigateForward("crea-cuenta")
  }




}
