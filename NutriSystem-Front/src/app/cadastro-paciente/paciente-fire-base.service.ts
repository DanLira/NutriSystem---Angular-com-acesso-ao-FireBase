import { map } from 'rxjs/operators';
import { Paciente } from './../model/paciente.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PacienteFireBaseService {

  constructor(private db: AngularFireDatabase) {}

  createPaciente(paciente: Paciente): void {
    this.db.list('paciente').push(paciente)
    .then((result: any) => {
      console.log(result.key);
    });
  }

  getAllPaciente() {
    return this.db.list('paciente').snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(p => ({key: p.payload.key, ...p.payload.val()}));
      })
    );
  }

  updatePaciente(paciente: Paciente, key: string) {
    return this.db.list('paciente').update(key, paciente).catch((error: any) => {
      console.error(error);
    });
  }

  deletePaciente(key: string) {
    return this.db.object(`paciente/${key}`).remove();
  }
}
