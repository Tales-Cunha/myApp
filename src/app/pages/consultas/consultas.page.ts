import { Component, OnInit } from '@angular/core';
import { Escola, EscolaService } from 'src/app/services/escolas.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.page.html',
  styleUrls: ['./consultas.page.scss'],
})
export class ConsultasPage implements OnInit {
  escolas = [];
  constructor(private escolaService: EscolaService, private loadingCtrl: LoadingController,private route:ActivatedRoute) {}
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
  toggleCard(escola: Escola) {
    escola.expandido = !escola.expandido;
  }
}
