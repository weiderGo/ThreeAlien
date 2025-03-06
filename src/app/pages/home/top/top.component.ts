import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-top',
    standalone: true,
    imports: [MatIconModule, MatButtonModule],
    templateUrl: './top.component.html',
    styleUrl: './top.component.scss'
})
export class TopComponent {
  router = inject(Router);
  constructor() { }

  title = environment.production ? '' : '測試區';
  userName!: string;

  ngOnInit(): void {
    const name = "管理員";
    if (name) {
      this.userName = name
    }

  }
  onLogout() {
    this.router.navigate(["/login"]);
  }
}
