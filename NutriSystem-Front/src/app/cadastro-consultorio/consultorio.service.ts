import { Paciente } from './../model/paciente.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { Consultorio } from '../model/consultorio.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultorioService {

   readonly apiUrl = 'https://localhost:44372';

  constructor(private readonly _HTTP: HttpClient) { }

    getAllConsultorio() {
        return this._HTTP.get<Consultorio[]>(this.apiUrl + '/Consultorio/GetAll');
    }
    getConsultorioById(idConsultorio: string): Observable<any> {
        return this._HTTP.get(this.apiUrl + '/Consultorio/?id=' + idConsultorio);
    }
    saveConsultorio(consultorio: Consultorio) {
        let responseSave;
        $.ajax({
            type: 'POST',
            url: this.apiUrl + '/Consultorio/Create',
            content: 'application/json; charset=utf-8',
            dataType: 'json',
            data: consultorio,
            async: false,
            success(response) {
                responseSave =  response;
            },
            error(textStatus) {
                responseSave = textStatus;
            }
        });


        return responseSave;
    }
    editConsultorio(consultorio: Consultorio): Observable<any> {
       let  responseUpdate;
       $.ajax({
            type: 'POST',
            url: this.apiUrl + '/Consultorio/Update',
            content: 'application/json; charset=utf-8',
            dataType: 'json',
            data: consultorio,
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
    deleteConsultorio(idConsultorio: number): Observable<any> {
        let responseDelete;
        $.ajax({
            type: 'POST',
            url: this.apiUrl + '/Consultorio/Delete',
            content: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            data: {id : idConsultorio},
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
