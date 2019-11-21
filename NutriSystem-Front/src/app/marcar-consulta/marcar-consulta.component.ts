import { Nutricionista } from './../model/nutricionista.model';
import { Paciente } from './../model/paciente.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Consulta } from '../model/consulta.model';
import { Consultorio } from '../model/consultorio.model';
import { NutricionistaFireBaseService } from '../cadastro-nutricionista/nutricionista-fire-base.service';
import { ConsultorioFireBaseService } from '../cadastro-consultorio/consultorio-fire-base.service';
import { PacienteFireBaseService } from '../cadastro-paciente/paciente-fire-base.service';
import { ConsultaFireBaseService } from './consulta-fire-base.service';
import { AgendaFireBaseService } from '../agenda/agenda-fire-base.service';
import { Agenda } from '../model/agenda.model';

@Component({
  selector: 'app-marcar-consulta',
  templateUrl: './marcar-consulta.component.html',
  styleUrls: ['./marcar-consulta.component.scss']
})
export class MarcarConsultaComponent implements OnInit {
  consulta: Consulta[];
  nutricionistaLogado: string;
  formsRegister: FormGroup;
  filterFormConsulta: FormGroup;
  pacienteList: Paciente[];
  consultaList: Consulta[];
  nutricionistaList: Nutricionista[];
  agendaList: Agenda[];
  idConsultorio: number;
  consultorioList: Consultorio[];
  dataSourcePaciente = new MatTableDataSource<Paciente>();
  dataSourceConsultorio = new MatTableDataSource<Consultorio>();
  dataSourceNutricionista = new MatTableDataSource<Nutricionista>();
  dataSourceAgenda = new MatTableDataSource<Agenda>();
  displayedColumns: string[] = ['dataConsulta', 'horaConsulta', 'status', 'action'];
  dataSource = new MatTableDataSource<Consulta>();

