import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { CronOptions } from './CronOptions';

import { Days, MonthWeeks, Months } from './enums';
import Utils from './Utils';

@Component({
  selector: 'cron-editor',
  templateUrl: './cron-editor.component.html',
  styleUrls: ['./cron-editor.component.css']
})
export class CronEditorComponent implements OnInit, OnChanges {
  @Input() public disabled: boolean;
  @Input() public options: CronOptions;

  @Input() get cron(): string { return this.localCron; }

  set cron(value: string) {
    this.localCron = value;
    if (this.isValidExpression) {
      this.cronChange.emit(this.localCron);
    }
  }

  // the name is an Angular convention, @Input variable name + "Change" suffix
  @Output() cronChange = new EventEmitter();

  public activeTab: string;
  public selectOptions = this.getSelectOptions();
  public state: any;
  public isValidExpression: boolean;

  private localCron: string;
  private isDirty: boolean;

  public ngOnInit() {
    if (this.options.removeSeconds) {
      this.options.hideSeconds = true;
    }

    this.state = this.getDefaultState();

    this.handleModelChange(this.cron);
    this.isValidExpression = this.onValidateQuartzExpression(this.cron);
  }

  public ngOnChanges(changes: SimpleChanges) {
    const newCron = changes['cron'];
    if (newCron && !newCron.firstChange) {
      this.handleModelChange(this.cron);
    }
  }

  public setActiveTab(tab: string) {
    if (!this.disabled) {
      this.activeTab = tab;
      this.regenerateCron();
    }
  }

  public dayDisplay(day: string): string {
    return Days[day];
  }

  public monthWeekDisplay(monthWeekNumber: number): string {
    return MonthWeeks[monthWeekNumber];
  }

  public monthDisplay(month: number): string {
    return Months[month];
  }

  public monthDayDisplay(month: string): string {
    if (month === 'L') {
      return 'Last Day';
    } else if (month === 'LW') {
      return 'Last Weekday';
    } else if (month === '1W') {
      return 'First Weekday';
    } else {
      return `${month}${this.getOrdinalSuffix(month)} day`;
    }
  }

  public regenerateCron() {
    this.isDirty = true;

    switch (this.activeTab) {
      case 'onetime':
        this.cron = this.state.datetime;
        break;
      case 'minutes':
        this.generateMinutesCron();
        break;
      case 'hourly':
        this.generateHourlyCron();
        break;
      case 'daily':
        this.generateDailyCron();
        break;
      case 'weekly':
        this.generateWeeklyCron();
        break;
      case 'monthly':
        this.generateMonthlyCron();
        break;
      case 'yearly':
        this.generateYearlyCron();
        break;
      case 'advanced':
        this.cron = this.state.advanced.expression;
        break;
      default:
        throw new Error('Invalid cron active tab selection');
    }

    if (this.activeTab && this.activeTab.toLowerCase() !== 'onetime') {
      this.isValidExpression = this.onValidateQuartzExpression(this.cron);
    }
  }

  private generateMinutesCron() {
    this.cron = `0/${this.state.minutes.minutes} * 1/1 * ?`;

    if (!this.options.removeSeconds) {
      this.cron = `${this.state.minutes.seconds} ${this.cron}`;
    }

    if (!this.options.removeYears) {
      this.cron = `${this.cron} *`;
    }
  }

  private generateHourlyCron() {
    this.cron = `${this.state.hourly.minutes} 0/${this.state.hourly.hours} 1/1 * ?`;

    if (!this.options.removeSeconds) {
      this.cron = `${this.state.hourly.seconds} ${this.cron}`;
    }

    if (!this.options.removeYears) {
      this.cron = `${this.cron} *`;
    }
  }

