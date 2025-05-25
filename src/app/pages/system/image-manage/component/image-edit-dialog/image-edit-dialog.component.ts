import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, CommonModule],
  selector: 'app-image-edit-dialog',
  templateUrl: './image-edit-dialog.component.html',
  styleUrls: ['./image-edit-dialog.component.scss']
})
export class ImageEditDialogComponent {
  tempImageName: string;
  tempAlt: string;
  imageBase64: string = '';

  constructor(
    public dialogRef: MatDialogRef<ImageEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.tempImageName = data.imgName;
    this.tempAlt = data.alt;
    this.imageBase64 = data.imageBase64 || '';
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageBase64 = e.target.result.split(',')[1];
      };
      console.log('File selected:', file);

      reader.readAsDataURL(file);
    }
  }

  save() {
    this.dialogRef.close({
      imgName: this.tempImageName,
      alt: this.tempAlt,
      imageBase64: this.imageBase64
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
