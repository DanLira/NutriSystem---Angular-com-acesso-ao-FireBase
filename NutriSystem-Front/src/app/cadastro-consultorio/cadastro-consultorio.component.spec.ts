import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroConsultorioComponent } from './cadastro-consultorio.component';

describe('CadastroConsultorioComponent', () => {
  let component: CadastroConsultorioComponent;
  let fixture: ComponentFixture<CadastroConsultorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroConsultorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroConsultorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
