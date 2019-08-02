import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TimePickerComponent } from './time-picker.component';

describe('TimePickerComponent', () => {
    let component: TimePickerComponent;
    let fixture: ComponentFixture<TimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimePickerComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePickerComponent);
    component = fixture.componentInstance;
    component.time = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      hourTypes: 'AM'
    };
    fixture.detectChanges();
  });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
