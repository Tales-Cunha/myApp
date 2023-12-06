import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultasDetalhesPageRoutingModule } from './consultas-detalhes-routing.module';

import { ConsultasDetalhesPage } from './consultas-detalhes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultasDetalhesPageRoutingModule
  ],
  declarations: [ConsultasDetalhesPage]
})
export class ConsultasDetalhesPageModule {}
