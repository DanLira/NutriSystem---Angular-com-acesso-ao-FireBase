import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Nutricionista } from 'src/app/model/nutricionista.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NutricionistaFireBaseService } from '../nutricionista-fire-base.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nutricionista-modal',
  templateUrl: './nutricionista-modal.component.html',
  styleUrls: ['./nutricionista-modal.component.scss']
})
export class NutricionistaModalComponent implements OnInit {

  nutricionista: Nutricionista[];
  hide: boolean;
  formsRegister: FormGroup;
  filterFormNutricionista: FormGroup;
  nutricionistaList: Nutricionista[];
  router: Router;
  constructor(router: Router , private readonly _formBuilder: FormBuilder,
              private readonly _nutricionistaService: NutricionistaFireBaseService,
              private readonly toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<NutricionistaModalComponent>) {
      this.router = router;
     }

  ngOnInit() {
    this.formsRegister = this._formBuilder.group({
      key: [''],
      nome: ['', Validators.required],
      crn: ['', Validators.required],
      sexo: ['', Validators.required],
      email: ['', Validators.required],
      qtdAvaliacao: [''],
      totalAvaliacao: [''],
      senha: ['', Validators.required],
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
    this.dialogRef.close();
  }

}
