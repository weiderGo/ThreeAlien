import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Image } from 'primeng/image';

@Component({
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, CommonModule,Image,MatIconModule,MatButtonModule ],
  standalone: true,
  selector: 'app-image-edit-dialog',
  templateUrl: './image-edit-dialog.component.html',
  styleUrls: ['./image-edit-dialog.component.scss']
})
export class ImageEditDialogComponent {
  tempImageName: string = '';
  tempAlt: string = '';
  uploadedFileName: string = ''; // 實際上傳後的檔名

  constructor(public dialogRef: MatDialogRef<ImageEditDialogComponent>) {}

  // 組合圖片路徑
  getImageUrl(fileName: string): string {
    console.log(fileName)
    console.log(fileName ? `/assets/uploads/${fileName}` : '');
    return fileName ? `/assets/uploads/${fileName}` : '';
  }

  // 上傳圖片
  onFileChange(event: any) {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      // === 實際應用時請呼叫後端API上傳 ===
      // 這裡僅模擬上傳，直接用檔名
      // 實際應用應該是API回傳檔名
      this.uploadedFileName = file.name;
      this.tempImageName = file.name;
      // 若要即時預覽可用 FileReader 讀 base64
    }
  }

  // 刪除圖片
  deleteImage() {
    // === 實際應用時請呼叫後端API刪除檔案 ===
    this.uploadedFileName = '';
    this.tempImageName = '';
  }

  // 儲存
  save() {
    if (!this.uploadedFileName || !this.tempImageName || !this.tempAlt) return;
    this.dialogRef.close({
      fileName: this.uploadedFileName,
      alt: this.tempAlt
    });
  }
}
