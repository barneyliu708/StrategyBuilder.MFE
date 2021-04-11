import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEditDialog } from './event-edit.component';

describe('EventEditComponent', () => {
  let component: EventEditDialog;
  let fixture: ComponentFixture<EventEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventEditDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventEditDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
