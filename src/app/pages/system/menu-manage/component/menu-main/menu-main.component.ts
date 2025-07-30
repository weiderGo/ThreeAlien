import { Component, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterOutlet } from '@angular/router';


export interface PageModel {
  pageName: string;
  sort: number;
  isEdit: boolean;
  isActive: boolean;
  iconClass: string;
  subList?: PageModel[]
}

export const ELEMENT_DATA: PageModel[] = [
  {
    sort: 1,
    pageName: '關於宸暐',
    isActive: true,
    isEdit: false,
    subList: [
      { pageName: '電話', sort: 0, isEdit: false, isActive: true, iconClass: 'phone' },
      { pageName: '地址', sort: 1, isEdit: false, isActive: true, iconClass: 'address' },
      { pageName: '照片', sort: 2, isEdit: false, isActive: true, iconClass: 'photo' }
    ],
    iconClass: ''
  },
  {
    sort: 2,
    pageName: '鑄造流程',
    isEdit: false,
    isActive: true,
    subList: [
      {
        pageName: '公司電話', sort: 0, isEdit: false, isActive: true,
        iconClass: ''
      },
      {
        pageName: '公司地址', sort: 1, isEdit: false, isActive: true,
        iconClass: ''
      }
    ],
    iconClass: ''
  },
  {
    sort: 3, pageName: '鑄造設備',
    isActive: true,
    isEdit: false,
    subList: [
      {
        pageName: '電子產品', sort: 0, isEdit: false, isActive: true,
        iconClass: ''
      },
      {
        pageName: '寢具', sort: 1, isEdit: false, isActive: true,
        iconClass: ''
      }
    ],
    iconClass: ''
  },
  {
    sort: 4, pageName: '檢測設備', isEdit: false, isActive: true, subList: [],
    iconClass: ''
  },
  {
    sort: 5, pageName: '產品', isEdit: false, isActive: true, subList: [],
    iconClass: ''
  },
  {
    sort: 6, pageName: '聯絡我們', isEdit: false, isActive: true, subList: [],
    iconClass: ''
  },
];
@Component({
  selector: 'app-menu-main',
  imports: [CommonModule, MatFormFieldModule, FormsModule, CdkDropList, CdkDrag, MatTableModule, MatIconModule, MatButtonModule, MatInputModule],
  templateUrl: './menu-main.component.html',
  styleUrl: './menu-main.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  standalone: true
})
export class MenuMainComponent {
  @ViewChild('table', { static: true }) table!: MatTable<PageModel>;
  @ViewChildren(MatTable) subTables!: QueryList<MatTable<PageModel>>;
  router = inject(Router);
  displayedColumns: string[] = ['sort', 'isEdit'];
  expandedElement: PageModel | null = null;
  dataSource = ELEMENT_DATA;

  drop(event: CdkDragDrop<string>) {
    const previousIndex = this.dataSource.findIndex(d => d === event.item.data);

    moveItemInArray(this.dataSource, previousIndex, event.currentIndex);
    this.table.renderRows();
    console.log(this.dataSource);
  }
  dropDetail(event: any, element: PageModel) {
    console.log(event.item.data);
    if (element.subList) {
      const previousIndex = element.subList.findIndex(d => d === event.item.data);
      moveItemInArray(element.subList, previousIndex, event.currentIndex);

      // 找到對應的子表格並渲染
      const subTable = this.subTables.find(table => {
        return table.dataSource === element.subList;
      });

      if (subTable) {
        subTable.renderRows();
      } else {
        console.error("找不到對應的子表格");
      }
    } else {
      console.error("element.subList 未定義");
    }
    console.log(this.dataSource);
  }
  toggle(element: PageModel) {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }
  isExpanded(element: PageModel) {
    return this.expandedElement === element;
  }
  onSave(data: PageModel) {
    data.isEdit = !data.isEdit;
  }
  onOpenPage() {
    this.router.navigate(['/menuManage/pageManage']);
  }
  onDelete(data: PageModel) {

  }
  onEdit(data: PageModel) {
    data.isEdit = !data.isEdit;
  }
  onCancel(data: PageModel) {
    data.isEdit = !data.isEdit;
  }
}
