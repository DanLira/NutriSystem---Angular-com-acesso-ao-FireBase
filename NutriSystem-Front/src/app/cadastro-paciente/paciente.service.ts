import { Usuario } from './../model/usuario.model';
import { Paciente } from './../model/paciente.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

   readonly apiUrl = 'https://localhost:3000/';
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private readonly _HTTP: HttpClient) { }

    getAllPaciente() {
        return this._HTTP.get<Usuario[]>(this.apiUrl + 'usuarios', {});
    }
    getPacienteById(idPaciente: string): Observable<any> {
        return this._HTTP.get(this.apiUrl + '/Paciente/?id=' + idPaciente);
    }
    savePaciente(paciente: Paciente): Observable<any> {
        return this._HTTP.post(this.apiUrl + 'auth/cadastrarPaciente', paciente);
    }
    editPaciente(paciente: Paciente): Observable<any> {
       let  responseUpdate;
       $.ajax({
            type: 'POST',
            url: this.apiUrl + '/Paciente/Update',
            content: 'application/json; charset=utf-8',
            dataType: 'json',
            data: paciente,
            async: false,
            success(response) {
                responseUpdate =  response;
            },
            error(textStatus) {
                responseUpdate = textStatus;
            }
        });
       return responseUpdate;
        // return this._HTTP.put(this.apiUrl + '/Paciente/Update/?id=' + paciente.id, paciente);
    }
    deletePaciente(idPaciente: number): Observable<any> {
        let responseDelete;
        $.ajax({
            type: 'POST',
            url: this.apiUrl + '/Paciente/Delete',
            content: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            data: {id : idPaciente},
            success(response) {
                responseDelete =  response;
            },
            error(textStatus) {
                responseDelete = textStatus;
            }
        });
        return responseDelete;
    }

}
