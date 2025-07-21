import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaModalComponent } from './noticia-modal.component';

describe('NoticiaModalComponent', () => {
  let component: NoticiaModalComponent;
  let fixture: ComponentFixture<NoticiaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticiaModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
