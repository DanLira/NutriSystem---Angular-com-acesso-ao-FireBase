import { AuthService } from './../guards/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NutricionistaModalComponent } from '../cadastro-nutricionista/nutricionista-modal/nutricionista-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      crn: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  fazerLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }
    this.formSubmitAttempt = true;
  }

  // fazerLogin(email, senha) {
  //   this.authService.login(email, senha);
  // }

  cadastrarNutricionista(): void {
     this.dialog.open(NutricionistaModalComponent, {
      height: '80%',
      width: '50%',
    });
  }



}
