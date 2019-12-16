import { Consultorio } from './../model/consultorio.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Nutricionista } from '../model/nutricionista.model';
import { NutricionistaFireBaseService } from '../cadastro-nutricionista/nutricionista-fire-base.service';
import { ConsultorioFireBaseService } from './consultorio-fire-base.service';


@Component({
  selector: 'app-cadastro-consultorio',
  templateUrl: './cadastro-consultorio.component.html',
  styleUrls: ['./cadastro-consultorio.component.scss']
})
export class CadastroConsultorioComponent implements OnInit {

  consultorio: Consultorio[];

  formsRegister: FormGroup;
  filterFormConsultorio: FormGroup;
  consultorioList: Consultorio[];
  nutricionistaList: Nutricionista[];
  dataSource = new MatTableDataSource<Consultorio>();
  todoDataSource: any[];
  displayedColumns: string[] = ['nome', 'endereco', 'numero', 'bairro', 'cidade', 'telefone', 'action'];
  @ViewChild('MatPaginator') MatPaginator: MatPaginator;


  router: Router;
  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _nutricionistaService: NutricionistaFireBaseService,
              private readonly _consultorioService: ConsultorioFireBaseService,
               private readonly toastr: ToastrService) { }

  ngOnInit() {
    this.dataSource.paginator = this.MatPaginator;
    this.formsRegister = this._formBuilder.group({
      key: [''],
      idConsultorio: [''],
      nomeFantasia: ['', Validators.required],
      razaoSocial: ['', Validators.required],
      cnpj: ['', Validators.required],
      endereco: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cep: [''],
      cidade: [''],
      uf: [''],
      pais: [''],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      horaAbertura: ['', Validators.required],
      horaFechamento: ['', Validators.required],
      idNutricionista: ['', Validators.required]
    });

    this._nutricionistaService.getAllNutricionista()
        .subscribe((nutricionistas: Nutricionista[]) => {
          this.nutricionistaList = (!!nutricionistas) ? nutricionistas : [];

          this._consultorioService.getAllConsultorio()
        .subscribe((consultorios: Consultorio[]) => {
          this.consultorioList = (!!consultorios) ? consultorios : [];
          this.dataSource.data = this.consultorioList;
        });
      });

    this.filterFormConsultorio = this._formBuilder.group({
      nomeFilterCtrl: [''],
      enderecoFilterCtrl: [''],
      cidadeFilterCtrl: ['']
    });

  }
  saveConsultorio() {
    const consultorio: Consultorio = {
      nomeFantasia: this.formsRegister.get('nomeFantasia').value,
      razaoSocial: this.formsRegister.get('razaoSocial').value,
      cnpj: this.formsRegister.get('cnpj').value,
      endereco: this.formsRegister.get('endereco').value,
      numero: this.formsRegister.get('numero').value,
      bairro: this.formsRegister.get('bairro').value,
      cep: this.formsRegister.get('cep').value,
      cidade: this.formsRegister.get('cidade').value,
      uf: this.formsRegister.get('uf').value,
      pais: this.formsRegister.get('pais').value,
      email: this.formsRegister.get('email').value,
      telefone: this.formsRegister.get('telefone').value,
      horaAbertura: this.formsRegister.get('horaAbertura').value,
      horaFechamento: this.formsRegister.get('horaFechamento').value,
      idNutricionista: this.formsRegister.get('idNutricionista').value
    };
    if (this.formsRegister.value.key) {
      this._consultorioService.updateConsultorio(consultorio, this.formsRegister.value.key);
      this.formsRegister.reset();
      this.toastr.success('Consultorio editado com sucesso!', 'Editar');
    } else {
      this._consultorioService.createConsultorio(consultorio);
      this.formsRegister.reset();
      this.toastr.success('Consultorio salvo com sucesso!', 'Salvar');

    }
  }

  clearConsultorio(): void {
    this.dataSource.data = this.consultorioList;
    this.formsRegister.value.key = null;
    this.formsRegister.reset();
    this.toastr.info('Campos limpos com sucesso!', 'Limpar');
  }
  getRowTableConsultorio(value: any): void {
    this.formsRegister.get('key').setValue(value.key);
    this.formsRegister.get('nomeFantasia').setValue(value.nomeFantasia);
    this.formsRegister.get('razaoSocial').setValue(value.razaoSocial);
    this.formsRegister.get('cnpj').setValue(value.cnpj);
    this.formsRegister.get('endereco').setValue(value.endereco);
    this.formsRegister.get('numero').setValue(value.numero);
    this.formsRegister.get('bairro').setValue(value.bairro);
    this.formsRegister.get('cep').setValue(value.cep);
    this.formsRegister.get('cidade').setValue(value.cidade);
    this.formsRegister.get('uf').setValue(value.uf);
    this.formsRegister.get('pais').setValue(value.pais);
    this.formsRegister.get('email').setValue(value.email);
    this.formsRegister.get('telefone').setValue(value.telefone);
    this.formsRegister.get('horaAbertura').setValue(value.horaAbertura);
    this.formsRegister.get('horaFechamento').setValue(value.horaFechamento);
    this.formsRegister.get('idNutricionista').setValue(value.idNutricionista);
    }


  deleteConsultorio(key: string): void {
    this._consultorioService.deleteConsultorio(key);
    this.dataSource.data = this.consultorioList;
    this.clearConsultorio();
    this.toastr.success('Consultório deletado com sucesso!', 'Deletar');
  }

  filterTabelaConsultorio(): void {
    let filteredTable: Consultorio[] = this.consultorioList;
    if (!this.filterFormConsultorio.value.nomeFilterCtrl) {
      this.dataSource.data = this.consultorioList;
    }
    if (this.filterFormConsultorio.value.nomeFilterCtrl) {
      filteredTable = filteredTable.filter
      ( x =>
        x.nomeFantasia ? x.nomeFantasia.toUpperCase().includes(this.filterFormConsultorio.value.nomeFilterCtrl.toUpperCase()) : null
      );
     }
    if (this.filterFormConsultorio.value.enderecoFilterCtrl) {
        filteredTable = filteredTable.filter
        ( x =>
          x.endereco ? x.endereco.toUpperCase().includes(this.filterFormConsultorio.value.enderecoFilterCtrl.toUpperCase()) : null
        );
    }
    if (this.filterFormConsultorio.value.cidadeFilterCtrl) {
      filteredTable = filteredTable.filter
      ( x =>
        x.cidade ? x.cidade.toUpperCase().includes(this.filterFormConsultorio.value.cidadeFilterCtrl.toUpperCase()) : null
      );
  }
    this.dataSource.data = filteredTable;
  }

}
