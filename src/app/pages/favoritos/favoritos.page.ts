import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Escola } from 'src/app/services/escolas.service';

 @Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  listaFavoritos = [];
  coEntidade: string;
  noEntidade: string;
  constructor(private dataService: DataService, private router: Router) {
    this.loadFavoritos(); 
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state;
    this.coEntidade = state['coEntidade'];
    this.noEntidade = state['noEntidade'];
  }

  ngOnInit() {
    this.loadFavoritos();
  }
  async loadFavoritos(){
    this.listaFavoritos = await this.dataService.getData();
  }
  async removeFavorito(item){
    await this.dataService.removeData(item);
    this.loadFavoritos();
  }
  toggleCard(escola: Escola) {
    escola.expandido = !escola.expandido;
  }
}
