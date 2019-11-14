import { Nutricionista } from './../model/nutricionista.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class NutricionistaFireBaseService {

  constructor(private db: AngularFireDatabase) {}

  createNutricionista(nutricionista: Nutricionista): void {
    this.db.list('nutricionista').push(nutricionista)
    .then((result: any) => {
      console.log(result.key);
    });
  }

  getAllNutricionista() {
    return this.db.list('nutricionista').snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(p => ({key: p.payload.key, ...p.payload.val()}));
      })
    );
  }

  updateNutricionista(nutricionista: Nutricionista, key: string) {
    return this.db.list('nutricionista').update(key, nutricionista).catch((error: any) => {
      console.error(error);
    });
  }

  deleteNutricionista(key: string) {
    return this.db.object(`nutricionista/${key}`).remove();
  }
}
