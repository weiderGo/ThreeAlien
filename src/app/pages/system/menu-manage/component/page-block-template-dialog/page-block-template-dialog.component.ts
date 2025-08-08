import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BlockTemplate } from '../../interface';

@Component({
  selector: 'app-page-block-template-dialog',
  imports: [CommonModule],
  templateUrl: './page-block-template-dialog.component.html',
  styleUrl: './page-block-template-dialog.component.scss',
  standalone:true
})
export class PageBlockTemplateDialogComponent {

  layouts: BlockTemplate[] = [
    { templateCode: 'large_carousel', templateName: '大圖輪播' },
    { templateCode: 'small_carousel', templateName: '小圖輪播' },
    { templateCode: 'LIRT', templateName: '左圖右文' },
    { templateCode: 'RILT', templateName: '右圖左文' },
    { templateCode: 'TIBT', templateName: '上圖下文' },
    { templateCode: 'BITT', templateName: '下圖上文' },
    { templateCode: 'video', templateName: '影片' },
    { templateCode: 'text', templateName: '純文字' },
    { templateCode: 'image', templateName: '純圖片' },
  ];
constructor(private dialogRef: MatDialogRef<PageBlockTemplateDialogComponent>) {}

selectLayout(layout: BlockTemplate) {
  this.dialogRef.close(layout);
}
}
