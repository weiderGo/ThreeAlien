import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatDrawerToggleResult, MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside/aside.component';
import { TopComponent } from '../home/top/top.component';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';


@Component({
    selector: 'app-home',
    standalone:true,
    imports: [MatSidenavModule, AsideComponent, TopComponent, RouterOutlet, MatIconModule, CommonModule, MatButtonModule,BreadcrumbComponent],
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
