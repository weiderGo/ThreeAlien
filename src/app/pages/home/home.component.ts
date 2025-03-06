import { Component, OnInit } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { TopComponent } from './top/top.component';
import { MatIconModule } from '@angular/material/icon';
import { AsideComponent } from './aside/aside.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
@Component({
    selector: 'app-home',
    imports: [MatSidenavModule, AsideComponent, TopComponent, RouterOutlet, MatIconModule, CommonModule, MatButtonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  ngOnInit(): void {

  }
  toggleSideNav(sideNav: MatSidenav) {
    sideNav.toggle().then((result: MatDrawerToggleResult) => {
      console.log(`選單狀態：${result}`);
    });
  }
}
