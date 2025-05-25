import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageEditDialogComponent } from './image-edit-dialog.component';

describe('ImageEditDialogComponent', () => {
  let component: ImageEditDialogComponent;
  let fixture: ComponentFixture<ImageEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
