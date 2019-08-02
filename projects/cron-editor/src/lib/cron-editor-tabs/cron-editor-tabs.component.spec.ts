import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TimePickerComponent } from '../time-picker/time-picker.component';

import { CronEditorTabsComponent } from './cron-editor-tabs.component';

describe('CronEditorTabsComponent', () => {
  let component: CronEditorTabsComponent;
  let fixture: ComponentFixture<CronEditorTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CronEditorTabsComponent,
        TimePickerComponent
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CronEditorTabsComponent);
    component = fixture.componentInstance;
    component.options = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
