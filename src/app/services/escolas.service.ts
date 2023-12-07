import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

  getEscolasFiltered(coEntidade: number, noEntidade: string): Observable<Escola[]> {
    return this.http.get<Escola[]>(`${environment.apiUrl}/escolas?coEntidade=${coEntidade}&noEntidade=${encodeURIComponent(noEntidade)}`).pipe(
      catchError(error => {
        // Trate o erro aqui
        console.error(error);
        return throwError(() => error)
      })
    );
  }
  
}
