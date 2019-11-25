import { Component, OnInit, ViewChild } from '@angular/core';
import { Agenda } from '../model/agenda.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Consulta } from '../model/consulta.model';
import { Nutricionista } from '../model/nutricionista.model';
import { Consultorio } from '../model/consultorio.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { NutricionistaFireBaseService } from '../cadastro-nutricionista/nutricionista-fire-base.service';
import { ConsultorioFireBaseService } from '../cadastro-consultorio/consultorio-fire-base.service';
import { ToastrService } from 'ngx-toastr';
import { AgendaFireBaseService } from './agenda-fire-base.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  angenda: Agenda[];

  formsRegister: FormGroup;
  filterFormAgenda: FormGroup;
  agendaList: Agenda[];
  nutricionistaList: Nutricionista[];
  consultorioList: Consultorio[];
  dataSourceConsultorio = new MatTableDataSource<Consultorio>();
  dataSourceNutricionista = new MatTableDataSource<Nutricionista>();
  displayedColumns: string[] = ['dataConsulta', 'horaConsulta', 'status', 'action'];
  dataSource = new MatTableDataSource<Agenda>();

  @ViewChild('MatPaginator') MatPaginator: MatPaginator;

  constructor(private readonly _formBuilder: FormBuilder,
              private readonly _agendaService: AgendaFireBaseService,
              private readonly _nutricionistaService: NutricionistaFireBaseService,
              private readonly _consultorioService: ConsultorioFireBaseService,
              private readonly toastr: ToastrService) { }

  ngOnInit() {
    this.dataSource.paginator = this.MatPaginator;
    this.formsRegister = this._formBuilder.group({
      key: [''],
      dataConsulta: [''],
      horaConsulta: [''],
      statusAgenda: [''],
      idNutricionista: [''],
      idConsultorio: ['']

    });

    this._nutricionistaService.getAllNutricionista()
        .subscribe((nutricionistas: Nutricionista[]) => {
          this.nutricionistaList = (!!nutricionistas) ? nutricionistas : [];
          this.dataSourceNutricionista.data = [...this.nutricionistaList];

          this._agendaService.getAllAgenda()
        .subscribe((agendas: Agenda[]) => {
          this.agendaList = (!!agendas) ? agendas : [];
          this.dataSource.data = [...this.agendaList];

          this._consultorioService.getAllConsultorio()
      .subscribe((consultorios: Consultorio[]) => {
        this.consultorioList = (!!consultorios) ? consultorios : [];
      });
     });
    });

    this.filterFormAgenda = this._formBuilder.group({
        horaConsultaFilterCtrl: [''],
        dataConsultaFilterCtrl: [''],
        statusAgendaFilterCtrl: ['']
        });
    }


    geraAgenda() {
      const agenda: Agenda = {
        idNutricionista: this.formsRegister.get('idNutricionista').value,
        statusAgenda: this.formsRegister.get('statusAgenda').value,
        horaConsulta: this.formsRegister.get('horaConsulta').value,
        idConsultorio: this.formsRegister.get('idConsultorio').value,
        dataConsulta: (this.formsRegister.get('dataConsulta').value).toLocaleDateString('pt-BR')
      };

      if (this.formsRegister.value.key) {
                  this._agendaService.updateAgenda(agenda, this.formsRegister.value.key);
                  this.formsRegister.reset();
                  this.toastr.success('Agenda atualizada com sucesso!', 'Editar');
                } else {
                    this._agendaService.createAgenda(agenda);
                    this.formsRegister.reset();
                    this.toastr.success('Agenda gerada com sucesso!', 'Salvar');

                }

    }
    getRowTableAgenda(value: any): void {
      this.formsRegister.get('key').setValue(value.key);
      this.formsRegister.get('idNutricionista').setValue(value.idNutricionista);
      this.formsRegister.get('statusAgenda').setValue(value.statusAgenda);
      this.formsRegister.get('horaConsulta').setValue(value.horaConsulta);
      this.formsRegister.get('idConsultorio').setValue(value.idConsultorio);
      this.formsRegister.get('dataConsulta').setValue(new Date (this.formatDate(value.dataConsulta)));
     }

    clearAgenda(): void {
      this.dataSource.data = this.agendaList;
      this.formsRegister.value.key = null;
      this.formsRegister.reset();
      this.toastr.info('Campos limpos com sucesso!', 'Limpar');
    }
  deleteAgenda(key: string): void {
    this._agendaService.deleteAgenda(key);
    this.dataSource.data = this.agendaList;
    this.formsRegister.reset();
    this.toastr.success('Agenda deletado com sucesso!', 'Deletar');
  }
  filterTabelaAgenda(): void {
    let filteredTable: Agenda[] = this.agendaList;
    if (!this.filterFormAgenda.value.dataConsultaFilterCtrl
       && !this.filterFormAgenda.value.statusAgendaFilterCtrl && !
       this.filterFormAgenda.value.horaConsultaFilterCtrl) {
      this.dataSource.data = [...this.agendaList];
    }
    if (this.filterFormAgenda.value.dataConsultaFilterCtrl) {
      filteredTable = filteredTable.filter
      ( x =>
        x.dataConsulta ? x.dataConsulta.includes(this.filterFormAgenda.value.dataConsultaFilterCtrl.toLocaleDateString('pt-BR')) : null
      );
     }
    if (this.filterFormAgenda.value.statusAgendaFilterCtrl) {
        filteredTable = filteredTable.filter
        ( x =>
          x.statusAgenda ? x.statusAgenda.toUpperCase()
          .includes(this.filterFormAgenda.value.statusAgendaFilterCtrl.toUpperCase()) : null
        );
    }
    if (this.filterFormAgenda.value.horaConsultaFilterCtrl) {
      filteredTable = filteredTable.filter
      ( x =>
        x.horaConsulta ? x.horaConsulta.toUpperCase().includes(this.filterFormAgenda.value.horaConsultaFilterCtrl.toUpperCase()) : null
      );
  }
    this.dataSource.data = filteredTable;
  }

  formatDate(newDate): Date {
    const split = newDate.split('/');
    return new Date(split[1] + '/' + split[0] + '/' + split[2]);
  }

}
