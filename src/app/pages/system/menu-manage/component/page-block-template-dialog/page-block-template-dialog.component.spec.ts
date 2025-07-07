import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBlockTemplateDialogComponent } from './page-block-template-dialog.component';

describe('PageBlockTemplateDialogComponent', () => {
  let component: PageBlockTemplateDialogComponent;
  let fixture: ComponentFixture<PageBlockTemplateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageBlockTemplateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageBlockTemplateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
