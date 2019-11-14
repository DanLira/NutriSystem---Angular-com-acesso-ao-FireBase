import { Nutricionista } from './../model/nutricionista.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { NutricionistaFireBaseService } from '../cadastro-nutricionista/nutricionista-fire-base.service';
import { MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

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
}
