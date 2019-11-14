import { Usuario } from './../model/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

   readonly apiUrl = 'https://localhost:44372';

  constructor(private readonly _HTTP: HttpClient) { }

    getAllUsuario() {
        return this._HTTP.get<Usuario[]>(this.apiUrl + '/Login/GetAll');
    }
}
