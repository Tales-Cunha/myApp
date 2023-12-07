import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private route: Router, private alertController: AlertController) {}
  /*
   Função que é chamada quando o botão é clicado e redireciona para a página de consulta
   Faz a verificação de campos vazios e transforma o input2 em maiúsculo e sem acentos
  */
  async onButtonClick() {
    let inputElement1 = <HTMLInputElement>document.getElementById("input1");
    let inputElement2 = <HTMLInputElement>document.getElementById("input2");
  
    let inputvalue1 = inputElement1.value;
    let inputvalue2 = inputElement2.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    
    if (!inputvalue1 || !inputvalue2) {
      const alert = await this.alertController.create({
        header: 'Campos vazios',
        message: 'Por favor, preencha ambos os campos.',
        buttons: ['OK']
      });
  
      await alert.present();
      return;
    }
  
    inputElement2.value = inputvalue2;
  
    this.route.navigate(['/consultas', inputvalue1, inputvalue2]);
  }
}
