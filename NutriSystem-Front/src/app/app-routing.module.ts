import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroNutricionistaComponent } from './cadastro-nutricionista/cadastro-nutricionista.component';
import { CadastroPacienteComponent } from './cadastro-paciente/cadastro-paciente.component';
import { CadastroConsultorioComponent } from './cadastro-consultorio/cadastro-consultorio.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { MarcarConsultaComponent } from './marcar-consulta/marcar-consulta.component';
import { AgendaComponent } from './agenda/agenda.component';


const routes: Routes = [

    {
        path: 'home',
        component: HomeComponent, canActivate: [AuthGuard]
    },

    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'agenda',
        component: AgendaComponent, canActivate: [AuthGuard]
    },
    {
        path: 'novaConsulta',
        component: MarcarConsultaComponent, canActivate: [AuthGuard]
    },

    {
        path: 'cadastroPaciente',
        component: CadastroPacienteComponent, canActivate: [AuthGuard]
    },

    {
        path: 'cadastroConsultorio',
        component: CadastroConsultorioComponent, canActivate: [AuthGuard]
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
