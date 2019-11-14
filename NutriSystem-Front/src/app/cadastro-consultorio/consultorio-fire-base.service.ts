import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Consultorio } from '../model/consultorio.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultorioFireBaseService {

  constructor(private db: AngularFireDatabase) {}

  createConsultorio(consultorio: Consultorio): void {
    this.db.list('consultorio').push(consultorio)
    .then((result: any) => {
      console.log(result.key);
    });
  }

  getAllConsultorio() {
    return this.db.list('consultorio').snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      })
    );
  }

  updateConsultorio(consultorio: Consultorio, key: string) {
    return this.db.list('consultorio').update(key, consultorio).catch((error: any) => {
      console.error(error);
    });
  }

  deleteConsultorio(key: string) {
    return this.db.object(`consultorio/${key}`).remove();
  }
}
