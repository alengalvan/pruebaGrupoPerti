import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { NuevaCuentaComponent } from './componentes/nueva-cuenta/nueva-cuenta.component';
import { DetallePokemonComponent } from './componentes/detalle-pokemon/detalle-pokemon.component';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, NuevaCuentaComponent, DetallePokemonComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule], 
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, DatePicker, LocalNotifications],
  bootstrap: [AppComponent],
})
export class AppModule {}
