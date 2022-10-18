import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchedulerComponent } from './edit-scheduler.component';

describe('EditSchedulerComponent', () => {
  let component: EditSchedulerComponent;
  let fixture: ComponentFixture<EditSchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSchedulerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