  private generateDailyCron() {
    switch (this.state.daily.subTab) {
      case 'everyDays':
        // tslint:disable-next-line:max-line-length
        this.cron = `${this.state.daily.everyDays.minutes} ${this.hourToCron(this.state.daily.everyDays.hours, this.state.daily.everyDays.hourType)} 1/${this.state.daily.everyDays.days} * ?`;

        if (!this.options.removeSeconds) {
          this.cron = `${this.state.daily.everyDays.seconds} ${this.cron}`;
        }

        if (!this.options.removeYears) {
          this.cron = `${this.cron} *`;
        }
        break;
      case 'everyWeekDay':
        // tslint:disable-next-line:max-line-length
        this.cron = `${this.state.daily.everyWeekDay.minutes} ${this.hourToCron(this.state.daily.everyWeekDay.hours, this.state.daily.everyWeekDay.hourType)} ? * MON-FRI`;

        if (!this.options.removeSeconds) {
          this.cron = `${this.state.daily.everyWeekDay.seconds} ${this.cron}`;
        }

        if (!this.options.removeYears) {
          this.cron = `${this.cron} *`;
        }
        break;
      default:
        throw new Error('Invalid cron daily subtab selection');
    }
  }

  private generateWeeklyCron() {
    const days = this.selectOptions.days
      .reduce((acc, day) => this.state.weekly[day] ? acc.concat([day]) : acc, [])
      .join(',');
    this.cron = `${this.state.weekly.minutes} ${this.hourToCron(this.state.weekly.hours, this.state.weekly.hourType)} ? * ${days}`;

    if (!this.options.removeSeconds) {
      this.cron = `${this.state.weekly.seconds} ${this.cron}`;
    }

    if (!this.options.removeYears) {
      this.cron = `${this.cron} *`;
    }
  }

  private generateMonthlyCron() {
    switch (this.state.monthly.subTab) {
      case 'specificDay':
        const day = this.state.monthly.runOnWeekday ? `${this.state.monthly.specificDay.day}W` : this.state.monthly.specificDay.day;
        // tslint:disable-next-line:max-line-length
        this.cron = `${this.state.monthly.specificDay.minutes} ${this.hourToCron(this.state.monthly.specificDay.hours, this.state.monthly.specificDay.hourType)} ${day} 1/${this.state.monthly.specificDay.months} ?`;

        if (!this.options.removeSeconds) {
          this.cron = `${this.state.monthly.specificDay.seconds} ${this.cron}`;
        }

        if (!this.options.removeYears) {
          this.cron = `${this.cron} *`;
        }
        break;
      case 'specificWeekDay':
        // tslint:disable-next-line:max-line-length
        this.cron = `${this.state.monthly.specificWeekDay.minutes} ${this.hourToCron(this.state.monthly.specificWeekDay.hours, this.state.monthly.specificWeekDay.hourType)} ? ${this.state.monthly.specificWeekDay.startMonth}/${this.state.monthly.specificWeekDay.months} ${this.state.monthly.specificWeekDay.day}${this.state.monthly.specificWeekDay.monthWeek}`;

        if (!this.options.removeSeconds) {
          this.cron = `${this.state.monthly.specificWeekDay.seconds} ${this.cron}`;
        }

        if (!this.options.removeYears) {
          this.cron = `${this.cron} *`;
        }
        break;
      default:
        throw new Error('Invalid cron monthly subtab selection');
    }
  }

  private generateYearlyCron() {
    switch (this.state.yearly.subTab) {
      case 'specificMonthDay':
        // tslint:disable-next-line:max-line-length
        const day = this.state.yearly.runOnWeekday ? `${this.state.yearly.specificMonthDay.day}W` : this.state.yearly.specificMonthDay.day;
        // tslint:disable-next-line:max-line-length
        this.cron = `${this.state.yearly.specificMonthDay.minutes} ${this.hourToCron(this.state.yearly.specificMonthDay.hours, this.state.yearly.specificMonthDay.hourType)} ${day} ${this.state.yearly.specificMonthDay.month} ?`;

        if (!this.options.removeSeconds) {
          this.cron = `${this.state.yearly.specificMonthDay.seconds} ${this.cron}`;
        }

        if (!this.options.removeYears) {
          this.cron = `${this.cron} *`;
        }
        break;
      case 'specificMonthWeek':
        // tslint:disable-next-line:max-line-length
        this.cron = `${this.state.yearly.specificMonthWeek.minutes} ${this.hourToCron(this.state.yearly.specificMonthWeek.hours, this.state.yearly.specificMonthWeek.hourType)} ? ${this.state.yearly.specificMonthWeek.month} ${this.state.yearly.specificMonthWeek.day}${this.state.yearly.specificMonthWeek.monthWeek}`;

        if (!this.options.removeSeconds) {
          this.cron = `${this.state.yearly.specificMonthWeek.seconds} ${this.cron}`;
        }

        if (!this.options.removeYears) {
          this.cron = `${this.cron} *`;
        }
        break;
      default:
        throw new Error('Invalid cron yearly subtab selection');
    }
  }

  private getAmPmHour(hour: number) {
    return this.options.use24HourTime ? hour : (hour + 11) % 12 + 1;
  }

  private getHourType(hour: number) {
    const hourType = (hour >= 12 ? 'PM' : 'AM');
    return this.options.use24HourTime ? undefined : hourType;
  }

  private hourToCron(hour: number, hourType: string) {
    if (this.options.use24HourTime) {
      return hour;
    } else {
      const amTime = (hour === 12 ? 0 : hour);
      const pmTime = (hour === 12 ? 12 : hour + 12);
      return hourType === 'AM' ? amTime : pmTime;
    }
  }

  private handleModelChange(cron: string) {
    if (this.isDirty) {
      this.isDirty = false;
      return;
    } else {
      this.isDirty = false;
    }

    this.validate(cron);

    let cronSeven = cron;
    if (this.options.removeSeconds) {
      cronSeven = `0 ${cron}`;
    }

    if (this.options.removeYears) {
      cronSeven = `${cronSeven} *`;
    }

    this.setValuesForState(cronSeven, cron);
  }

  setValuesForState(cronSeven, cron) {
    const [seconds, minutes, hours, dayOfMonth, month, dayOfWeek] = cronSeven.split(' ');

    if (cronSeven.match(/\d+ 0\/\d+ \* 1\/1 \* \? \*/)) {
      this.activeTab = 'minutes';

      this.state.minutes.minutes = Number(minutes.substring(2));
      this.state.minutes.seconds = Number(seconds);
    } else if (cronSeven.match(/\d+ \d+ 0\/\d+ 1\/1 \* \? \*/)) {
      this.activeTab = 'hourly';

      this.state.hourly.hours = Number(hours.substring(2));
      this.state.hourly.minutes = Number(minutes);
      this.state.hourly.seconds = Number(seconds);
    } else if (cronSeven.match(/\d+ \d+ \d+ 1\/\d+ \* \? \*/)) {
      this.activeTab = 'daily';

      this.state.daily.subTab = 'everyDays';
      this.state.daily.everyDays.days = Number(dayOfMonth.substring(2));
      const parsedHours = Number(hours);
      this.state.daily.everyDays.hours = this.getAmPmHour(parsedHours);
      this.state.daily.everyDays.hourType = this.getHourType(parsedHours);
      this.state.daily.everyDays.minutes = Number(minutes);
      this.state.daily.everyDays.seconds = Number(seconds);
    } else if (cronSeven.match(/\d+ \d+ \d+ \? \* MON-FRI \*/)) {
      this.activeTab = 'daily';

      this.state.daily.subTab = 'everyWeekDay';
      const parsedHours = Number(hours);
      this.state.daily.everyWeekDay.hours = this.getAmPmHour(parsedHours);
      this.state.daily.everyWeekDay.hourType = this.getHourType(parsedHours);
      this.state.daily.everyWeekDay.minutes = Number(minutes);
      this.state.daily.everyWeekDay.seconds = Number(seconds);
    } else if (cronSeven.match(/\d+ \d+ \d+ \? \* (MON|TUE|WED|THU|FRI|SAT|SUN)(,(MON|TUE|WED|THU|FRI|SAT|SUN))* \*/)) {
      this.activeTab = 'weekly';
      this.selectOptions.days.forEach(weekDay => this.state.weekly[weekDay] = false);
      dayOfWeek.split(',').forEach(weekDay => this.state.weekly[weekDay] = true);
      const parsedHours = Number(hours);
      this.state.weekly.hours = this.getAmPmHour(parsedHours);
      this.state.weekly.hourType = this.getHourType(parsedHours);
      this.state.weekly.minutes = Number(minutes);
      this.state.weekly.seconds = Number(seconds);
    } else if (cronSeven.match(/\d+ \d+ \d+ (\d+|L|LW|1W) 1\/\d+ \? \*/)) {
      this.setValuesForMonthlySpecificDays(seconds, minutes, hours, dayOfMonth, month);
    } else if (cronSeven.match(/\d+ \d+ \d+ \? \d+\/\d+ (MON|TUE|WED|THU|FRI|SAT|SUN)((#[1-5])|L) \*/)) {
      const day = dayOfWeek.substr(0, 3);
      const monthWeek = dayOfWeek.substr(3);
      this.activeTab = 'monthly';
      this.state.monthly.subTab = 'specificWeekDay';
      this.state.monthly.specificWeekDay.monthWeek = monthWeek;
      this.state.monthly.specificWeekDay.day = day;

      if (month.indexOf('/') !== -1) {
        const [startMonth, months] = month.split('/').map(Number);
        this.state.monthly.specificWeekDay.months = months;
        this.state.monthly.specificWeekDay.startMonth = startMonth;
      }

      const parsedHours = Number(hours);
      this.state.monthly.specificWeekDay.hours = this.getAmPmHour(parsedHours);
      this.state.monthly.specificWeekDay.hourType = this.getHourType(parsedHours);
      this.state.monthly.specificWeekDay.minutes = Number(minutes);
      this.state.monthly.specificWeekDay.seconds = Number(seconds);
    } else if (cronSeven.match(/\d+ \d+ \d+ (\d+|L|LW|1W) \d+ \? \*/)) {
      this.activeTab = 'yearly';
      this.state.yearly.subTab = 'specificMonthDay';
      this.state.yearly.specificMonthDay.month = Number(month);

      if (dayOfMonth.indexOf('W') !== -1) {
        this.state.yearly.specificMonthDay.day = dayOfMonth.charAt(0);
        this.state.yearly.runOnWeekday = true;
      } else {
        this.state.yearly.specificMonthDay.day = dayOfMonth;
      }

      const parsedHours = Number(hours);
      this.state.yearly.specificMonthDay.hours = this.getAmPmHour(parsedHours);
      this.state.yearly.specificMonthDay.hourType = this.getHourType(parsedHours);
      this.state.yearly.specificMonthDay.minutes = Number(minutes);
      this.state.yearly.specificMonthDay.seconds = Number(seconds);
    } else if (cronSeven.match(/\d+ \d+ \d+ \? \d+ (MON|TUE|WED|THU|FRI|SAT|SUN)((#[1-5])|L) \*/)) {
      const day = dayOfWeek.substr(0, 3);
      const monthWeek = dayOfWeek.substr(3);
      this.activeTab = 'yearly';
      this.state.yearly.subTab = 'specificMonthWeek';
      this.state.yearly.specificMonthWeek.monthWeek = monthWeek;
      this.state.yearly.specificMonthWeek.day = day;
      this.state.yearly.specificMonthWeek.month = Number(month);
      const parsedHours = Number(hours);
      this.state.yearly.specificMonthWeek.hours = this.getAmPmHour(parsedHours);
      this.state.yearly.specificMonthWeek.hourType = this.getHourType(parsedHours);
      this.state.yearly.specificMonthWeek.minutes = Number(minutes);
      this.state.yearly.specificMonthWeek.seconds = Number(seconds);
    } else {
      this.activeTab = 'advanced';
      this.state.advanced.expression = cron;
    }
  }

  private setValuesForMonthlySpecificDays(seconds, minutes, hours, dayOfMonth, month) {
    this.activeTab = 'monthly';
    this.state.monthly.subTab = 'specificDay';

    if (dayOfMonth.indexOf('W') !== -1) {
      this.state.monthly.specificDay.day = dayOfMonth.charAt(0);
      this.state.monthly.runOnWeekday = true;
    } else {
      this.state.monthly.specificDay.day = dayOfMonth;
    }

    this.state.monthly.specificDay.months = Number(month.substring(2));
    const parsedHours = Number(hours);
    this.state.monthly.specificDay.hours = this.getAmPmHour(parsedHours);
    this.state.monthly.specificDay.hourType = this.getHourType(parsedHours);
    this.state.monthly.specificDay.minutes = Number(minutes);
    this.state.monthly.specificDay.seconds = Number(seconds);
  }

  private validate(cron: string): void {
    this.state.validation.isValid = false;
    this.state.validation.errorMessage = '';

    if (!cron) {
      this.state.validation.errorMessage = 'Cron expression cannot be null';
      return;
    }

    const cronParts = cron.split(' ');

    let expected = 5;

    if (!this.options.removeSeconds) {
      expected++;
    }

    if (!this.options.removeYears) {
      expected++;
    }

    if (cronParts.length !== expected) {
      this.state.validation.errorMessage = `Invalid cron expression, there must be ${expected} segments`;
      return;
    }

    this.state.validation.isValid = true;
    // return;
  }

  private getDefaultAdvancedCronExpression(): string {
    if (this.options.removeSeconds && !this.options.removeYears) {
      return '15 10 L-2 * ? 2019';
    }

    if (!this.options.removeSeconds && this.options.removeYears) {
      return '0 15 10 L-2 * ?';
    }

    if (this.options.removeSeconds && this.options.removeYears) {
      return '15 10 L-2 * ?';
    }

    return '0 15 10 L-2 * ? 2019';
  }

  private getDefaultState() {
    const [defaultHours, defaultMinutes, defaultSeconds] = this.options.defaultTime.split(':').map(Number);

    return {
      datetime: this.getDefaultDateTime(),
      minutes: {
        minutes: 1,
        seconds: 0
      },
      hourly: {
        hours: 1,
        minutes: 0,
        seconds: 0
      },
      daily: {
        subTab: 'everyDays',
        everyDays: {
          days: 1,
          hours: this.getAmPmHour(defaultHours),
          minutes: defaultMinutes,
          seconds: defaultSeconds,
          hourType: this.getHourType(defaultHours)
        },
        everyWeekDay: {
          hours: this.getAmPmHour(defaultHours),
          minutes: defaultMinutes,
          seconds: defaultSeconds,
          hourType: this.getHourType(defaultHours)
        }
      },
      weekly: {
        MON: true,
        TUE: false,
        WED: false,
        THU: false,
        FRI: false,
        SAT: false,
        SUN: false,
        hours: this.getAmPmHour(defaultHours),
        minutes: defaultMinutes,
        seconds: defaultSeconds,
        hourType: this.getHourType(defaultHours)
      },
      monthly: {
        subTab: 'specificDay',
        runOnWeekday: false,
        specificDay: {
          day: '1',
          months: 1,
          hours: this.getAmPmHour(defaultHours),
          minutes: defaultMinutes,
          seconds: defaultSeconds,
          hourType: this.getHourType(defaultHours)
        },
        specificWeekDay: {
          monthWeek: '#1',
          day: 'MON',
          startMonth: 1,
          months: 1,
          hours: this.getAmPmHour(defaultHours),
          minutes: defaultMinutes,
          seconds: defaultSeconds,
          hourType: this.getHourType(defaultHours)
        }
      },
      yearly: {
        subTab: 'specificMonthDay',
        runOnWeekday: false,
        specificMonthDay: {
          month: 1,
          day: '1',
          hours: this.getAmPmHour(defaultHours),
          minutes: defaultMinutes,
          seconds: defaultSeconds,
          hourType: this.getHourType(defaultHours)
        },
        specificMonthWeek: {
          monthWeek: '#1',
          day: 'MON',
          month: 1,
          hours: this.getAmPmHour(defaultHours),
          minutes: defaultMinutes,
          seconds: defaultSeconds,
          hourType: this.getHourType(defaultHours)
        }
      },
      advanced: {
        expression: this.getDefaultAdvancedCronExpression()
      },
      validation: {
        isValid: true,
        errorMessage: ''
      }
    };
  }

  private getOrdinalSuffix(value: string) {
    if (value.length > 1) {
      const secondToLastDigit = value.charAt(value.length - 2);
      if (secondToLastDigit === '1') {
        return 'th';
      }
    }

    const lastDigit = value.charAt(value.length - 1);
    switch (lastDigit) {
      case '1':
        return 'st';
      case '2':
        return 'nd';
      case '3':
        return 'rd';
      default:
        return 'th';
    }
  }

  private getSelectOptions() {
    return {
      months: Utils.getRange(1, 12),
      monthWeeks: ['#1', '#2', '#3', '#4', '#5', 'L'],
      days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      minutes: Utils.getRange(0, 59),
      fullMinutes: Utils.getRange(0, 59),
      seconds: Utils.getRange(0, 59),
      hours: Utils.getRange(1, 23),
      monthDays: Utils.getRange(1, 31),
      monthDaysWithLasts: [...Utils.getRange(1, 31).map(String), 'L'],
      hourTypes: ['AM', 'PM']
    };
  }

  private getDefaultDateTime() {
    const currentDateTime = new Date();
    const date = currentDateTime.getDate();
    const month = currentDateTime.getMonth() + 1;
    const hour = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();
    const parsedMonth = (month <= 9) ? '0' + month : month.toString();
    const parsedDate = (date <= 9) ? '0' + date : date.toString();
    const parsedHour = (hour <= 9) ? '0' + hour : hour.toString();
    const parsedMinutes = (minutes <= 9) ? '0' + minutes : minutes.toString();

    return currentDateTime.getFullYear() + '-'
      + parsedMonth + '-'
      + parsedDate + 'T'
      + parsedHour + ':'
      + parsedMinutes;
  }

  onValidateQuartzExpression(expression) {
    const QUARTZ_REGEX = /^\s*($|#|\w+\s*=|(\?|\*|(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?(?:,(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?)*)\s+(\?|\*|(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?(?:,(?:[0-5]?\d)(?:(?:-|\/|\,)(?:[0-5]?\d))?)*)\s+(\?|\*|(?:[01]?\d|2[0-3])(?:(?:-|\/|\,)(?:[01]?\d|2[0-3]))?(?:,(?:[01]?\d|2[0-3])(?:(?:-|\/|\,)(?:[01]?\d|2[0-3]))?)*)\s+(\?|\*|(?:0?[1-9]|[12]\d|3[01])(?:(?:-|\/|\,)(?:0?[1-9]|[12]\d|3[01]))?(?:,(?:0?[1-9]|[12]\d|3[01])(?:(?:-|\/|\,)(?:0?[1-9]|[12]\d|3[01]))?)*)\s+(\?|\*|(?:[1-9]|1[012])(?:(?:-|\/|\,)(?:[1-9]|1[012]))?(?:L|W)?(?:,(?:[1-9]|1[012])(?:(?:-|\/|\,)(?:[1-9]|1[012]))?(?:L|W)?)*|\?|\*|(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?(?:,(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?)*)\s+(\?|\*|(?:[1-7]|MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-|\/|\,|#)(?:[1-5]))?(?:L)?(?:,(?:[1-7]|MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-|\/|\,|#)(?:[1-5]))?(?:L)?)*|\?|\*|(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?(?:,(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?)*)(|\s)+(\?|\*|(?:|\d{4})(?:(?:-|\/|\,)(?:|\d{4}))?(?:,(?:|\d{4})(?:(?:-|\/|\,)(?:|\d{4}))?)*))$/;

    if (!expression) {
      return false;
    } else {
      const formattedExpression = expression.toUpperCase();
      return !!formattedExpression.match(QUARTZ_REGEX);
    }
  }
}
