import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Consulta } from '../model/consulta.model';
import * as $ from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class MarcarConsultaService {

  readonly apiUrl = 'https://localhost:44372';

  constructor(private readonly _HTTP: HttpClient) { }

    getAllConsulta() {
        return this._HTTP.get<Consulta[]>(this.apiUrl + '/Consulta/GetAll');
    }

    agendarConsulta(consulta: Consulta) {
        $.ajax({
            type: 'POST',
            url: this.apiUrl + '/Consulta/Create',
            content: 'application/json; charset=utf-8',
            dataType: 'json',
            data: consulta,
            error() {
            }
        });


        return this._HTTP.post(this.apiUrl + '/Consulta/Create', consulta);
    }
    editConsulta(consulta: Consulta): Observable<any> {
       let  responseUpdate;
       $.ajax({
            type: 'POST',
            url: this.apiUrl + '/Consulta/Update',
            content: 'application/json; charset=utf-8',
            dataType: 'json',
            data: consulta,
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
    deleteConsulta(consultaId: number): Observable<any> {
        let responseDelete;
        $.ajax({
            type: 'POST',
            url: this.apiUrl + '/Consulta/Delete',
            content: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            data: {id : consultaId},
            success(response) {
                responseDelete =  response;
            },
            error(textStatus) {
                responseDelete = textStatus;
            }
        });
        return responseDelete;
    }

    getNutricionistas(): Observable<any> {
        return this._HTTP.get<Consulta[]>(this.apiUrl + '/Consulta/GetNutricionistas');
    }
}
