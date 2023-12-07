import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

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
    return this.storage.get(STORAGE_KEY) || [];
  }

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
