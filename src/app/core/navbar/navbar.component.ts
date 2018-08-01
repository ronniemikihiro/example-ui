import { Router } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';

import { LogoutService } from '../../service/logout.service';
import { ErrorHandlerService } from './../error-handler.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu: boolean = false;
  clickExpandDropdown: boolean = false;
  clickToggleNavbar: boolean = false;

  constructor(
    public authService: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  /**
   * Evento chamado para expandir um submenu do menu, e esconder os outros submenus que podem estar expandidos.
   * 
   * @param idDrop
   * @author ronnie-msl
   */
  expandDropdown(idDrop: string) {
    this.clickExpandDropdown = true;

    document.getElementById(idDrop).classList.toggle("show");

    const arrayDrops = document.getElementsByClassName("dropdown-content");

    Array.from(arrayDrops).filter(drop => drop.id !== idDrop).forEach(drop => {
      drop.classList.remove("show");
    });
  }

  /**
   * Evento chamado quando clica no botão de menu(mobile) para expandi-lo ou escondê-lo.
   * 
   * @author ronnie-msl
   */
  toggleNavbar() {
    this.clickToggleNavbar = true;
    const topNav = document.getElementById("myTopnav");
    topNav.className = topNav.className === "topnav" ? "topnav responsive" : "topnav";
  }

  /**
   * Evento chamado quando clica em qualquer lugar do sistema, para tratamento de esconder/expandir menu.
   * 
   * @param event
   * @author ronnie-msl
   */
  @HostListener('document:click', ['$event'])
  windowClick(event: MouseEvent) {
    if (this.clickExpandDropdown) {
      this.clickExpandDropdown = false;
    } else {
      if (this.clickToggleNavbar) {
        this.clickToggleNavbar = false;
      } else {
        let topNav = document.getElementById("myTopnav");
        topNav.className = "topnav";
      }
      
      const arrayDrops = document.getElementsByClassName("dropdown-content");

      Array.from(arrayDrops).forEach(drop => {
        drop.classList.remove('show');
      });
    }    
  }

  /**
   * Desloga do sistema.
   * 
   * @author ronnie-msl
   */
  logout() {
    this.logoutService.logout().then(() => {
      this.router.navigate(['/login']);
    }).catch(erro => {
      this.errorHandler.handle(erro)
    });
  }

}
