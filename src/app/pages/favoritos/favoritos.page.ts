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
    //this.loadFavoritos(); 
  }

  ngOnInit() {
    this.loadFavoritos();
  }
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
  async removeFavorito(item){
    await this.dataService.removeData(item);
    this.loadFavoritos();
  }
  toggleCard(escola: Escola) {
    escola.expandido = !escola.expandido;
  }
}
