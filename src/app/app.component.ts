import { Component, ChangeDetectorRef } from '@angular/core';
import { CronOptions } from 'projects/cron-editor/src/lib/CronOptions';
// Uncomment below line to import localizations
import { Localizations } from 'projects/cron-editor/src/lib/Localizations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Hangfire 1.7+ compatible expression: '3 2 12 1/1 ?'
  // Quartz compatible expression: '4 3 2 12 1/1 ? *'

  constructor(private cd: ChangeDetectorRef) {

  }

  public cronExpression = '0 12 1W 1/1 ?';
  public isCronDisabled = false;
  public cronOptions: CronOptions = {
    defaultTime: '10:00:00',
    use24HourTime: true,
    hideSeconds: true,
    removeSeconds: true,
    removeYears: true,
    // Uncomment below line to set swedish localization
    // localizations: Localizations.Swedish
  };
  public style = 'compact';
  public language = 'English';

  onChangeLanguage(language) {
    this.cronOptions.localizations = Localizations[language];

    this.cd.detectChanges();
  }
}
