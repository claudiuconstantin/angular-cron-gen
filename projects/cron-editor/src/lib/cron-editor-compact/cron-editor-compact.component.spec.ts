import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TimePickerComponent } from '../time-picker/time-picker.component';
import { CronFormat } from '../CronOptions';

import { CronEditorCompactComponent } from './cron-editor-compact.component';

describe('CronEditorCompactComponent', () => {
  let component: CronEditorCompactComponent;
  let fixture: ComponentFixture<CronEditorCompactComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CronEditorCompactComponent,
        TimePickerComponent
      ],
      imports: [
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CronEditorCompactComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    component.options.removeSeconds = false;
    component.options.removeYears = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('Should handle creation with cronExpressions', () => {
    beforeEach(() => {
      component.options = {
        removeSeconds: false,
        removeYears: false,
        format: CronFormat.Quartz
      };
    });

    it('10 0/5 * 1/1 * ? *', () => {
      component.cron = '10 0/5 * 1/1 * ? *';

      expect(component.every).toBe(5);
      expect(component.repeatType).toBe('minutes');
      expect(component.time.seconds).toBe(10);
    });

    it('*/5 * * * * *', () => {
      component.options.removeSeconds = true;
      component.cron = '*/5 * * * * *';

      expect(component.every).toBe(5);
      expect(component.repeatType).toBe('minutes');
    });

    it('*/5 * * * *', () => {
      component.options.removeSeconds = true;
      component.options.removeYears = true;
      component.cron = '*/5 * * * *';

      expect(component.every).toBe(5);
      expect(component.repeatType).toBe('minutes');
    });

    it('11 2 0/6 1/1 * ? *', () => {
      component.cron = '11 2 0/6 1/1 * ? *';

      expect(component.every).toBe(6);
      expect(component.repeatType).toBe('hours');
      expect(component.time.seconds).toBe(11);
      expect(component.time.minutes).toBe(2);
    });

    it('2 */6 * * * *', () => {
      component.options.removeSeconds = true;
      component.cron = '2 */6 * * * *';

      expect(component.every).toBe(6);
      expect(component.repeatType).toBe('hours');
      expect(component.time.minutes).toBe(2);
    });

    it('2 */6 * * *', () => {
      component.options.removeYears = true;
      component.options.removeSeconds = true;
      component.cron = '2 */6 * * *';

      expect(component.every).toBe(6);
      expect(component.repeatType).toBe('hours');
      expect(component.time.minutes).toBe(2);
    });

    it('12 3 2 1/4 * ? * (AM/PM)', () => {
      component.options.use24HourTime = false;
      component.cron = '12 3 2 1/4 * ? *';

      expect(component.every).toBe(4);
      expect(component.repeatType).toBe('days');
      expect(component.time.seconds).toBe(12);
      expect(component.time.minutes).toBe(3);
      expect(component.time.hours).toBe(2);
      expect(component.time.hourTypes).toBe('AM');
    });

    it('3 2 */4 * * * (AM/PM)', () => {
      component.options.removeSeconds = true;
      component.options.use24HourTime = false;
      component.cron = '3 2 */4 * * *';

      expect(component.every).toBe(4);
      expect(component.repeatType).toBe('days');
      expect(component.time.minutes).toBe(3);
      expect(component.time.hours).toBe(2);
      expect(component.time.hourTypes).toBe('AM');
    });

    it('3 2 */4 * * (AM/PM)', () => {
      component.options.removeSeconds = true;
      component.options.removeYears = true;
      component.options.use24HourTime = false;
      component.cron = '3 2 */4 * *';

      expect(component.every).toBe(4);
      expect(component.repeatType).toBe('days');
      expect(component.time.minutes).toBe(3);
      expect(component.time.hours).toBe(2);
      expect(component.time.hourTypes).toBe('AM');
    });

    it('12 3 14 1/4 * ? * (AM/PM)', () => {
      component.options.use24HourTime = false;
      component.cron = '12 3 14 1/4 * ? *';

      expect(component.every).toBe(4);
      expect(component.repeatType).toBe('days');
      expect(component.time.minutes).toBe(3);
      expect(component.time.hours).toBe(2);
      expect(component.time.hourTypes).toBe('PM');
    });

    it('3 14 */4 * * * (AM/PM)', () => {
      component.options.removeSeconds = true;
      component.options.use24HourTime = false;
      component.cron = '3 14 */4 * * *';

      expect(component.every).toBe(4);
      expect(component.repeatType).toBe('days');
      expect(component.time.minutes).toBe(3);
      expect(component.time.hours).toBe(2);
      expect(component.time.hourTypes).toBe('PM');
    });

    it('3 14 */4 * * (AM/PM)', () => {
      component.options.removeSeconds = true;
      component.options.removeYears = true;
      component.options.use24HourTime = false;
      component.cron = '3 14 */4 * *';

      expect(component.every).toBe(4);
      expect(component.repeatType).toBe('days');
      expect(component.time.minutes).toBe(3);
      expect(component.time.hours).toBe(2);
      expect(component.time.hourTypes).toBe('PM');
    });

    it('12 3 2 1/4 * ? * (24HRS)', () => {
      component.options.use24HourTime = true;
      component.cron = '12 3 2 1/4 * ? *';

      expect(component.every).toBe(4);
      expect(component.repeatType).toBe('days');
      expect(component.time.seconds).toBe(12);
      expect(component.time.minutes).toBe(3);
      expect(component.time.hours).toBe(2);
    });

    it('3 2 */4 * * * (24HRS)', () => {
      component.options.removeSeconds = true;
      component.options.use24HourTime = true;
      component.cron = '3 2 */4 * * *';

      expect(component.every).toBe(4);
      expect(component.repeatType).toBe('days');
      expect(component.time.minutes).toBe(3);
      expect(component.time.hours).toBe(2);
    });

    it('3 2 */4 * * (24HRS)', () => {
      component.options.removeSeconds = true;
      component.options.removeYears = true;
      component.options.use24HourTime = true;
      component.cron = '3 2 */4 * *';

      expect(component.every).toBe(4);
      expect(component.repeatType).toBe('days');
      expect(component.time.minutes).toBe(3);
      expect(component.time.hours).toBe(2);
    });

    it('13 4 3 ? * WED,THU *', () => {
      component.cron = '13 4 3 ? * WED,THU *';

      expect(component.every).toBe(1);
      expect(component.repeatType).toBe('weeks');
      expect(component.time.seconds).toBe(13);
      expect(component.time.minutes).toBe(4);
      expect(component.time.hours).toBe(3);
      expect(component.onDaysOfWeek.MON).toBeFalsy();
      expect(component.onDaysOfWeek.TUE).toBeFalsy();
      expect(component.onDaysOfWeek.WED).toBeTruthy();
      expect(component.onDaysOfWeek.THU).toBeTruthy();
      expect(component.onDaysOfWeek.FRI).toBeFalsy();
      expect(component.onDaysOfWeek.SAT).toBeFalsy();
      expect(component.onDaysOfWeek.SUN).toBeFalsy();
    });

    it('4 3 * * WED,THU *', () => {
      component.options.removeSeconds = true;
      component.cron = '4 3 * * WED,THU *';

      expect(component.every).toBe(1);
      expect(component.repeatType).toBe('weeks');
      expect(component.time.minutes).toBe(4);
      expect(component.time.hours).toBe(3);
      expect(component.onDaysOfWeek.MON).toBeFalsy();
      expect(component.onDaysOfWeek.TUE).toBeFalsy();
      expect(component.onDaysOfWeek.WED).toBeTruthy();
      expect(component.onDaysOfWeek.THU).toBeTruthy();
      expect(component.onDaysOfWeek.FRI).toBeFalsy();
      expect(component.onDaysOfWeek.SAT).toBeFalsy();
      expect(component.onDaysOfWeek.SUN).toBeFalsy();
    });

    it('14 5 4 3 0/2 ? *', () => {
      component.cron = '14 5 4 3 0/2 ? *';

      expect(component.every).toBe(2);
      expect(component.repeatType).toBe('months');
      expect(component.time.seconds).toBe(14);
      expect(component.time.minutes).toBe(5);
      expect(component.time.hours).toBe(4);
      expect(component.onDayOfMonth).toBe('3');
    });

    it('5 4 3 */2 * *', () => {
      component.options.removeSeconds = true;
      component.cron = '5 4 3 */2 * *';

      expect(component.every).toBe(2);
      expect(component.repeatType).toBe('months');
      expect(component.time.minutes).toBe(5);
      expect(component.time.hours).toBe(4);
      expect(component.onDayOfMonth).toBe('3');
    });

    it('5 4 3 */2 *', () => {
      component.options.removeSeconds = true;
      component.options.removeYears = true;
      component.cron = '5 4 3 */2 *';

      expect(component.every).toBe(2);
      expect(component.repeatType).toBe('months');
      expect(component.time.minutes).toBe(5);
      expect(component.time.hours).toBe(4);
      expect(component.onDayOfMonth).toBe('3');
    });

    it('14 5 4 LW 0/2 ? *', () => {
      component.cron = '14 5 4 LW 0/2 ? *';

      expect(component.every).toBe(2);
      expect(component.repeatType).toBe('months');
      expect(component.time.seconds).toBe(14);
      expect(component.time.minutes).toBe(5);
      expect(component.time.hours).toBe(4);
      expect(component.onDayOfMonth).toBe('LW');
    });

    it('5 4 LW */2 * *', () => {
      component.options.removeSeconds = true;
      component.cron = '5 4 LW */2 * *';

      expect(component.validation.isValid).toBeFalsy();
      expect(component.validation.errorMessage).toBeTruthy();
    });

    it('5 4 LW */2 *', () => {
      component.options.removeSeconds = true;
      component.options.removeYears = true;
      component.cron = '5 4 LW */2 *';

      expect(component.validation.isValid).toBeFalsy();
      expect(component.validation.errorMessage).toBeTruthy();
    });

    it('15 6 5 4 JAN,NOV ? 1/3', () => {
      component.cron = '15 6 5 4 JAN,NOV ? 1/3';

      expect(component.every).toBe(3);
      expect(component.repeatType).toBe('years');
      expect(component.time.seconds).toBe(15);
      expect(component.time.minutes).toBe(6);
      expect(component.time.hours).toBe(5);
      expect(component.onDayOfMonth).toBe('4');
      expect(component.onMonthsInYear.JAN).toBeTruthy();
      expect(component.onMonthsInYear.FEB).toBeFalsy();
      expect(component.onMonthsInYear.MAR).toBeFalsy();
      expect(component.onMonthsInYear.APR).toBeFalsy();
      expect(component.onMonthsInYear.MAY).toBeFalsy();
      expect(component.onMonthsInYear.JUN).toBeFalsy();
      expect(component.onMonthsInYear.JUL).toBeFalsy();
      expect(component.onMonthsInYear.AUG).toBeFalsy();
      expect(component.onMonthsInYear.SEP).toBeFalsy();
      expect(component.onMonthsInYear.OCT).toBeFalsy();
      expect(component.onMonthsInYear.NOV).toBeTruthy();
      expect(component.onMonthsInYear.DEC).toBeFalsy();
    });

    it('6 5 4 JAN,NOV * */3', () => {
      component.options.removeYears = false;
      component.options.removeSeconds = true;
      component.cron = '6 5 4 JAN,NOV * */3';

      expect(component.every).toBe(3);
      expect(component.repeatType).toBe('years');
      expect(component.time.minutes).toBe(6);
      expect(component.time.hours).toBe(5);
      expect(component.onDayOfMonth).toBe('4');
      expect(component.onMonthsInYear.JAN).toBeTruthy();
      expect(component.onMonthsInYear.FEB).toBeFalsy();
      expect(component.onMonthsInYear.MAR).toBeFalsy();
      expect(component.onMonthsInYear.APR).toBeFalsy();
      expect(component.onMonthsInYear.MAY).toBeFalsy();
      expect(component.onMonthsInYear.JUN).toBeFalsy();
      expect(component.onMonthsInYear.JUL).toBeFalsy();
      expect(component.onMonthsInYear.AUG).toBeFalsy();
      expect(component.onMonthsInYear.SEP).toBeFalsy();
      expect(component.onMonthsInYear.OCT).toBeFalsy();
      expect(component.onMonthsInYear.NOV).toBeTruthy();
      expect(component.onMonthsInYear.DEC).toBeFalsy();
    });
  });
  
  describe('Quartz', () => {
    beforeEach(() => {
      component.options = {
        removeSeconds: false,
        removeYears: false,
        format: CronFormat.Quartz
      };
    });
    describe('Should update cron', () => {
      it('10 0/5 0 1/1 * ? *', () => {
        component.every = 5;
        component.repeatType = 'minutes';
        component.time.seconds = 10;

        component.onEveryChange();

        expect(component.cron).toBe('10 0/5 * 1/1 * ? *');
      });

      it('11 2 0/6 1/1 * ? *', () => {
        component.every = 6;
        component.repeatType = 'hours';
        component.time.seconds = 11;
        component.time.minutes = 2;

        component.onEveryChange();

        expect(component.cron).toBe('11 2 0/6 1/1 * ? *');
      });

      it('12 3 2 1/4 * ? * (AM/PM)', () => {
        component.options.use24HourTime = false;
        component.every = 4;
        component.repeatType = 'days';
        component.time.seconds = 12;
        component.time.minutes = 3;
        component.time.hours = 2;
        component.time.hourTypes = 'AM';

        component.onEveryChange();

        expect(component.cron).toBe('12 3 2 1/4 * ? *');
      });

      it('12 3 14 1/4 * ? * (AM/PM)', () => {
        component.options.use24HourTime = false;
        component.every = 4;
        component.repeatType = 'days';
        component.time.seconds = 12;
        component.time.minutes = 3;
        component.time.hours = 2;
        component.time.hourTypes = 'PM';

        component.onEveryChange();

        expect(component.cron).toBe('12 3 14 1/4 * ? *');
      });

      it('12 3 2 1/4 * ? * (24HRS)', () => {
        component.options.use24HourTime = true;
        component.every = 4;
        component.repeatType = 'days';
        component.time.seconds = 12;
        component.time.minutes = 3;
        component.time.hours = 2;

        component.onEveryChange();

        expect(component.cron).toBe('12 3 2 1/4 * ? *');
      });

      it('13 4 3 ? * WED,THU *', () => {
        component.repeatType = 'weeks';
        component.time.seconds = 13;
        component.time.minutes = 4;
        component.time.hours = 3;

        component.onDaysOfWeek.MON = false;
        component.onDaysOfWeek.TUE = false;
        component.onDaysOfWeek.WED = true;
        component.onDaysOfWeek.THU = true;
        component.onDaysOfWeek.FRI = false;
        component.onDaysOfWeek.SAT = false;
        component.onDaysOfWeek.SUN = false;

        component.onEveryChange();

        expect(component.cron).toBe('13 4 3 ? * WED,THU *');
      });

      it('14 5 4 3 1/2 ? *', () => {
        component.every = 2;
        component.repeatType = 'months';
        component.time.seconds = 14;
        component.time.minutes = 5;
        component.time.hours = 4;
        component.onDayOfMonth = '3';

        component.onEveryChange();

        expect(component.cron).toBe('14 5 4 3 1/2 ? *');
      });

      it('14 5 4 LW 1/2 ? *', () => {
        component.every = 2;
        component.repeatType = 'months';
        component.time.seconds = 14;
        component.time.minutes = 5;
        component.time.hours = 4;
        component.onDayOfMonth = 'LW';

        component.onEveryChange();

        expect(component.cron).toBe('14 5 4 LW 1/2 ? *');
      });

      it('15 6 5 4 JAN,NOV ? 0/3', () => {
        component.every = 3;
        component.repeatType = 'years';
        component.time.seconds = 15;
        component.time.minutes = 6;
        component.time.hours = 5;
        component.onDayOfMonth = '4';
        component.onMonthsInYear.JAN = true;
        component.onMonthsInYear.FEB = false;
        component.onMonthsInYear.MAR = false;
        component.onMonthsInYear.APR = false;
        component.onMonthsInYear.MAY = false;
        component.onMonthsInYear.JUN = false;
        component.onMonthsInYear.JUL = false;
        component.onMonthsInYear.AUG = false;
        component.onMonthsInYear.SEP = false;
        component.onMonthsInYear.OCT = false;
        component.onMonthsInYear.NOV = true;
        component.onMonthsInYear.DEC = false;

        component.onEveryChange();

        expect(component.cron).toBe('15 6 5 4 JAN,NOV ? 1/3');
      });

      it('Should hide seconds and years', () => {
        component.options.removeSeconds = true;
        component.options.removeYears = true;

        component.every = 5;
        component.repeatType = 'minutes';
        component.time.seconds = 10;

        component.onEveryChange();

        expect(component.cron).toBe('0/5 * 1/1 * ?');
      });
    });
  });
  
  describe('NCronTab', () => {
    beforeEach(() => {
      component.options = {
        removeSeconds: true,
        removeYears: true,
        format: CronFormat.NCronTab
      };
    });

    describe('Should update cron', () => {
      it('*/5 * * * *', () => {
        component.every = 5;
        component.repeatType = 'minutes';

        component.onEveryChange();

        expect(component.cron).toBe('*/5 * * * *');
      });

      it('2 */6 * * *', () => {
        component.every = 6;
        component.repeatType = 'hours';
        component.time.minutes = 2;

        component.onEveryChange();

        expect(component.cron).toBe('2 */6 * * *');
      });

      it('3 2 */4 * * (AM/PM)', () => {
        component.options.use24HourTime = false;
        component.every = 4;
        component.repeatType = 'days';
        component.time.minutes = 3;
        component.time.hours = 2;
        component.time.hourTypes = 'AM';

        component.onEveryChange();

        expect(component.cron).toBe('3 2 */4 * *');
      });

      it('3 14 */4 * * (AM/PM)', () => {
        component.options.use24HourTime = false;
        component.every = 4;
        component.repeatType = 'days';
        component.time.minutes = 3;
        component.time.hours = 2;
        component.time.hourTypes = 'PM';

        component.onEveryChange();

        expect(component.cron).toBe('3 14 */4 * *');
      });

      it('3 2 */4 * * (24HRS)', () => {
        component.options.use24HourTime = true;
        component.every = 4;
        component.repeatType = 'days';
        component.time.minutes = 3;
        component.time.hours = 2;

        component.onEveryChange();

        expect(component.cron).toBe('3 2 */4 * *');
      });

      it('4 3 * * WED,THU', () => {
        component.repeatType = 'weeks';
        component.time.minutes = 4;
        component.time.hours = 3;

        component.onDaysOfWeek.MON = false;
        component.onDaysOfWeek.TUE = false;
        component.onDaysOfWeek.WED = true;
        component.onDaysOfWeek.THU = true;
        component.onDaysOfWeek.FRI = false;
        component.onDaysOfWeek.SAT = false;
        component.onDaysOfWeek.SUN = false;

        component.onEveryChange();

        expect(component.cron).toBe('4 3 * * WED,THU');
      });

      it('5 4 3 */2 *', () => {
        component.every = 2;
        component.repeatType = 'months';
        component.time.minutes = 5;
        component.time.hours = 4;
        component.onDayOfMonth = '3';

        component.onEveryChange();

        expect(component.cron).toBe('5 4 3 */2 *');
      });

      it('6 5 4 JAN,NOV * */3', () => {
        component.options.removeYears = false;

        component.every = 3;
        component.repeatType = 'years';
        component.time.minutes = 6;
        component.time.hours = 5;
        component.onDayOfMonth = '4';
        component.onMonthsInYear.JAN = true;
        component.onMonthsInYear.FEB = false;
        component.onMonthsInYear.MAR = false;
        component.onMonthsInYear.APR = false;
        component.onMonthsInYear.MAY = false;
        component.onMonthsInYear.JUN = false;
        component.onMonthsInYear.JUL = false;
        component.onMonthsInYear.AUG = false;
        component.onMonthsInYear.SEP = false;
        component.onMonthsInYear.OCT = false;
        component.onMonthsInYear.NOV = true;
        component.onMonthsInYear.DEC = false;

        component.onEveryChange();

        expect(component.cron).toBe('6 5 4 JAN,NOV * */3');
      });

      it('Should display years', () => {
        component.options = {
          removeSeconds: true,
          removeYears: false,
          format: CronFormat.NCronTab
        };

        component.every = 5;
        component.repeatType = 'minutes';
        component.time.seconds = 10;

        component.onEveryChange();

        expect(component.cron).toBe('*/5 * * * * *');
      });
    });
  });
});
