import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { CronEditorModule } from '../../projects/cron-editor/src/lib/cron-editor.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, FormsModule, CommonModule, CronEditorModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
