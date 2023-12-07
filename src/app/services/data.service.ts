import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
/**
 * Interface que define o formato dos dados que serão armazenados
  Decide fazer o uso do storange-angular para armazenar os dados
 */
const STORAGE_KEY = 'myData';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  getData(){
    return this.storage.get(STORAGE_KEY) || []; //retorna os dados armazenados ou um array vazio
  }
  /*
   * Função que recebe um dado e adiciona ao array de dados armazenados
   */
  async addData(data){
    const storaged = await this.storage.get(STORAGE_KEY) || [];
    storaged.push(data);
    return this.storage.set(STORAGE_KEY, storaged);
  }

  async removeData(id){
    const storaged = await this.storage.get(STORAGE_KEY) || [];
    storaged.splice(id, 1);
    return this.storage.set(STORAGE_KEY, storaged);
  }
}
