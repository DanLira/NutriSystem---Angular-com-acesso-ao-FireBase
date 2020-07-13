import { Paciente } from './../model/paciente.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { PacienteService } from './paciente.service';
import { ToastrService } from 'ngx-toastr';
import { PacienteFireBaseService } from './paciente-fire-base.service';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.scss']
})
export class CadastroPacienteComponent implements OnInit {
  paciente: Paciente[];
  key = '';
  formsRegister: FormGroup;
  filterFormPaciente: FormGroup;
  pacienteList: Paciente[];
  displayedColumns: string[] = ['nome', 'email', 'cpf', 'action'];
  dataSource = new MatTableDataSource<Paciente>();
  todoDataSource: any[];
  @ViewChild('MatPaginator') MatPaginator: MatPaginator;

  public maskCpf = {
    guide: true,
    showMask: false,
    mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  };

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _pacienteService: PacienteService,
              private readonly _pacienteFireBaseService: PacienteFireBaseService,
              private readonly toastr: ToastrService) { }

  ngOnInit() {
    this.dataSource.paginator = this.MatPaginator;
    this.formsRegister = this._formBuilder.group({
    key: [''],
    nome: ['', Validators.required],
    cpf: ['', Validators.required],
    sexo: ['', Validators.required],
    email: ['', Validators.required],
    peso: ['', Validators.required],
    altura: ['', Validators.required],
    idade: ['', Validators.required],
    dataNascimento: ['', Validators.required],
    celular: ['', Validators.required],
    login: [''],
    senha: ['']

    });
    this._pacienteFireBaseService.getAllPaciente().subscribe((pacientes: Paciente[]) => {
      this.pacienteList = (!!pacientes) ? pacientes : [];
      this.dataSource.data = [...this.pacienteList];
     });


    this.filterFormPaciente = this._formBuilder.group({
        nomeFilterCtrl: [''],
        emailFilterCtrl: [''],
        cpfFilterCtrl: ['']
        });
    }
    savePacienteFire() {
      const paciente: Paciente = {
        nome: this.formsRegister.get('nome').value,
        email: this.formsRegister.get('email').value,
        sexo: this.formsRegister.get('sexo').value,
        cpf: this.formsRegister.get('cpf').value,
        peso: this.formsRegister.get('peso').value,
        altura: this.formsRegister.get('altura').value,
        celular: this.formsRegister.get('celular').value,
        dataNascimento: (this.formsRegister.get('dataNascimento').value).toLocaleDateString('pt-BR'),
        idade: this.formsRegister.get('idade').value,
        login: this.formsRegister.get('login').value,
        senha: this.formsRegister.get('senha').value,
      };
      if (this.formsRegister.value.key) {
        this._pacienteFireBaseService.updatePaciente(paciente, this.formsRegister.value.key);
        this.formsRegister.reset();
        this.toastr.success('Paciente atualizado com sucesso!', 'Editar');
      } else {
        if (this.pacienteList.filter(x => x.email.toUpperCase() === this.formsRegister.get('email').value.toUpperCase()).length <= 0) {
          if (this.pacienteList.filter(x => x.cpf.toUpperCase() === this.formsRegister.get('cpf').value.toUpperCase()).length > 0) {
            this.toastr.warning('Este CPF já existe!', '');
          } else {
            this._pacienteService.savePaciente(paciente);
            this.formsRegister.reset();
            this.toastr.success('Paciente salvo com sucesso!', 'Salvar');
          }
        } else {
          this.toastr.warning('Este e-mail já existe!', '');
        }
      }
    }
    getRowTablePaciente(value: any): void {
      this.formsRegister.get('key').setValue(value.key);
      this.formsRegister.get('nome').setValue(value.nome);
      this.formsRegister.get('email').setValue(value.email);
      this.formsRegister.get('idade').setValue(value.idade);
      this.formsRegister.get('sexo').setValue(value.sexo);
      this.formsRegister.get('cpf').setValue(value.cpf);
      this.formsRegister.get('dataNascimento').setValue(new Date (this.formatDate(value.dataNascimento)));
      this.formsRegister.get('celular').setValue(value.celular);
      this.formsRegister.get('login').setValue(value.login);
      this.formsRegister.get('senha').setValue(value.senha);
      }
    clearPaciente(): void {
      this.dataSource.data = this.pacienteList;
      this.formsRegister.value.key = null;
      this.formsRegister.reset();
      this.toastr.info('Campos limpos com sucesso!', 'Limpar');
    }
  deletePaciente(key: string): void {
    this._pacienteFireBaseService.deletePaciente(key);
    this.dataSource.data = this.pacienteList;
    this.toastr.success('Paciente deletado com sucesso!', 'Deletar');
  }
  filterTabelaPaciente(): void {
    let filteredTable: Paciente[] = this.pacienteList;
    if (!this.filterFormPaciente.value.nomeFilterCtrl) {
      this.dataSource.data = this.pacienteList;
    }
    if (this.filterFormPaciente.value.nomeFilterCtrl) {
      filteredTable = filteredTable.filter
      ( x =>
        x.nome ? x.nome.toUpperCase().includes(this.filterFormPaciente.value.nomeFilterCtrl.toUpperCase()) : null
      );
     }
    if (this.filterFormPaciente.value.cpfFilterCtrl) {
        filteredTable = filteredTable.filter
        ( x =>
          x.cpf ? x.cpf.toUpperCase().includes(this.filterFormPaciente.value.cpfFilterCtrl.toUpperCase()) : null
        );
    }
    this.dataSource.data = filteredTable;
  }

  formatDate(newDate): Date {
    const split = newDate.split('/');
    return new Date(split[1] + '/' + split[0] + '/' + split[2]);
  }

  }
