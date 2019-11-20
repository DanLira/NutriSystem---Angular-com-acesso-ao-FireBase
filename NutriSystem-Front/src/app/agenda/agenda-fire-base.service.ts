import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Agenda } from '../model/agenda.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaFireBaseService {

  constructor(private db: AngularFireDatabase) {}

  createAgenda(agenda: Agenda): void {
    this.db.list('agenda').push(agenda)
    .then((result: any) => {
      console.log(result.key);
    });
  }

  getAllAgenda() {
    return this.db.list('agenda').snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(a => ({key: a.payload.key, ...a.payload.val()}));
      })
    );
  }

  updateAgenda(agenda: Agenda, key: string) {
    return this.db.list('agenda').update(key, agenda).catch((error: any) => {
      console.error(error);
    });
  }

  deleteAgenda(key: string) {
    return this.db.object(`agenda/${key}`).remove();
  }
}
