import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultasDetalhesPage } from './consultas-detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultasDetalhesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultasDetalhesPageRoutingModule {}
