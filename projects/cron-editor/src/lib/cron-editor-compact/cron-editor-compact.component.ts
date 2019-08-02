import { Component, OnInit } from '@angular/core';

import { CronEditorComponent } from '../cron-editor.component';
import { CronFormat } from '../CronOptions';
import Utils from '../Utils';

@Component({
  selector: 'cron-editor-compact',
  templateUrl: './cron-editor-compact.component.html',
  styleUrls: ['../cron-editor.component.css']
})
export class CronEditorCompactComponent extends CronEditorComponent implements OnInit {
  public every = 1;
  public everySelectOptions = this.getEverySelectOptions();
  public currentOptions = this.everySelectOptions.minutes;
  public time = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    hourTypes: 'AM'
  };

  public onDayOfMonth = '1';
  public onDaysOfWeek = {
    MON: true,
    TUE: false,
    WED: false,
    THU: false,
    FRI: false,
    SAT: false,
    SUN: false
  };

  public onDayOfWeekNum = 1;
  public onDayOfWeek = 'MON';

  public onMonth = 0;
  public monthType = 'sequence'; // [sequence, weekday]

  public yearType = 'sequence'; // [sequence, weekday]

  public onMonthsInYear = {
    JAN: true,
    FEB: false,
    MAR: false,
    APR: false,
    MAY: false,
    JUN: false,
    JUL: false,
    AUG: false,
    SEP: false,
    OCT: false,
    NOV: false,
    DEC: false
  };

  public repeatType = 'minutes';
  public types: string[];

  public ngOnInit() {
    this.setTypes();
  }

  onEveryChange(): void {
    this.updateCron();
  }

  onTypeChange(typeValue: string): void {
    this.updateCron();
    if (typeValue === 'weeks' || typeValue === 'years')
      return;
    this.updateSelectEveryValues(typeValue);
  }

  onTimeChange(): void {
    this.updateCron();
  }

  onDaysOfWeekChange(): void {
    this.updateCron();
  }

  onDayOfMonthChange(): void {
    this.updateCron();
  }

  onMonthsInYearChange(): void {
    this.updateCron();
  }

  setQuartz(): void {
    this.options.format = CronFormat.Quartz;
    this.options.removeSeconds = false;
  }

  setNCronTab(): void {
    this.options.format = CronFormat.NCronTab;
    this.options.removeSeconds = true;
  }

  setTypes(): void {
    const types = ['minutes',
      'hours',
      'days',
      'weeks',
      'months'];

    if (!this.options.removeYears) {
      types.push('years');
    }
    this.types = types;
  }

  setValues(cron: string) {
    this.setTypes();
    let normalizedCron = cron;
    if (this.options.removeSeconds) {
      normalizedCron = `0 ${normalizedCron}`;
    }

    if (this.options.removeYears) {
      normalizedCron = `${normalizedCron} *`;
    }

    const [seconds, minutes, hours, dayOfMonth, months, dayOfWeek, years] = normalizedCron.split(' ');

    if (normalizedCron.match(/\d+ \d+\/\d+ \* 1\/1 \* \? \*/)) {
      this.setQuartz();
      this.repeatType = 'minutes';

      const minParts = minutes.split('/');
      this.every = Number(minParts[1]);

      this.time.seconds = Number(seconds);
    } else if (normalizedCron.match(/\d+ \*\/\d+ \* \* \* \* \*/)) {
      this.setNCronTab();
      this.repeatType = 'minutes';

      const minParts = minutes.split('/');
      this.every = Number(minParts[1]);
    }
    else if (normalizedCron.match(/\d+ \d+ \d+\/\d+ 1\/1 \* \? \*/)) {
      this.setQuartz();
      this.repeatType = 'hours';

      const hoursParts = hours.split('/');
      this.every = Number(hoursParts[1]);

      this.time.minutes = Number(minutes);
      this.time.seconds = Number(seconds);
    } else if (normalizedCron.match(/\d+ \d+ \*\/\d+ \* \* \* \*/)) {
      this.setNCronTab();
      this.repeatType = 'hours';

      const hoursParts = hours.split('/');
      this.every = Number(hoursParts[1]);

      this.time.minutes = Number(minutes);
    } else if (normalizedCron.match(/\d+ \d+ \d+ \d+\/\d+ \* \? \*/)) {
      this.setQuartz();
      this.repeatType = 'days';

      const daysParts = dayOfMonth.split('/');
      this.every = Number(daysParts[1]);

      const hoursNr = Number(hours);
      this.time.hours = this.getAmPmHour(hoursNr);
      this.time.hourTypes = this.getHourType(hoursNr);
      this.time.minutes = Number(minutes);
      this.time.seconds = Number(seconds);
    } else if (normalizedCron.match(/\d+ \d+ \d+ \*\/\d+ \* \* \*/)) {
      this.setNCronTab();
      this.repeatType = 'days';

      const daysParts = dayOfMonth.split('/');
      this.every = Number(daysParts[1]);

      const hoursNr = Number(hours);
      this.time.hours = this.getAmPmHour(hoursNr);
      this.time.hourTypes = this.getHourType(hoursNr);
      this.time.minutes = Number(minutes);
    } else if (normalizedCron.match(/\d+ \d+ \d+ \? \* (MON|TUE|WED|THU|FRI|SAT|SUN)(,(MON|TUE|WED|THU|FRI|SAT|SUN))* \*/)) {
      this.setQuartz();
      this.repeatType = 'weeks';

      for (let day in this.onDaysOfWeek) {
        if (!this.onDaysOfWeek.hasOwnProperty(day))
          continue;
        this.onDaysOfWeek[day] = dayOfWeek.indexOf(day) >= 0;
      }

      const hoursNr = Number(hours);
      this.time.hours = this.getAmPmHour(hoursNr);
      this.time.hourTypes = this.getHourType(hoursNr);
      this.time.minutes = Number(minutes);
      this.time.seconds = Number(seconds);
    } else if (normalizedCron.match(/\d+ \d+ \d+ \* \* (MON|TUE|WED|THU|FRI|SAT|SUN)(,(MON|TUE|WED|THU|FRI|SAT|SUN))* \*/)) {
      this.setNCronTab();
      this.repeatType = 'weeks';

      for (let day in this.onDaysOfWeek) {
        if (!this.onDaysOfWeek.hasOwnProperty(day))
          continue;
        this.onDaysOfWeek[day] = dayOfWeek.indexOf(day) >= 0;
      }

      const hoursNr = Number(hours);
      this.time.hours = this.getAmPmHour(hoursNr);
      this.time.hourTypes = this.getHourType(hoursNr);
      this.time.minutes = Number(minutes);
    } else if (normalizedCron.match(/\d+ \d+ \d+ (\d+|L|LW|1W) \d+\/\d+ \? \*/)) {
      this.setQuartz();
      this.repeatType = 'months';

      const monthParts = months.split('/');
      this.every = Number(monthParts[1]);

      this.onDayOfMonth = dayOfMonth;

      const hoursNr = Number(hours);
      this.time.hours = this.getAmPmHour(hoursNr);
      this.time.hourTypes = this.getHourType(hoursNr);
      this.time.minutes = Number(minutes);
      this.time.seconds = Number(seconds);
    } else if (normalizedCron.match(/\d+ \d+ \d+ \d+ \*\/\d+ \* \*/)) {
      this.setNCronTab();
      this.repeatType = 'months';

      const monthParts = months.split('/');
      this.every = Number(monthParts[1]);

      this.onDayOfMonth = dayOfMonth;

      const hoursNr = Number(hours);
      this.time.hours = this.getAmPmHour(hoursNr);
      this.time.hourTypes = this.getHourType(hoursNr);
      this.time.minutes = Number(minutes);
    } else if (normalizedCron.match(/\d+ \d+ \d+ (\d+|L|LW|1W) (JAN|FEB|MAR|APR|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(,(JAN|FEB|MAR|APR|JUN|JUL|AUG|SEP|OCT|NOV|DEC))* \? \d+\/\d+/)) {
      this.setQuartz();
      this.repeatType = 'years';

      const yearsParts = years.split('/');
      this.every = Number(yearsParts[1]);

      for (let month in this.onMonthsInYear) {
        if (!this.onMonthsInYear.hasOwnProperty(month))
          continue;
        this.onMonthsInYear[month] = months.indexOf(month) >= 0;
      }

      this.onDayOfMonth = dayOfMonth;

      const hoursNr = Number(hours);
      this.time.hours = this.getAmPmHour(hoursNr);
      this.time.hourTypes = this.getHourType(hoursNr);
      this.time.minutes = Number(minutes);
      this.time.seconds = Number(seconds);
    } else if (normalizedCron.match(/\d+ \d+ \d+ \d+ (JAN|FEB|MAR|APR|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(,(JAN|FEB|MAR|APR|JUN|JUL|AUG|SEP|OCT|NOV|DEC))* \* \*\/\d+/)) {
      this.setNCronTab();
      this.repeatType = 'years';

      const yearsParts = years.split('/');
      this.every = Number(yearsParts[1]);

      for (let month in this.onMonthsInYear) {
        if (!this.onMonthsInYear.hasOwnProperty(month))
          continue;
        this.onMonthsInYear[month] = months.indexOf(month) >= 0;
      }

      this.onDayOfMonth = dayOfMonth;

      const hoursNr = Number(hours);
      this.time.hours = this.getAmPmHour(hoursNr);
      this.time.hourTypes = this.getHourType(hoursNr);
      this.time.minutes = Number(minutes);
    } else {
      this.validation.isValid = false;
      this.validation.errorMessage = this.l('couldNotParseExpression');
    }
  }

  updateSelectEveryValues(typeValue: string) {
    var neweverySelectOptions = this.everySelectOptions[typeValue];
    var maxNewValue = neweverySelectOptions[neweverySelectOptions.length - 1];
    var curValue = this.every;
    this.currentOptions = this.everySelectOptions[typeValue];
    if (maxNewValue < curValue) {
      this.every = 1;
    }
  }

  updateCron(): void {
    this.isDirty = true;

    const parts = [];

    // Seconds part
    if (!this.options.removeSeconds) {
      parts.push(this.time.seconds);
    }

    // Minutes part
    parts.push(this.getMinutePart());

    // Hours part
    parts.push(this.getHourPart());

    // Days part
    parts.push(this.getDaysPart());

    // Months part
    parts.push(this.getMonthsPart());

    // Weekdays part
    parts.push(this.getWeekdaysPart());

    // Years part
    if (!this.options.removeYears) {
      parts.push(this.getYearsPart());
    }

    this.cron = parts.join(' ');
  }

  getMinutePart(): string {
    if ('minutes' === this.repeatType) {
      if (this.options.format === CronFormat.Quartz) {
        return `0/${this.every}`;
      } else {
        return `*/${this.every}`;
      }
    }

    return `${this.time.minutes}`;
  }

  getHourPart(): string {
    if ('minutes' === this.repeatType) {
      return '*';
    }

    if ('hours' !== this.repeatType) {
      if (this.options.use24HourTime) {
        return `${this.time.hours}`;
      } else {
        return this.time.hourTypes === 'AM' ? (this.time.hours === 12 ? '0' : `${this.time.hours}`) : (this.time.hours === 12 ? '12' : `${this.time.hours + 12}`);
      }
    }

    if (this.options.format === CronFormat.Quartz) {
      return `0/${this.every}`;
    } else {
      return `*/${this.every}`;
    }
  }

  getDaysPart(): string {
    if ('days' === this.repeatType) {
      if (this.options.format === CronFormat.Quartz) {
        return `1/${this.every}`;
      } else {
        return `*/${this.every}`;
      }
    } else if ('weeks' === this.repeatType) {
      if (this.options.format === CronFormat.Quartz) {
        return '?';
      } else {
        return '*';
      }
    } else if ('months' === this.repeatType || 'years' === this.repeatType) {
      if ('weekday' === this.monthType) {
        if (this.options.format === CronFormat.Quartz) {
          return '?';
        } else {
          return '*';
        }
      } else {
        return `${this.onDayOfMonth}`;
      }
    } else {
      if (this.options.format === CronFormat.Quartz) {
        return '1/1';
      } else {
        return '*';
      }
    }
  }

  getMonthsPart(): string {
    if ('months' === this.repeatType) {
      if (this.options.format === CronFormat.Quartz) {
        return `1/${this.every}`;
      } else {
        return `*/${this.every}`;
      }
    } else if ('years' === this.repeatType) {
      const months = [];
      for (let month in this.onMonthsInYear) {
        if (!this.onMonthsInYear.hasOwnProperty(month) || !this.onMonthsInYear[month])
          continue;
        months.push(month);
      }
      if (months.length === 0) {
        this.onMonthsInYear.JAN = true;
        months.push('JAN');
      }
      return months.join(',');
    } else {
      return '*';
    }
  }

  getWeekdaysPart(): string {
    if ('weeks' === this.repeatType) {
      const days = [];
      for (let day in this.onDaysOfWeek) {
        if (!this.onDaysOfWeek.hasOwnProperty(day) || !this.onDaysOfWeek[day])
          continue;
        days.push(day);
      }
      return days.join(',');
    } else if (('months' === this.repeatType && 'weekday' === this.monthType) ||
      ('years' === this.repeatType && 'weekday' === this.yearType)) {
      return `${this.onDayOfWeek}#${this.onDayOfWeekNum}`;
    } else {
      if (this.options.format === CronFormat.Quartz) {
        return '?';
      } else {
        return '*';
      }
    }
  }

  getYearsPart(): string {
    if ('years' === this.repeatType) {
      if (this.options.format === CronFormat.Quartz) {
        return `1/${this.every}`;
      } else {
        return `*/${this.every}`;
      }
    } else {
      return '*';
    }
  }

  private getEverySelectOptions() {
    return {
      minutes: Utils.getRange(0, 59),
      hours: Utils.getRange(1, 23),
      days: Utils.getRange(1, 31),
      months: Utils.getRange(1, 12),
      weeks: Utils.getRange(1, 23)
    };
  }
}