  @ViewChild('MatPaginator') MatPaginator: MatPaginator;

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _marcarConsultaService: ConsultaFireBaseService,
              private readonly _nutricionistaService: NutricionistaFireBaseService,
              private readonly _pacienteService: PacienteFireBaseService,
              private readonly _consultorioService: ConsultorioFireBaseService,
              private readonly _agendaService: AgendaFireBaseService,
              private readonly toastr: ToastrService) { }

  ngOnInit() {
    this.dataSource.paginator = this.MatPaginator;
    this.formsRegister = this._formBuilder.group({
      key: [''],
      dataConsulta: [''],
      horaConsulta: [''],
      statusConsulta: [''],
      idPaciente: [''],
      idNutricionista: [''],
      idConsultorio: ['']

    });
    this.nutricionistaLogado = localStorage.getItem('nome');

    this._marcarConsultaService.getAllConsulta()
      .subscribe((consultas: Consulta[]) => {
        this.consultaList = (!!consultas) ? consultas : [];
        this.dataSource.data = [...this.consultaList];

        this._agendaService.getAllAgenda()
      .subscribe((agendas: Agenda[]) => {
        this.agendaList = (!!agendas) ? agendas : [];
        this.dataSourceAgenda.data = [...this.agendaList];

        this._nutricionistaService.getAllNutricionista()
        .subscribe((nutricionistas: Nutricionista[]) => {
          this.nutricionistaList = (!!nutricionistas) ? nutricionistas : [];
          this.dataSourceNutricionista.data = [...this.nutricionistaList];

          this._pacienteService.getAllPaciente()
        .subscribe((pacientes: Paciente[]) => {
          this.pacienteList = (!!pacientes) ? pacientes : [];
          this.dataSourcePaciente.data = [...this.pacienteList];

          this._consultorioService.getAllConsultorio()
      .subscribe((consultorios: Consultorio[]) => {
        this.consultorioList = (!!consultorios) ? consultorios : [];
        });
       });
      });
    });

  });

    this.filterFormConsulta = this._formBuilder.group({
        horaConsultaFilterCtrl: [''],
        dataConsultaFilterCtrl: [''],
        statusConsultaFilterCtrl: ['']
        });
    }

    // getNutricionistas() {
    //   debugger;
    //   this.nutricionistaList = [];
    //   this._marcarConsultaService.getNutricionistas().subscribe((res: any[]) => {
    //     this.nutricionistaList = res;
    //   });


    saveConsulta() {
      const consulta: Consulta = {
        idPaciente: this.formsRegister.get('idPaciente').value,
        idNutricionista: this.formsRegister.get('idNutricionista').value,
        statusConsulta: this.formsRegister.get('statusConsulta').value,
        horaConsulta: this.formsRegister.get('horaConsulta').value,
        idConsultorio: this.formsRegister.get('idConsultorio').value,
        dataConsulta: (this.formsRegister.get('dataConsulta').value).toLocaleDateString('pt-BR')
      };

      if (this.formsRegister.value.key) {
                  this._marcarConsultaService.updateConsulta(consulta, this.formsRegister.value.key);
                  this.formsRegister.reset();
                  this.toastr.success('Consulta atualizada com sucesso!', 'Editar');
                } else {
                    this._marcarConsultaService.createConsulta(consulta);
                    this.formsRegister.reset();
                    this.toastr.success('Consulta marcada com sucesso!', 'Salvar');
                }

    }

      // getDisponibilidade() {
      //   let horaDisponivel: Agenda[] = this.agendaList;
      //   horaDisponivel.forEach(x => {
      //      if (x.statusAgenda === 'Livre') {
      //       horaDisponivel.
      //      }

      //    });
      // }
    getRowTableConsulta(value: any): void {
      this.formsRegister.get('key').setValue(value.key);
      this.formsRegister.get('idPaciente').setValue(value.idPaciente);
      this.formsRegister.get('idNutricionista').setValue(value.idNutricionista);
      this.formsRegister.get('statusConsulta').setValue(value.statusConsulta);
      this.formsRegister.get('horaConsulta').setValue(value.horaConsulta);
      this.formsRegister.get('idConsultorio').setValue(value.idConsultorio);
      this.formsRegister.get('dataConsulta').setValue(new Date (this.formatDate(value.dataConsulta)));
     }

    clearConsulta(): void {
      this.dataSource.data = this.consultaList;
      this.formsRegister.value.key = null;
      this.formsRegister.reset();
      this.toastr.info('Campos limpos com sucesso!', 'Limpar');
    }
  deleteConsulta(key: string): void {
    this._marcarConsultaService.deleteConsulta(key);
    this.dataSource.data = this.consultaList;
    this.formsRegister.reset();
    this.toastr.success('Consulta deletado com sucesso!', 'Deletar');
  }
  filterTabelaConsulta(): void {
    let filteredTable: Consulta[] = this.consultaList;
    if (!this.filterFormConsulta.value.dataConsultaFilterCtrl
       && !this.filterFormConsulta.value.statusConsultaFilterCtrl && !
       this.filterFormConsulta.value.horaConsultaFilterCtrl) {
      this.dataSource.data = [...this.consultaList];
    }
    if (this.filterFormConsulta.value.dataConsultaFilterCtrl) {
      filteredTable = filteredTable.filter
      ( x =>
        x.dataConsulta ? x.dataConsulta.includes(this.filterFormConsulta.value.dataConsultaFilterCtrl.toLocaleDateString('pt-BR')) : null
      );
     }
    if (this.filterFormConsulta.value.statusConsultaFilterCtrl) {
        filteredTable = filteredTable.filter
        ( x =>
          x.statusConsulta ? x.statusConsulta.toUpperCase()
          .includes(this.filterFormConsulta.value.statusConsultaFilterCtrl.toUpperCase()) : null
        );
    }
    if (this.filterFormConsulta.value.horaConsultaFilterCtrl) {
      filteredTable = filteredTable.filter
      ( x =>
        x.horaConsulta ? x.horaConsulta.toUpperCase().includes(this.filterFormConsulta.value.horaConsultaFilterCtrl.toUpperCase()) : null
      );
  }
    this.dataSource.data = filteredTable;
  }

  formatDate(newDate): Date {
    const split = newDate.split('/');
    return new Date(split[1] + '/' + split[0] + '/' + split[2]);
  }

  }
