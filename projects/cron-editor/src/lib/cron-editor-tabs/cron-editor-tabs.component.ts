import { Component } from '@angular/core';

import { CronEditorComponent } from '../cron-editor.component';

@Component({
  selector: 'cron-editor-tabs',
  templateUrl: './cron-editor-tabs.component.html',
  styleUrls: ['../cron-editor.component.css']
})
export class CronEditorTabsComponent extends CronEditorComponent {
  activeTab: string;

  setActiveTab(tab: string) {
    if (!this.disabled) {
      this.activeTab = tab;
      this.regenerateCron();
    }
  }

  setValues(cron: string): void {
    if (!this.state) {
      this.state = this.getDefaultState();
    }

    let cronSeven = cron || '0 0/1 * ? * * *';
    if (this.options.removeSeconds) {
      cronSeven = `0 ${cronSeven}`;
    }

    if (this.options.removeYears) {
      cronSeven = `${cronSeven} *`;
    }

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
    } else if (cronSeven.match(/\d+ \d+ \d+ \? \d+\/\d+ (MON|TUE|WED|THU|FRI|SAT|SUN)((#[1-5])|L) \*/)) {
      const day = dayOfWeek.substr(0, 3);
      const monthWeek = dayOfWeek.substr(3);
      this.activeTab = 'monthly';
      this.state.monthly.subTab = 'specificWeekDay';
      this.state.monthly.specificWeekDay.monthWeek = monthWeek;
      this.state.monthly.specificWeekDay.day = day;

      if (month.indexOf('/') !== -1) {
        this.state.monthly.specificWeekDay.months = Number(month.substring(2));
        this.state.monthly.specificWeekDay.startMonth = Number(month.split('/')[0]);
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

  private hourToCron(hour: number, hourType: string) {
    if (this.options.use24HourTime) {
      return hour;
    } else {
      return hourType === 'AM' ? (hour === 12 ? 0 : hour) : (hour === 12 ? 12 : hour + 12);
    }
  }

  private getDefaultState() {
    const [defaultHours, defaultMinutes, defaultSeconds] = (this.options && this.options.defaultTime || '00:00:00').split(':').map(Number);

    return {
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
      }
    };
  }

  regenerateCron() {
    this.isDirty = true;

    switch (this.activeTab) {
      case 'minutes':
        this.cron = `0/${this.state.minutes.minutes} * 1/1 * ?`;

        if (!this.options.removeSeconds) {
          this.cron = `${this.state.minutes.seconds} ${this.cron}`;
        }

        if (!this.options.removeYears) {
          this.cron = `${this.cron} *`;
        }
        break;
      case 'hourly':
        this.cron = `${this.state.hourly.minutes} 0/${this.state.hourly.hours} 1/1 * ?`;

        if (!this.options.removeSeconds) {
          this.cron = `${this.state.hourly.seconds} ${this.cron}`;
        }

        if (!this.options.removeYears) {
          this.cron = `${this.cron} *`;
        }
        break;
      case 'daily':
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
        break;
      case 'weekly':
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
        break;
      case 'monthly':
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
        break;
      case 'yearly':
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
        break;
      case 'advanced':
        this.cron = this.state.advanced.expression;
        break;
      default:
        throw new Error('Invalid cron active tab selection');
    }
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
}
