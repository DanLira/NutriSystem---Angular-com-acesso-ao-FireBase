import { AuthService } from './../guards/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NutricionistaModalComponent } from '../cadastro-nutricionista/nutricionista-modal/nutricionista-modal.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NutricionistaFireBaseService } from '../cadastro-nutricionista/nutricionista-fire-base.service';
import { Nutricionista } from '../model/nutricionista.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
  returnUrl: string;
  nutricionistaList: Nutricionista[];
  dataSource = new MatTableDataSource<Nutricionista>();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private readonly _nutricionistaService: NutricionistaFireBaseService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      crn: ['', Validators.required],
      senha: ['', Validators.required]
    });
    this.returnUrl = '/home';
    this.authService.logout();
    this._nutricionistaService.getAllNutricionista()
    .subscribe((nutricionistas: Nutricionista[]) => {
      this.nutricionistaList = (!!nutricionistas) ? nutricionistas : [];
  });
  }

  get f() { return this.loginForm.controls; }

  fazerLogin() {
  if (this.loginForm.invalid) {
    return;
 } else {
   const user = this.nutricionistaList.find(x => x.crn === this.f.crn.value && x.senha === this.f.senha.value);
   if (user) {
       console.log('Login successful');
       localStorage.setItem('isLoggedIn', 'true');
       localStorage.setItem('token', this.f.crn.value);
       localStorage.setItem('nome', user.nome);
       localStorage.setItem('key', user.key);
       this.router.navigate([this.returnUrl]);
    } else {
      this.toastr.warning('Login ou Senha invalida!', '');
    }


  }
}





  cadastrarNutricionista(): void {
     this.dialog.open(NutricionistaModalComponent, {
      height: '80%',
      width: '50%',
    });
  }



}
