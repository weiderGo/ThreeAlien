import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-aside',
    imports: [MatListModule, MatIcon, RouterLink, MatMenuModule, MatButtonModule],
    templateUrl: './aside.component.html',
    styleUrl: './aside.component.scss'
})
export class AsideComponent {

}
