import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Foyer } from '../models/foyer';

@Injectable({
  providedIn: 'root'
})
export class FoyerService {
  private apiUrl = environment.aUrl;
  constructor(private _http: HttpClient) {}

  getFoyers(): Observable<Foyer[]> {
    const url = `${this.apiUrl}/afficherfoyers`; // Assurez-vous que l'URL est correcte

    return this._http.get<Foyer[]>(url);
  }
  findFoyersByUniversiteIsNull():Observable<any[]>{
    return this._http.get<any[]>(`${this.apiUrl}/findFoyersByUniversiteIsNull`);
  }
  
}
