import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Consulta } from '../model/consulta.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultaFireBaseService {

  constructor(private db: AngularFireDatabase) {}

  createConsulta(consulta: Consulta): void {
    this.db.list('consulta').push(consulta)
    .then((result: any) => {
      console.log(result.key);
    });
  }

  getAllConsulta() {
    return this.db.list('consulta').snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      })
    );
  }

  updateConsulta(consulta: Consulta, key: string) {
    return this.db.list('consulta').update(key, consulta).catch((error: any) => {
      console.error(error);
    });
  }

  deleteConsulta(key: string) {
    return this.db.object(`consulta/${key}`).remove();
  }
}
