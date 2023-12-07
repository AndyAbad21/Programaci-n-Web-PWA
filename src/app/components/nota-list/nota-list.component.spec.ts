import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaListComponent } from './nota-list.component';

describe('NotaListComponent', () => {
  let component: NotaListComponent;
  let fixture: ComponentFixture<NotaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotaListComponent]
    });
    fixture = TestBed.createComponent(NotaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
