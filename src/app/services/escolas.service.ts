import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Escola {
  nuAnoCenso: number;
  coEntidade: number;
  noEntidade: string;
  tpDependencia: number;
  rede: string;
  localizacao: string;
  noRegiao: string;
  coUf: number;
  sgUf: string;
  coMunicipio: number;
  noMunicipio: string;
  coCep: number;
  dsEndereco: string;
  nuEndereco: number;
  dsComplemento: string;
  noBairro: string;
  nuDdd: number;
  nuTelefone: number;
  nuTelefonePublico: number;
  nuFax: number;
  latitude: number;
  longitude: number;
  expandido?: boolean;
  favorito: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class EscolaService {
  constructor(private http:HttpClient) { }

  getEscolas(): Observable<Escola[]> {
    return this.http.get<Escola[]>(`${environment.apiUrl}/escolas`);
  }

  getEscolasFiltered(coEntidade: number, noEntidade: string): Observable<Escola[]> {
    return this.http.get<Escola[]>(`${environment.apiUrl}/escolas`).pipe(
      map((data: Escola[]) => data.filter(item => item.coEntidade === coEntidade && item.noEntidade === noEntidade))
    );
  }

}
