import { Component } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private route: Router) {}
  /*
   Função que é chamada quando o botão é clicado e redireciona para a página de consulta
  */
  onButtonClick() {
    let inputvalue1 = (<HTMLInputElement>document.getElementById("input1")).value;
    let inputvalue2 = (<HTMLInputElement>document.getElementById("input2")).value;
    this.route.navigate(['/consultas', inputvalue1, inputvalue2]);
  }
}
