import { Component, OnInit } from '@angular/core';
import { Escola, EscolaService } from 'src/app/services/escolas.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.page.html',
  styleUrls: ['./consultas.page.scss'],
})

export class ConsultasPage implements OnInit {
  escolas = [];
  listaFavoritos = [];
  
  constructor(private escolaService: EscolaService,
    private loadingCtrl: LoadingController,
    private route:ActivatedRoute,
    private dataService: DataService,
    private alertController: AlertController) {
    this.loadFavoritos();
    }
  ngOnInit() {
    this.carregarEscolaFiltrada();
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
  /*
    carregarEscolaFiltrada é uma função que carrega as escolas filtradas pelo código e nome da entidade
    Caso não encontre nenhuma escola, é chamada a função presentAlert
  */
  async carregarEscolaFiltrada() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando escolas...',
      spinner: 'crescent',
    });
    const coEntidade = this.route.snapshot.paramMap.get('coEntidade');
    const noEntidade = this.route.snapshot.paramMap.get('noEntidade');
    await loading.present();
    this.escolaService.getEscolasFiltered(Number(coEntidade),noEntidade).subscribe(res => {
      loading.dismiss();
      this.escolas = res;
      if (this.escolas.length === 0) {
        this.presentAlert('Nenhuma escola encontrada', 'Não há escolas que correspondam aos seus critérios de pesquisa.');
      }
    }, error => {
      loading.dismiss();
      console.error(error);
      this.presentAlert('Erro', 'Ocorreu um erro ao carregar as escolas. Por favor, tente novamente mais tarde.')
    });
  }
  /*
    isFavorito é uma função que recebe uma escola e verifica se ela está na lista de favoritos 
    e é usada para mostrar o botao de adicionar favoritos caso a escola não esteja na lista
  */
  isFavorito(escola: Escola){
    return this.listaFavoritos.find(x => x.coEntidade == escola.coEntidade);
  }
  /*
    funções criadas com o uso do dataService para adicionar e carregar os favoritos
  */
  async loadFavoritos(){
    this.listaFavoritos = await this.dataService.getData();
  }

  async addFavorito(escola: Escola){
    if(this.listaFavoritos.find(x => x.coEntidade == escola.coEntidade)){ return; } 
    await this.dataService.addData(escola);
    this.loadFavoritos();
  }

  toggleCard(escola: Escola) {
    escola.expandido = !escola.expandido;
  }
}
