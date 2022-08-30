import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { WebClientService } from 'src/app/services/web-cliente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public busqueda: string = 'drama';
  public limite: number = 20;
  public inicio: number = 0;
  public listaPeliculas: any = [];
  public listaServicio: any = [];
  public pokemonsPorPantalla: number = 11;
  public cuentaInicialPokemon: number = 1;

  constructor(public webService: WebClientService, public utilitiesService: UtilitiesService) { }

  async ngOnInit() {
    const loading = await this.utilitiesService.loadingAsync();
    loading.present();
    await this.cuantosPokemonsTraemos(this.pokemonsPorPantalla);
    loading.dismiss();
  }

  public async obtenerPokemon(id: number){
    //  let lista = await this.webService.getAsync(`https://api.tvmaze.com/search/shows?q=${this.busqueda}`)
    let pokemon = await this.webService.getAsync(`https://pokeapi.co/api/v2/pokemon/${id}`)
    if(pokemon != null){
      this.listaServicio.push(pokemon)
    }
    console.log(this.listaServicio)
  }

  public async cuantosPokemonsTraemos(numeroPokemons: number){
    for (let i = this.cuentaInicialPokemon; i < numeroPokemons; i++) {
      await this.obtenerPokemon(i)
    }
    this.cuentaInicialPokemon =+ numeroPokemons;
    console.log(this.cuentaInicialPokemon)
  }

  public mostrarModal(pokemon: any){
    this.utilitiesService.presentModal(pokemon);
  }


}
