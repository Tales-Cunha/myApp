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
    let inputElement1 = <HTMLInputElement>document.getElementById("input1");
    let inputElement2 = <HTMLInputElement>document.getElementById("input2");
  
    let inputvalue1 = inputElement1.value;
    let inputvalue2 = inputElement2.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
  
    if (!inputvalue1 || !inputvalue2) {
      alert('Por favor, preencha ambos os campos.');
      return;
    }
  
    inputElement2.value = inputvalue2;
  
    this.route.navigate(['/consultas', inputvalue1, inputvalue2]);
  }
}
