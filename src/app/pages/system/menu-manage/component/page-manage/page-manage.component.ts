import { Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { Editor } from 'primeng/editor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-page-manage',
  imports: [FormsModule,EditorModule,Editor,MatIconModule],
  templateUrl: './page-manage.component.html',
  styleUrl: './page-manage.component.scss',
  standalone: true
})
export class PageManageComponent{
  form: FormGroup;
  selectedFileName: string | null = null;


  text: string = '';
  safeText: SafeHtml = '';
  @ViewChild('quillEditor') quillEditor!: Editor;
  constructor(private sanitizer: DomSanitizer,private fb: FormBuilder) {
    this.form = this.fb.group({
      image: [null]
    });
   }

  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline'], // 文字樣式
      [{ 'list': 'ordered' }, { 'list': 'bullet' }], // 清單
      [{ 'color': [] }, { 'background': [] }], // 顏色
      ['link'], // 連結
    ]
  };
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        this.form.patchValue({ image: file });
        this.selectedFileName = file.name;
      } else {
        alert('只允許上傳 JPG 格式圖片');
      }
    }
  }

  upload(): void {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('image', this.form.get('image')!.value);

      // 模擬上傳
      console.log('要上傳的圖片：', this.form.get('image')!.value);
    }
  }

  test() {
    console.log(this.quillEditor.getQuill());
  }

  updateSafeText() {
    this.safeText = this.sanitizer.bypassSecurityTrustHtml(this.text);
  }

  //因為編碼關係 會被判定為XSS攻擊，所以要先轉換
  onTextChange(event: any) {
    this.text = event.htmlValue;
    this.updateSafeText();
  }
}
