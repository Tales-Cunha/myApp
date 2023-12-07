import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Escola } from 'src/app/services/escolas.service';
import { AlertController } from '@ionic/angular';

 @Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  listaFavoritos = [];
  constructor(private dataService: DataService, private router: Router, private alertController: AlertController) { 
  }

  ngOnInit() {
    this.loadFavoritos();
  }
  /*
    presentAlert é uma função que recebe um header e uma mensagem e cria um alerta com esses parâmetros
  */
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  async loadFavoritos(){
    this.listaFavoritos = await this.dataService.getData();
    if (this.listaFavoritos.length === 0) {
      this.presentAlert('Nenhum favorito encontrado', 'Não há escolas que correspondam aos seus critérios de pesquisa.');
    }
  }
  /*
    removeFavorito é uma função que recebe um item e remove o item da lista de favoritos
    Chama a função loadFavoritos para atualizar a lista de favoritos
  */
  async removeFavorito(item){
    await this.dataService.removeData(item);
    this.loadFavoritos();
  }
  toggleCard(escola: Escola) {
    escola.expandido = !escola.expandido;
  }
}
