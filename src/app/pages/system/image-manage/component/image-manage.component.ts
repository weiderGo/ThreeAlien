import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ImageEditDialogComponent } from './image-edit-dialog/image-edit-dialog.component';

interface folderModle {
  fileId: number;
  fileName: string;
  isExpanded: boolean;
  data: ImageModle[];
}
interface ImageModle {
  imgId: number;
  imgName: string;
  imageBase64: string;
  alt: string;
}

@Component({
  selector: 'app-image-manage',
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './image-manage.component.html',
  styleUrl: './image-manage.component.scss',
  standalone: true,
})


export class ImageManageComponent {
  folders: folderModle[] = EXAMPLE_DATA;
  @Output() onSave = new EventEmitter<any>();

  constructor(private dialog: MatDialog) { }

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
        data: []
      };
      this.folders.push(newFolder);
    }
  }

  editFolderName(folder: folderModle, event: MouseEvent) {
    event.stopPropagation();
    const newName = prompt('請輸入新的資料夾名稱', folder.fileName);
    if (newName) {
      folder.fileName = newName;
    }
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

  saveChanges() {
    // this.http.post('你的API網址', this.folders).subscribe(() => {
    //   this.onSave.emit();
    // });
  }

}

const EXAMPLE_DATA: folderModle[] = [
  {
    fileId: 1,
    fileName: '活動一',
    isExpanded: true,
    data: [
      { imgId: 1, imgName: '促銷1-1', imageBase64: 'https://via.placeholder.com/150', alt: '這是圖片' },
      { imgId: 2, imgName: '促銷1-2', imageBase64: 'https://via.placeholder.com/150', alt: '這是圖片' },
      { imgId: 3, imgName: '促銷1-3', imageBase64: 'https://via.placeholder.com/150', alt: '這是圖片' }
    ]
  },
  {
    fileId: 2,
    fileName: '活動二',
    isExpanded: true,
    data: [
      { imgId: 4, imgName: '促銷1-1', imageBase64: 'https://via.placeholder.com/150', alt: '這是圖片' },
      { imgId: 5, imgName: '促銷1-2', imageBase64: 'https://via.placeholder.com/150', alt: '這是圖片' },
    ]
  }
];
