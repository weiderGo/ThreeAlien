import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { EditorModule } from 'primeng/editor';

// 這份字型列表是純資料，可以保留在模組頂層
const fontNames = ['serif', 'monospace', 'noto-sans-tc', 'microsoft-jhenghei', 'dfkai-sb', 'mingliu'];
interface Block {
  imageUrl?: string;
  imageId: string;
  text: string;
}
interface LayoutGroup {
  type: string; // 1.左圖右文 2.右圖左文 3.上圖下文 4.下圖上文
  data: Block[];
}
@Component({
  selector: 'app-page-manage',
  templateUrl: './page-manage.component.html',
  styleUrls: ['./page-manage.component.scss'],
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule,
    MatIconModule, MatDividerModule, CommonModule, MatMenuModule, EditorModule
  ]
})
export class PageManageComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Quill.js 依賴瀏覽器 API (如 `document`)，因此只能在瀏覽器平台載入與執行
      import('quill').then(QuillModule => {
        const Quill = QuillModule.default;
        const Font: any = Quill.import('formats/font');
        Font.whitelist = fontNames;
        Quill.register(Font, true);

        this.initializeEditorModules();
      });
    }
  }

  layouts: any[] = [
    { value: 'LIRT', label: '左圖右文' },
    { value: 'RILT', label: '右圖左文' },
    { value: 'TIBT', label: '上圖下文' },
    { value: 'BITT', label: '下圖上文' }
  ];
  layoutGroups: any[] = [];

  // 定義 p-editor 的 modules
  editorModules: any;

  initializeEditorModules() {
    this.editorModules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote',],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        // 將我們的自訂字型加入工具列
        [{ 'font': fontNames }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],]
    };
  }

  getLayoutLabel(type: string): string {
    const layout = this.layouts.find(l => l.value === type);
    return layout ? layout.label : '未知版型';
  }

  addLayoutGroup(type: string) {
    if (!type) return;
    this.layoutGroups.push({ type: type, data: [{ text: '', imageUrl: '' }] });
  }

  removeLayoutGroup(groupIndex: number) {
    this.layoutGroups.splice(groupIndex, 1);
  }

  addBlockToGroup(groupIndex: number) {
    this.layoutGroups[groupIndex].data.push({ text: '', imageUrl: '' });
  }

  removeBlockFromGroup(groupIndex: number, blockIndex: number) {
    this.layoutGroups[groupIndex].data.splice(blockIndex, 1);
  }

  onFileChange(event: any, block: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => { block.imageUrl = e.target.result; };
      reader.readAsDataURL(file);
    }
  }
}
