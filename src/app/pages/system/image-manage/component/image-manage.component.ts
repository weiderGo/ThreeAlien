import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ImageEditDialogComponent } from './image-edit-dialog/image-edit-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

interface folderModle {
  fileId: number;
  fileName: string;
  isExpanded: boolean;
  data: ImageModle[];
  isEdit: boolean;
}
interface ImageModle {
  imgId: number;
  imgName: string;
  imageBase64: string;
  alt: string;
}

@Component({
  selector: 'app-image-manage',
  imports: [MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, CommonModule, MatCardModule, MatDialogModule, FormsModule],
  templateUrl: './image-manage.component.html',
  styleUrl: './image-manage.component.scss',
  standalone: true,
})


export class ImageManageComponent implements OnInit{
  folders: folderModle[] = EXAMPLE_DATA;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    private dialogRef: MatDialogRef<ImageManageComponent>,
    private readonly dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public inputData: any
  ) { }
  ngOnInit(): void {
    console.log(this.inputData);
  }

  toggleExpand(folder: folderModle) {
    folder.isExpanded = !folder.isExpanded;
  }

  editImage(img: any) {
    const dialogRef = this.dialog.open(ImageEditDialogComponent, {
      width: '400px',
      data: { ...img }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        img.imgName = result.imgName;
        img.alt = result.alt;
        if (result.imageBase64) {
          img.imageBase64 = result.imageBase64;
        }
      }
    });
  }

  onFileChange(event: any, img: ImageModle) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        img.imageBase64 = e.target.result.split(',')[1];
      };
      reader.readAsDataURL(file);
    }
  }

  addFolder() {
    const folderName = prompt('請輸入資料夾名稱');
    if (folderName) {
      const newFolder: folderModle = {
        fileId: Date.now(),
        fileName: folderName,
        isExpanded: true,
        data: [],
        isEdit: false
      };
      this.folders.push(newFolder);
    }
  }

  editFolderName(folder: folderModle, event: MouseEvent) {
    folder.isEdit = !folder.isEdit;
    event.stopPropagation();
  }
  saveFolderName(folder: folderModle, event: MouseEvent) {
    folder.isEdit = !folder.isEdit;
    event.stopPropagation();
  }
  onCancel(folder: folderModle, event: MouseEvent) {
    folder.isEdit = false;
    event.stopPropagation();
  }


  addImage(folder: folderModle, event: MouseEvent) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ImageEditDialogComponent, {
      width: '400px',
      data: { imgName: '', alt: '', imageBase64: '' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.imageBase64) {
        const newImage: ImageModle = {
          imgId: Date.now(),
          imgName: result.imgName,
          alt: result.alt,
          imageBase64: result.imageBase64
        };
        folder.data.push(newImage);
      }
    });
  }

   selectImage(img: ImageModle) {
    console.log(img);
    if (this.inputData?.isCheck) {
      // 關閉 dialog 並回傳圖片資訊
      this.dialogRef.close({
        imageBase64: img.imageBase64,
        imgName: img.imgName,
        imgId: img.imgId
      });
    }
  }

}

const EXAMPLE_DATA: folderModle[] = [
  {
    fileId: 1,
    fileName: '活動一',
    isExpanded: false,
    data: [
      { imgId: 1, imgName: '促銷1-1', imageBase64: 'assets/uploads/head.jpg', alt: '這是圖片' },
      { imgId: 2, imgName: '促銷1-2', imageBase64: 'assets/uploads/head2.jpg', alt: '這是圖片' },
      { imgId: 3, imgName: '促銷1-3', imageBase64: 'assets/uploads/head3.jpg', alt: '這是圖片' },
      { imgId: 4, imgName: '促銷1-3', imageBase64: 'assets/uploads/head.jpg', alt: '這是圖片' }
    ],
    isEdit: false
  },
  {
    fileId: 2,
    fileName: '活動二',
    isExpanded: false,
    data: [
      { imgId: 4, imgName: '促銷1-1', imageBase64: 'assets/uploads/head2.jpg', alt: '這是圖片' },
      { imgId: 5, imgName: '促銷1-2', imageBase64: 'assets/uploads/head3.jpg', alt: '這是圖片' },
    ],
    isEdit: false
  }
];
