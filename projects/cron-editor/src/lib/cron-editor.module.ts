import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CronEditorComponent, TimePickerComponent2 } from './cron-editor.component';
import { TimePickerComponent } from './time-picker/time-picker.component';

@NgModule({
  declarations: [CronEditorComponent, TimePickerComponent, TimePickerComponent2],
  imports: [CommonModule, FormsModule],
  exports: [CronEditorComponent, TimePickerComponent2]
})
export class CronEditorModule { }
