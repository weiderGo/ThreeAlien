import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-page-block-template-dialog',
  imports: [CommonModule],
  templateUrl: './page-block-template-dialog.component.html',
  styleUrl: './page-block-template-dialog.component.scss',
  standalone:true
})
export class PageBlockTemplateDialogComponent {

  layouts: any[] = [
    { value: 'large_carousel', label: '大圖輪播' },
    { value: 'small_carousel', label: '小圖輪播' },
    { value: 'LIRT', label: '左圖右文' },
    { value: 'RILT', label: '右圖左文' },
    { value: 'TIBT', label: '上圖下文' },
    { value: 'BITT', label: '下圖上文' },
    { value: 'video', label: '影片' },
    { value: 'text', label: '純文字' },
  ];
constructor(private dialogRef: MatDialogRef<PageBlockTemplateDialogComponent>) {}

selectLayout(layout: any) {
  this.dialogRef.close(layout);
}
}
