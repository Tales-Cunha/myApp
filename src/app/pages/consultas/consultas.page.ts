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
     private dataService: DataService,) {
      this.loadFavoritos();
     }
  ngOnInit() {
    this.carregarEscolaFiltrada();
  }
  /*
   Funcao que carrega as escolas filtradas pelo nome da entidade e codigo da entidade passados como parametro
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
    });
  }
  async loadFavoritos(){
    this.listaFavoritos = await this.dataService.getData();
  }

  async addFavorito(escola: Escola){
    if(this.listaFavoritos.find(x => x.coEntidade == escola.coEntidade)){ return; } 
    await this.dataService.addData(escola);
    this.loadFavoritos();
  }

  async removeFavorito(item: Escola){
    const id = this.listaFavoritos.findIndex(x => x.coEntidade == item.coEntidade);
    await this.dataService.removeData(id);
    this.listaFavoritos.splice(id, 1)
    console.log(this.listaFavoritos);
  }
  toggleCard(escola: Escola) {
    escola.expandido = !escola.expandido;
  }
}
