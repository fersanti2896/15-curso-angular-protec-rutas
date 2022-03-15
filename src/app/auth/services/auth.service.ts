import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment'
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined; /* Almacenará el nombre que devuelve le respuesta al backend */

  get auth(): Auth {
    return { ...this._auth! }
  }

  constructor(private http: HttpClient) { }

  verificaAutenticacion(): Observable<boolean> {
    if( !localStorage.getItem('token') ) {
      return of(false);    
    }
    
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
        .pipe(
          map(auth => {
            this._auth = auth; /* Mantiene la información del usuario al cargar */
            return true;
          })
        );
  }

  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
               .pipe(
                 /* Tap hace efectos secundarios antes de pasar por el subscribe */
                 tap(auth => this._auth = auth),
                 tap(auth => localStorage.setItem('token', auth.id))
               );
  }

  logout() {
    this._auth = undefined;
  }
}
