import { Nutricionista } from './../model/nutricionista.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NutricionistaFireBaseService } from './nutricionista-fire-base.service';


@Component({
  selector: 'app-cadastro-nutricionista',
  templateUrl: './cadastro-nutricionista.component.html',
  styleUrls: ['./cadastro-nutricionista.component.scss']
})
export class CadastroNutricionistaComponent implements OnInit {

  nutricionista: Nutricionista[];

  formsRegister: FormGroup;
  filterFormNutricionista: FormGroup;
  nutricionistaList: Nutricionista[];
  displayedColumns: string[] = ['nome', 'email', 'crn', 'action'];
  dataSource = new MatTableDataSource<Nutricionista>();
  todoDataSource: any[];
  @ViewChild('MatPaginator') MatPaginator: MatPaginator;

  router: Router;
  constructor(http: HttpClient, router: Router , private readonly _formBuilder: FormBuilder,
              private readonly _nutricionistaService: NutricionistaFireBaseService, private readonly toastr: ToastrService) {
      this.router = router;
     }

  ngOnInit() {
    this.dataSource.paginator = this.MatPaginator;
    this.formsRegister = this._formBuilder.group({
      key: [''],
      nome: [''],
      crn: [''],
      sexo: [''],
      email: [''],
      qtdAvaliacao: [''],
      totalAvaliacao: [''],
      senha: [''],
      idNutricionista: ['']
    });


    this.filterFormNutricionista = this._formBuilder.group({
      nomeFilterCtrl: [''],
      emailFilterCtrl: [''],
      crnFilterCtrl: ['']
    });

  }
  saveNutricionista() {
    const nutricionista: Nutricionista = {
      nome: this.formsRegister.get('nome').value,
      email: this.formsRegister.get('email').value,
      sexo: this.formsRegister.get('sexo').value,
      crn: this.formsRegister.get('crn').value,
      qtdAvaliacao: 0,
      totalAvaliacao: 0,
      senha: this.formsRegister.get('senha').value
    };

    if (this.formsRegister.value.key) {
        this._nutricionistaService.updateNutricionista(nutricionista, this.formsRegister.value.key);
        this.formsRegister.reset();
        this.toastr.success('Nutricionista editado com sucesso!', 'Editar');
    } else {
        this._nutricionistaService.createNutricionista(nutricionista);
        this.formsRegister.reset();
        this.toastr.success('Nutricionista salvo com sucesso!', 'Salvar');
        this.router.navigate(['/', 'home']);
    }
  }
  cancelar(): void {
    this.router.navigate(['/login']);
  }
  getRowTableNutricionista(value: any): void {
    this.formsRegister.get('key').setValue(value.key);
    this.formsRegister.get('nome').setValue(value.nome);
    this.formsRegister.get('email').setValue(value.email);
    this.formsRegister.get('sexo').setValue(value.sexo);
    this.formsRegister.get('crn').setValue(value.crn);
    this.formsRegister.get('senha').setValue(value.senha);
    }


}
