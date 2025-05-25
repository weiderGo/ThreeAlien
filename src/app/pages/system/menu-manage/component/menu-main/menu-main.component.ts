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


export interface menuModel {
  name: string;
  sort: number;
  isEdit: boolean;
  subList: subModel[]
}
export interface subModel {
  name: string;
  sort: number;
  isEdit: boolean;
}

export const ELEMENT_DATA: menuModel[] = [
  {
    sort: 1, name: '關於我們', isEdit: false,
    subList: [
      { name: '電話', sort: 0, isEdit: false },
      { name: '地址', sort: 1, isEdit: false },
      { name: '照片', sort: 2, isEdit: false }
    ]
  },
  {
    sort: 2, name: '公司簡介', isEdit: false,
    subList: [
      { name: '公司電話', sort: 0, isEdit: false },
      { name: '公司地址', sort: 1, isEdit: false }
    ]
  },
  {
    sort: 3, name: '產品介紹', isEdit: false,
    subList: [
      { name: '電子產品', sort: 0, isEdit: false },
      { name: '寢具', sort: 1, isEdit: false }
    ]
  },
  { sort: 4, name: '聯絡我們', isEdit: false, subList: [] },
  { sort: 5, name: '品牌介紹', isEdit: false, subList: [] },
  { sort: 6, name: '活動展期', isEdit: false, subList: [] },
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
  @ViewChild('table', { static: true }) table!: MatTable<menuModel>;
  @ViewChildren(MatTable) subTables!: QueryList<MatTable<subModel>>;
  router = inject(Router);
  displayedColumns: string[] = ['sort', 'isEdit'];
  expandedElement: menuModel | null = null;
  dataSource = ELEMENT_DATA;

  drop(event: CdkDragDrop<string>) {
    const previousIndex = this.dataSource.findIndex(d => d === event.item.data);

    moveItemInArray(this.dataSource, previousIndex, event.currentIndex);
    this.table.renderRows();
    console.log(this.dataSource);
  }
  dropDetial(event: any, element: menuModel) {
    console.log(event.item.data);
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
    console.log(this.dataSource);
  }
  toggle(element: menuModel) {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }
  isExpanded(element: menuModel) {
    return this.expandedElement === element;
  }
  onSave(data: menuModel) {
    data.isEdit = !data.isEdit;
  }
  onOpenPage() {
    this.router.navigate(['/menuManage/pageManage']);
  }
  onDelete(data: menuModel) {

  }
  onEdit(data: menuModel) {
    data.isEdit = !data.isEdit;
  }
  onCancel(data: menuModel) {
    data.isEdit = !data.isEdit;
  }
}
