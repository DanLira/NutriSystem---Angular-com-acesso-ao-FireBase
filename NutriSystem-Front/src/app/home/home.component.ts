import { Component, OnInit } from '@angular/core';
import { AuthService } from '../guards/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nome: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.nome = localStorage.getItem('nome');
  }

  onLogout() {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
