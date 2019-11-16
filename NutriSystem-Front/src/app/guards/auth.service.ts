import { Nutricionista } from './../model/nutricionista.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NutricionistaFireBaseService } from '../cadastro-nutricionista/nutricionista-fire-base.service';
import { MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private loggedIn = new BehaviorSubject<boolean>(false);
    nutricionistaList: Nutricionista[];
    dataSource = new MatTableDataSource<Nutricionista>();
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router, private readonly _nutricionistaService: NutricionistaFireBaseService,
    private readonly toastr: ToastrService
  ) {
    this._nutricionistaService.getAllNutricionista()
    .subscribe((nutricionistas: Nutricionista[]) => {
      this.nutricionistaList = (!!nutricionistas) ? nutricionistas : [];
  });
  }

  login(nutri: Nutricionista) {
        const user = this.nutricionistaList.find(x => x.crn === nutri.crn && x.senha === nutri.senha);
        if (user) {
          this.toastr.success('Seja bem vindo ao NutriSystem!', '');
          this.loggedIn.next(true);
          this.router.navigate(['/']);
    } else {
      this.toastr.warning('Login ou Senha invalida!', '');
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }


  ////////////////////////////////////////////////////


  // user: Observable<firebase.User>;

  //   constructor(private router: Router, public afAuth: AngularFireAuth) {
  //       this.user = afAuth.authState;
  //   }

  //   public login(email: string, senha: string) {

  //       return new Promise((resolve, reject) => {

  //           this.afAuth.auth.signInWithEmailAndPassword(email, senha).then((user) => {

  //               localStorage['token'] = user.user;
  //               this.router.navigate(['']);

  //           })
  //               .catch((error) => {
  //                   console.log(error);
  //                   this.router.navigate(['/login']);
  //               });
  //       })
  //           .catch((error) => {
  //               console.log(error);
  //               this.router.navigate(['/login']);
  //           });
  //   }

  //   public logout() {
  //       return this.afAuth.auth.signOut();
  //   }







}
