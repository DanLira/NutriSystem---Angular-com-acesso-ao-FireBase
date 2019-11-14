import { Paciente } from './../model/paciente.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

   readonly apiUrl = 'https://localhost:44372';

  constructor(private readonly _HTTP: HttpClient) { }

    getAllPaciente() {
        return this._HTTP.get<Paciente[]>(this.apiUrl + '/Paciente/GetAll');
    }
    getPacienteById(idPaciente: string): Observable<any> {
        return this._HTTP.get(this.apiUrl + '/Paciente/?id=' + idPaciente);
    }
    savePaciente(paciente: Paciente): Observable<any> {
        let responseSave;
        $.ajax({
            type: 'POST',
            url: this.apiUrl + '/Paciente/Create',
            content: 'application/json; charset=utf-8',
            dataType: 'json',
            data: paciente,
            async: false,
            success(response) {
                responseSave =  response;
            },
            error(textStatus) {
                responseSave = textStatus;
            }
        });
        return responseSave;


        //return this._HTTP.post(this.apiUrl + '/Paciente/Create', paciente);
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
