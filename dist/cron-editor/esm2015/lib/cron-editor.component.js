/**
 * @fileoverview added by tsickle
 * Generated from: lib/cron-editor.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Days, MonthWeeks, Months } from './enums';
import Utils from './Utils';
export class CronEditorComponent {
    constructor() {
        // the name is an Angular convention, @Input variable name + "Change" suffix
        this.cronChange = new EventEmitter();
        this.selectOptions = this.getSelectOptions();
    }
    /**
     * @return {?}
     */
    get cron() { return this.localCron; }
    /**
     * @param {?} value
     * @return {?}
     */
    set cron(value) {
        this.localCron = value;
        this.cronChange.emit(this.localCron);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.options.removeSeconds) {
            this.options.hideSeconds = true;
        }
        this.state = this.getDefaultState();
        this.handleModelChange(this.cron);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const newCron = changes['cron'];
        if (newCron && !newCron.firstChange) {
            this.handleModelChange(this.cron);
        }
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    setActiveTab(tab) {
        if (!this.disabled) {
            this.activeTab = tab;
            this.regenerateCron();
        }
    }
    /**
     * @param {?} day
     * @return {?}
     */
    dayDisplay(day) {
        return Days[day];
    }
    /**
     * @param {?} monthWeekNumber
     * @return {?}
     */
    monthWeekDisplay(monthWeekNumber) {
        return MonthWeeks[monthWeekNumber];
    }
    /**
     * @param {?} month
     * @return {?}
     */
    monthDisplay(month) {
        return Months[month];
    }
    /**
     * @param {?} month
     * @return {?}
     */
    monthDayDisplay(month) {
        if (month === 'L') {
            return 'Last Day';
        }
        else if (month === 'LW') {
            return 'Last Weekday';
        }
        else if (month === '1W') {
            return 'First Weekday';
        }
        else {
            return `${month}${this.getOrdinalSuffix(month)} day`;
        }
    }
    /**
     * @return {?}
     */
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
                /** @type {?} */
                const days = this.selectOptions.days
                    .reduce((/**
                 * @param {?} acc
                 * @param {?} day
                 * @return {?}
                 */
                (acc, day) => this.state.weekly[day] ? acc.concat([day]) : acc), [])
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
                        /** @type {?} */
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
                        /** @type {?} */
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
    /**
     * @private
     * @param {?} hour
     * @return {?}
     */
    getAmPmHour(hour) {
        return this.options.use24HourTime ? hour : (hour + 11) % 12 + 1;
    }
    /**
     * @private
     * @param {?} hour
     * @return {?}
     */
    getHourType(hour) {
        return this.options.use24HourTime ? undefined : (hour >= 12 ? 'PM' : 'AM');
    }
    /**
     * @private
     * @param {?} hour
     * @param {?} hourType
     * @return {?}
     */
    hourToCron(hour, hourType) {
        if (this.options.use24HourTime) {
            return hour;
        }
        else {
            return hourType === 'AM' ? (hour === 12 ? 0 : hour) : (hour === 12 ? 12 : hour + 12);
        }
    }
    /**
     * @private
     * @param {?} cron
     * @return {?}
     */
    handleModelChange(cron) {
        if (this.isDirty) {
            this.isDirty = false;
            return;
        }
        else {
            this.isDirty = false;
        }
        this.validate(cron);
        /** @type {?} */
        let cronSeven = cron;
        if (this.options.removeSeconds) {
            cronSeven = `0 ${cron}`;
        }
        if (this.options.removeYears) {
            cronSeven = `${cronSeven} *`;
        }
        const [seconds, minutes, hours, dayOfMonth, month, dayOfWeek] = cronSeven.split(' ');
        if (cronSeven.match(/\d+ 0\/\d+ \* 1\/1 \* \? \*/)) {
            this.activeTab = 'minutes';
            this.state.minutes.minutes = Number(minutes.substring(2));
            this.state.minutes.seconds = Number(seconds);
        }
        else if (cronSeven.match(/\d+ \d+ 0\/\d+ 1\/1 \* \? \*/)) {
            this.activeTab = 'hourly';
            this.state.hourly.hours = Number(hours.substring(2));
            this.state.hourly.minutes = Number(minutes);
            this.state.hourly.seconds = Number(seconds);
        }
        else if (cronSeven.match(/\d+ \d+ \d+ 1\/\d+ \* \? \*/)) {
            this.activeTab = 'daily';
            this.state.daily.subTab = 'everyDays';
            this.state.daily.everyDays.days = Number(dayOfMonth.substring(2));
            /** @type {?} */
            const parsedHours = Number(hours);
            this.state.daily.everyDays.hours = this.getAmPmHour(parsedHours);
            this.state.daily.everyDays.hourType = this.getHourType(parsedHours);
            this.state.daily.everyDays.minutes = Number(minutes);
            this.state.daily.everyDays.seconds = Number(seconds);
        }
        else if (cronSeven.match(/\d+ \d+ \d+ \? \* MON-FRI \*/)) {
            this.activeTab = 'daily';
            this.state.daily.subTab = 'everyWeekDay';
            /** @type {?} */
            const parsedHours = Number(hours);
            this.state.daily.everyWeekDay.hours = this.getAmPmHour(parsedHours);
            this.state.daily.everyWeekDay.hourType = this.getHourType(parsedHours);
            this.state.daily.everyWeekDay.minutes = Number(minutes);
            this.state.daily.everyWeekDay.seconds = Number(seconds);
        }
        else if (cronSeven.match(/\d+ \d+ \d+ \? \* (MON|TUE|WED|THU|FRI|SAT|SUN)(,(MON|TUE|WED|THU|FRI|SAT|SUN))* \*/)) {
            this.activeTab = 'weekly';
            this.selectOptions.days.forEach((/**
             * @param {?} weekDay
             * @return {?}
             */
            weekDay => this.state.weekly[weekDay] = false));
            dayOfWeek.split(',').forEach((/**
             * @param {?} weekDay
             * @return {?}
             */
            weekDay => this.state.weekly[weekDay] = true));
            /** @type {?} */
            const parsedHours = Number(hours);
            this.state.weekly.hours = this.getAmPmHour(parsedHours);
            this.state.weekly.hourType = this.getHourType(parsedHours);
            this.state.weekly.minutes = Number(minutes);
            this.state.weekly.seconds = Number(seconds);
        }
        else if (cronSeven.match(/\d+ \d+ \d+ (\d+|L|LW|1W) 1\/\d+ \? \*/)) {
            this.activeTab = 'monthly';
            this.state.monthly.subTab = 'specificDay';
            if (dayOfMonth.indexOf('W') !== -1) {
                this.state.monthly.specificDay.day = dayOfMonth.charAt(0);
                this.state.monthly.runOnWeekday = true;
            }
            else {
                this.state.monthly.specificDay.day = dayOfMonth;
            }
            this.state.monthly.specificDay.months = Number(month.substring(2));
            /** @type {?} */
            const parsedHours = Number(hours);
            this.state.monthly.specificDay.hours = this.getAmPmHour(parsedHours);
            this.state.monthly.specificDay.hourType = this.getHourType(parsedHours);
            this.state.monthly.specificDay.minutes = Number(minutes);
            this.state.monthly.specificDay.seconds = Number(seconds);
        }
        else if (cronSeven.match(/\d+ \d+ \d+ \? \d+\/\d+ (MON|TUE|WED|THU|FRI|SAT|SUN)((#[1-5])|L) \*/)) {
            /** @type {?} */
            const day = dayOfWeek.substr(0, 3);
            /** @type {?} */
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
            /** @type {?} */
            const parsedHours = Number(hours);
            this.state.monthly.specificWeekDay.hours = this.getAmPmHour(parsedHours);
            this.state.monthly.specificWeekDay.hourType = this.getHourType(parsedHours);
            this.state.monthly.specificWeekDay.minutes = Number(minutes);
            this.state.monthly.specificWeekDay.seconds = Number(seconds);
        }
        else if (cronSeven.match(/\d+ \d+ \d+ (\d+|L|LW|1W) \d+ \? \*/)) {
            this.activeTab = 'yearly';
            this.state.yearly.subTab = 'specificMonthDay';
            this.state.yearly.specificMonthDay.month = Number(month);
            if (dayOfMonth.indexOf('W') !== -1) {
                this.state.yearly.specificMonthDay.day = dayOfMonth.charAt(0);
                this.state.yearly.runOnWeekday = true;
            }
            else {
                this.state.yearly.specificMonthDay.day = dayOfMonth;
            }
            /** @type {?} */
            const parsedHours = Number(hours);
            this.state.yearly.specificMonthDay.hours = this.getAmPmHour(parsedHours);
            this.state.yearly.specificMonthDay.hourType = this.getHourType(parsedHours);
            this.state.yearly.specificMonthDay.minutes = Number(minutes);
            this.state.yearly.specificMonthDay.seconds = Number(seconds);
        }
        else if (cronSeven.match(/\d+ \d+ \d+ \? \d+ (MON|TUE|WED|THU|FRI|SAT|SUN)((#[1-5])|L) \*/)) {
            /** @type {?} */
            const day = dayOfWeek.substr(0, 3);
            /** @type {?} */
            const monthWeek = dayOfWeek.substr(3);
            this.activeTab = 'yearly';
            this.state.yearly.subTab = 'specificMonthWeek';
            this.state.yearly.specificMonthWeek.monthWeek = monthWeek;
            this.state.yearly.specificMonthWeek.day = day;
            this.state.yearly.specificMonthWeek.month = Number(month);
            /** @type {?} */
            const parsedHours = Number(hours);
            this.state.yearly.specificMonthWeek.hours = this.getAmPmHour(parsedHours);
            this.state.yearly.specificMonthWeek.hourType = this.getHourType(parsedHours);
            this.state.yearly.specificMonthWeek.minutes = Number(minutes);
            this.state.yearly.specificMonthWeek.seconds = Number(seconds);
        }
        else {
            this.activeTab = 'advanced';
            this.state.advanced.expression = cron;
        }
    }
    /**
     * @private
     * @param {?} cron
     * @return {?}
     */
    validate(cron) {
        this.state.validation.isValid = false;
        this.state.validation.errorMessage = '';
        if (!cron) {
            this.state.validation.errorMessage = 'Cron expression cannot be null';
            return;
        }
        /** @type {?} */
        const cronParts = cron.split(' ');
        /** @type {?} */
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
        return;
    }
    /**
     * @private
     * @return {?}
     */
    getDefaultAdvancedCronExpression() {
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
    /**
     * @private
     * @return {?}
     */
    getDefaultState() {
        const [defaultHours, defaultMinutes, defaultSeconds] = this.options.defaultTime.split(':').map(Number);
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
            },
            validation: {
                isValid: true,
                errorMessage: ''
            }
        };
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    getOrdinalSuffix(value) {
        if (value.length > 1) {
            /** @type {?} */
            const secondToLastDigit = value.charAt(value.length - 2);
            if (secondToLastDigit === '1') {
                return 'th';
            }
        }
        /** @type {?} */
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
    /**
     * @private
     * @return {?}
     */
    getSelectOptions() {
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
}
CronEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'cron-editor',
                template: "<!-- Tabs -->\n<ul class=\"nav nav-tabs tab-nav\" role=\"tablist\">\n    <li [ngClass]=\"{'active': activeTab === 'minutes'}\" *ngIf=\"!options.hideMinutesTab\">\n        <a aria-controls=\"minutes\" role=\"tab\" data-toggle=\"tab\" (click)=\"setActiveTab('minutes')\">\n            Minute\n        </a>\n    </li>\n\n    <li role=\"presentation\" *ngIf=\"!options.hideHourlyTab\" [ngClass]=\"{'active': activeTab === 'hourly'}\">\n        <a aria-controls=\"hourly\" role=\"tab\" data-toggle=\"tab\" (click)=\"setActiveTab('hourly')\">\n            Hour\n        </a>\n    </li>\n\n    <li role=\"presentation\" *ngIf=\"!options.hideDailyTab\" [ngClass]=\"{'active': activeTab === 'daily'}\">\n        <a aria-controls=\"daily\" role=\"tab\" data-toggle=\"tab\" (click)=\"setActiveTab('daily')\">\n            Day\n        </a>\n    </li>\n\n    <li role=\"presentation\" *ngIf=\"!options.hideWeeklyTab\" [ngClass]=\"{'active': activeTab === 'weekly'}\">\n        <a aria-controls=\"weekly\" role=\"tab\" data-toggle=\"tab\" (click)=\"setActiveTab('weekly')\">\n            Week\n        </a>\n    </li>\n\n    <li role=\"presentation\" *ngIf=\"!options.hideMonthlyTab\" [ngClass]=\"{'active': activeTab === 'monthly'}\">\n        <a aria-controls=\"monthly\" role=\"tab\" data-toggle=\"tab\" (click)=\"setActiveTab('monthly')\">\n            Month\n        </a>\n    </li>\n\n    <li role=\"presentation\" *ngIf=\"!options.hideYearlyTab\" [ngClass]=\"{'active': activeTab === 'yearly'}\">\n        <a aria-controls=\"yearly\" role=\"tab\" data-toggle=\"tab\" (click)=\"setActiveTab('yearly')\">\n            Year\n        </a>\n    </li>\n\n    <li role=\"presentation\" *ngIf=\"!options.hideAdvancedTab\" [ngClass]=\"{'active': activeTab === 'advanced'}\">\n        <a aria-controls=\"advanced\" role=\"tab\" data-toggle=\"tab\" (click)=\"setActiveTab('advanced')\">\n            Cron Expression\n        </a>\n    </li>\n</ul>\n\n<!-- Tab content -->\n<div class=\"cron-editor-container\">\n    <div class=\"row\">\n        <div class=\"col-xs-12\">\n            <div class=\"tab-content\">\n                <!-- Minutes-->\n                <div class=\"tab-pane\" *ngIf=\"!options.hideMinutesTab\" [ngClass]=\"{'active': activeTab === 'minutes'}\">\n                    <div class=\"well well-small\">\n                        Every\n                        <select class=\"minutes\" [disabled]=\"disabled || activeTab !== 'minutes'\" (change)=\"regenerateCron()\"\n                            [(ngModel)]=\"state.minutes.minutes\" [ngClass]=\"options.formSelectClass\">\n                            <option *ngFor=\"let minute of selectOptions.minutes\" [ngValue]=\"minute\">\n                                {{minute}}\n                            </option>\n                        </select> minute(s)\n                        <span *ngIf=\"!options.hideSeconds\">on second</span>\n                        <select class=\"seconds\" *ngIf=\"!options.hideSeconds\" [disabled]=\"disabled || activeTab !== 'minutes'\"\n                            (change)=\"regenerateCron()\" [(ngModel)]=\"state.minutes.seconds\" [ngClass]=\"options.formSelectClass\">\n                            <option *ngFor=\"let second of selectOptions.seconds\" [ngValue]=\"second\">\n                                {{second}}\n                            </option>\n                        </select>\n                    </div>\n                </div>\n\n                <!-- Hourly-->\n                <div class=\"tab-pane\" *ngIf=\"!options.hideHourlyTab\" [ngClass]=\"{'active': activeTab === 'hourly'}\">\n                    <div class=\"well well-small\">\n                        Every\n                        <select class=\"hours\" [disabled]=\"disabled || activeTab !== 'hourly'\" (change)=\"regenerateCron()\"\n                            [(ngModel)]=\"state.hourly.hours\" [ngClass]=\"options.formSelectClass\">\n                            <option *ngFor=\"let hour of selectOptions.hours\" [ngValue]=\"hour\">\n                                {{hour}}\n                            </option>\n                        </select> hour(s) on minute\n                        <select class=\"minutes\" [disabled]=\"disabled || activeTab !== 'hourly'\" (change)=\"regenerateCron()\"\n                            [(ngModel)]=\"state.hourly.minutes\" [ngClass]=\"options.formSelectClass\">\n                            <option *ngFor=\"let minute of selectOptions.fullMinutes\" [ngValue]=\"minute\">\n                                {{minute}}\n                            </option>\n                        </select>\n                        <span *ngIf=\"!options.hideSeconds\">and second</span>\n                        <select class=\"seconds\" *ngIf=\"!options.hideSeconds\" [disabled]=\"disabled || activeTab !== 'hourly'\"\n                            (change)=\"regenerateCron()\" [(ngModel)]=\"state.hourly.seconds\" [ngClass]=\"options.formSelectClass\">\n                            <option *ngFor=\"let second of selectOptions.seconds\" [ngValue]=\"second\">\n                                {{second}}\n                            </option>\n                        </select>\n                    </div>\n                </div>\n\n                <!-- Daily-->\n                <div class=\"tab-pane\" *ngIf=\"!options.hideDailyTab\" [ngClass]=\"{'active': activeTab === 'daily'}\">\n                    <div class=\"well well-small\">\n                        <input type=\"radio\" name=\"daily-radio\" value=\"everyDays\" [disabled]=\"disabled\" (change)=\"regenerateCron()\"\n                            [(ngModel)]=\"state.daily.subTab\" value=\"everyDays\" [disabled]=\"disabled\" (change)=\"regenerateCron()\"\n                            [(ngModel)]=\"state.daily.subTab\" [ngClass]=\"state.formRadioClass\" checked=\"checked\">\n                        Every\n                        <select class=\"days\" [disabled]=\"disabled || activeTab !== 'daily' || state.daily.subTab !== 'everyDays'\"\n                            (change)=\"regenerateCron()\" [(ngModel)]=\"state.daily.everyDays.days\" [ngClass]=\"options.formSelectClass\">\n                            <option *ngFor=\"let monthDay of selectOptions.monthDays\" [ngValue]=\"monthDay\">\n                                {{monthDay}}\n                            </option>\n                        </select> day(s) at\n\n                        <cron-time-picker2 [disabled]=\"disabled || activeTab !== 'daily' || state.daily.subTab !== 'everyDays'\"\n                            (change)=\"regenerateCron()\" [(time)]=\"state.daily.everyDays\" [selectClass]=\"options.formSelectClass\"\n                            [use24HourTime]=\"options.use24HourTime\" [hideSeconds]=\"options.hideSeconds\">\n                        </cron-time-picker2>\n                    </div>\n\n                    <div class=\"well well-small\">\n                        <input type=\"radio\" name=\"daily-radio\" value=\"everyWeekDay\" [disabled]=\"disabled\" (change)=\"regenerateCron()\"\n                            [(ngModel)]=\"state.daily.subTab\" [ngClass]=\"state.formRadioClass\"> Every working day at\n                        <cron-time-picker2 [disabled]=\"disabled || activeTab !== 'daily' || state.daily.subTab !== 'everyWeekDay'\"\n                            (change)=\"regenerateCron()\" [(time)]=\"state.daily.everyWeekDay\" [selectClass]=\"options.formSelectClass\"\n                            [use24HourTime]=\"options.use24HourTime\" [hideSeconds]=\"options.hideSeconds\">\n                        </cron-time-picker2>\n                    </div>\n                </div>\n\n                <!-- Weekly-->\n                <div class=\"tab-pane\" *ngIf=\"!options.hideWeeklyTab\" [ngClass]=\"{'active': activeTab === 'weekly'}\">\n                    <div class=\"well well-small\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-6\">\n                                <label class=\"advanced-cron-editor-label\"><input type=\"checkbox\" [disabled]=\"disabled || activeTab !== 'weekly'\" (change)=\"regenerateCron()\"\n                                    [(ngModel)]=\"state.weekly.MON\" [ngClass]=\"options.formCheckboxClass\"> Monday</label>\n                            </div>\n                            <div class=\"col-sm-6\">\n                                <label class=\"advanced-cron-editor-label\"><input type=\"checkbox\" [disabled]=\"disabled || activeTab !== 'weekly'\" (change)=\"regenerateCron()\"\n                                    [(ngModel)]=\"state.weekly.TUE\" [ngClass]=\"options.formCheckboxClass\"> Tuesday</label>\n                            </div>\n                            <div class=\"col-sm-6\">\n                                <label class=\"advanced-cron-editor-label\"><input type=\"checkbox\" [disabled]=\"disabled || activeTab !== 'weekly'\" (change)=\"regenerateCron()\"\n                                    [(ngModel)]=\"state.weekly.WED\" [ngClass]=\"options.formCheckboxClass\"> Wednesday</label>\n                            </div>\n                            <div class=\"col-sm-6\">\n                                <label class=\"advanced-cron-editor-label\"><input type=\"checkbox\" [disabled]=\"disabled || activeTab !== 'weekly'\" (change)=\"regenerateCron()\"\n                                    [(ngModel)]=\"state.weekly.THU\" [ngClass]=\"options.formCheckboxClass\"> Thursday</label>\n                            </div>\n                            <div class=\"col-sm-6\">\n                                <label class=\"advanced-cron-editor-label\"><input type=\"checkbox\" [disabled]=\"disabled || activeTab !== 'weekly'\" (change)=\"regenerateCron()\"\n                                    [(ngModel)]=\"state.weekly.FRI\" [ngClass]=\"options.formCheckboxClass\"> Friday</label>\n                            </div>\n                            <div class=\"col-sm-6\">\n                                <label class=\"advanced-cron-editor-label\"><input type=\"checkbox\" [disabled]=\"disabled || activeTab !== 'weekly'\" (change)=\"regenerateCron()\"\n                                    [(ngModel)]=\"state.weekly.SAT\" [ngClass]=\"options.formCheckboxClass\"> Saturday</label>\n                            </div>\n                            <div class=\"col-sm-6\">\n                                <label class=\"advanced-cron-editor-label\"><input type=\"checkbox\" [disabled]=\"disabled || activeTab !== 'weekly'\" (change)=\"regenerateCron()\"\n                                    [(ngModel)]=\"state.weekly.SUN\" [ngClass]=\"options.formCheckboxClass\"> Sunday</label>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-sm-6\">\n                                at\n                                <cron-time-picker2 [disabled]=\"disabled || activeTab !== 'weekly'\" (change)=\"regenerateCron()\"\n                                    [(time)]=\"state.weekly\" [selectClass]=\"options.formSelectClass\" [use24HourTime]=\"options.use24HourTime\"\n                                    [hideSeconds]=\"options.hideSeconds\">\n                                </cron-time-picker2>\n                            </div>\n                        </div>\n                    </div>\n\n                </div>\n\n                <!-- Monthly-->\n                <div class=\"tab-pane\" *ngIf=\"!options.hideMonthlyTab\" [ngClass]=\"{'active': activeTab === 'monthly'}\">\n                    <div class=\"well well-small\">\n                        <input type=\"radio\" name=\"monthly-radio\" value=\"specificDay\" [disabled]=\"disabled\" (change)=\"regenerateCron()\"\n                            [(ngModel)]=\"state.monthly.subTab\" [ngClass]=\"state.formRadioClass\"> On the\n                        <select class=\"month-days\" [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificDay'\"\n                            (change)=\"regenerateCron()\" [(ngModel)]=\"state.monthly.specificDay.day\" [ngClass]=\"options.formSelectClass\">\n                            <option *ngFor=\"let monthDaysWithLast of selectOptions.monthDaysWithLasts\" [ngValue]=\"monthDaysWithLast\">\n                                {{monthDayDisplay(monthDaysWithLast)}}\n                            </option>\n                        </select> of every\n                        <select class=\"months-small\" [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificDay'\"\n                            (change)=\"regenerateCron()\" [(ngModel)]=\"state.monthly.specificDay.months\" [ngClass]=\"options.formSelectClass\">\n                            <option *ngFor=\"let month of selectOptions.months\" [ngValue]=\"month\">\n                                {{month}}\n                            </option>\n                        </select> month(s) at\n                        <cron-time-picker2 [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificDay'\"\n                            (change)=\"regenerateCron()\" [(time)]=\"state.monthly.specificDay\" [selectClass]=\"options.formSelectClass\"\n                            [use24HourTime]=\"options.use24HourTime\" [hideSeconds]=\"options.hideSeconds\">\n                        </cron-time-picker2>&nbsp;\n                        <label class=\"advanced-cron-editor-label\"><input type=\"checkbox\" [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificDay'\"\n                            (change)=\"regenerateCron()\" [(ngModel)]=\"state.monthly.runOnWeekday\" [ngClass]=\"options.formCheckboxClass\"> during the nearest weekday</label>\n                    </div>\n                    <div class=\"well well-small\">\n                        <input type=\"radio\" name=\"monthly-radio\" value=\"specificWeekDay\" [disabled]=\"disabled\" (change)=\"regenerateCron()\"\n                            [(ngModel)]=\"state.monthly.subTab\" [ngClass]=\"state.formRadioClass\">\n                        On the\n                        <select class=\"day-order-in-month\" [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificWeekDay'\"\n                            (change)=\"regenerateCron()\" [(ngModel)]=\"state.monthly.specificWeekDay.monthWeek\" [ngClass]=\"options.formSelectClass\">\n                            <option *ngFor=\"let monthWeek of selectOptions.monthWeeks\" [ngValue]=\"monthWeek\">\n                                {{monthWeekDisplay(monthWeek)}}\n                            </option>\n                        </select>\n                        <select class=\"week-days\" [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificWeekDay'\"\n                            (change)=\"regenerateCron()\" [(ngModel)]=\"state.monthly.specificWeekDay.day\" [ngClass]=\"options.formSelectClass\">\n                            <option *ngFor=\"let day of selectOptions.days\" [ngValue]=\"day\">\n                                {{dayDisplay(day)}}\n                            </option>\n                        </select> of every\n                        <select class=\"months-small\" [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificWeekDay'\"\n                            (change)=\"regenerateCron()\" [(ngModel)]=\"state.monthly.specificWeekDay.months\" [ngClass]=\"options.formSelectClass\">\n                            <option *ngFor=\"let month of selectOptions.months\" [ngValue]=\"month\">\n                                {{month}}\n                            </option>\n                        </select> month(s) starting in\n                        <select class=\"months\" [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificWeekDay'\"\n                            (change)=\"regenerateCron()\" [(ngModel)]=\"state.monthly.specificWeekDay.startMonth\" [ngClass]=\"options.formSelectClass\">\n                            <option *ngFor=\"let month of selectOptions.months\" [ngValue]=\"month\">\n                                {{monthDisplay(month)}}\n                            </option>\n                        </select>\n\n                        at\n                        <cron-time-picker2 [disabled]=\"disabled || activeTab !== 'monthly' || state.monthly.subTab !== 'specificWeekDay'\"\n                            (change)=\"regenerateCron()\" [(time)]=\"state.monthly.specificWeekDay\" [selectClass]=\"options.formSelectClass\"\n                            [use24HourTime]=\"options.use24HourTime\" [hideSeconds]=\"options.hideSeconds\">\n                        </cron-time-picker2>\n                    </div>\n                </div>\n\n                <!-- Yearly-->\n                <div class=\"tab-pane\" *ngIf=\"!options.hideYearlyTab\" [ngClass]=\"{'active': activeTab === 'yearly'}\">\n                    <div class=\"well well-small\">\n                        <input type=\"radio\" name=\"yearly-radio\" value=\"specificMonthDay\" [disabled]=\"disabled\" (change)=\"regenerateCron()\"\n                            [(ngModel)]=\"state.yearly.subTab\" [ngClass]=\"state.formRadioClass\">\n                        Every\n                        <select class=\"months\" [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthDay'\"\n                            (change)=\"regenerateCron()\" [(ngModel)]=\"state.yearly.specificMonthDay.month\" [ngClass]=\"options.formSelectClass\">\n                            <option *ngFor=\"let month of selectOptions.months\" [ngValue]=\"month\">\n                                {{monthDisplay(month)}}\n                            </option>\n                        </select> on the\n                        <select class=\"month-days\" [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthDay'\"\n                            (change)=\"regenerateCron()\" [(ngModel)]=\"state.yearly.specificMonthDay.day\" [ngClass]=\"options.formSelectClass\">\n                            <option *ngFor=\"let monthDaysWithLast of selectOptions.monthDaysWithLasts\" [ngValue]=\"monthDaysWithLast\">\n                                {{monthDayDisplay(monthDaysWithLast)}}\n                            </option>\n                        </select> at\n                        <cron-time-picker2 [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthDay'\"\n                            (change)=\"regenerateCron()\" [(time)]=\"state.yearly.specificMonthDay\" [selectClass]=\"options.formSelectClass\"\n                            [use24HourTime]=\"options.use24HourTime\" [hideSeconds]=\"options.hideSeconds\">\n                        </cron-time-picker2>&nbsp;\n                        <label class=\"advanced-cron-editor-label\"><input type=\"checkbox\" (change)=\"regenerateCron()\"\n                        [(ngModel)]=\"state.yearly.runOnWeekday\" [ngClass]=\"options.formCheckboxClass\"> during the nearest weekday</label>\n                    </div>\n                    <div class=\"well well-small\">\n                        <input type=\"radio\" name=\"yearly-radio\" value=\"specificMonthWeek\" [disabled]=\"disabled\"\n                            (change)=\"regenerateCron()\" [(ngModel)]=\"state.yearly.subTab\" [ngClass]=\"state.formRadioClass\">\n                        On the\n                        <select class=\"day-order-in-month\" [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthWeek'\"\n                            (change)=\"regenerateCron()\" [(ngModel)]=\"state.yearly.specificMonthWeek.monthWeek\"\n                            [ngClass]=\"options.formSelectClass\">\n                            <option *ngFor=\"let monthWeek of selectOptions.monthWeeks\" [ngValue]=\"monthWeek\">\n                                {{monthWeekDisplay(monthWeek)}}\n                            </option>\n                        </select>\n                        <select class=\"week-days\" [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthWeek'\"\n                            (change)=\"regenerateCron()\" [(ngModel)]=\"state.yearly.specificMonthWeek.day\" [ngClass]=\"options.formSelectClass\">\n                            <option *ngFor=\"let day of selectOptions.days\" [ngValue]=\"day\">\n                                {{dayDisplay(day)}}\n                            </option>\n                        </select> of\n                        <select class=\"months\" [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthWeek'\"\n                            (change)=\"regenerateCron()\" [(ngModel)]=\"state.yearly.specificMonthWeek.month\" [ngClass]=\"options.formSelectClass\">\n                            <option *ngFor=\"let month of selectOptions.months\" [ngValue]=\"month\">\n                                {{monthDisplay(month)}}\n                            </option>\n                        </select> at\n                        <cron-time-picker2 [disabled]=\"disabled || activeTab !== 'yearly' || state.yearly.subTab !== 'specificMonthWeek'\"\n                            (change)=\"regenerateCron()\" [(time)]=\"state.yearly.specificMonthWeek\" [selectClass]=\"options.formSelectClass\"\n                            [use24HourTime]=\"options.use24HourTime\" [hideSeconds]=\"options.hideSeconds\">\n                        </cron-time-picker2>\n                    </div>\n                </div>\n\n                <!-- Advanced-->\n                <div class=\"tab-pane\" *ngIf=\"!options.hideAdvancedTab\" [ngClass]=\"{'active': activeTab === 'advanced'}\">\n                    Cron Expression\n                    <input type=\"text\" class=\"advanced-cron-editor-input\" ng-disabled=\"disabled || activeTab !== 'advanced'\"\n                        (change)=\"regenerateCron()\" [(ngModel)]=\"state.advanced.expression\" [ngClass]=\"options.formInputClass\">\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\" *ngIf=\"!state.validation.isValid\">\n        <code>{{state.validation.errorMessage}}</code>\n    </div>\n</div>\n",
                styles: [".cron-editor-container{margin-top:10px}.cron-editor-container .cron-editor-radio{width:20px;display:inline-block}.cron-editor-container .cron-editor-checkbox,.cron-editor-container .cron-editor-input,.cron-editor-container .cron-editor-select{display:inline-block}.cron-editor-container .well-time-wrapper{padding-left:20px}.cron-editor-container .inline-block{display:inline-block}.cron-editor-container .days,.cron-editor-container .hours,.cron-editor-container .minutes,.cron-editor-container .seconds{width:70px}.cron-editor-container .months{width:120px}.cron-editor-container .month-days{width:130px}.cron-editor-container .months-small{width:60px}.cron-editor-container .day-order-in-month{width:95px}.cron-editor-container .week-days{width:120px}.cron-editor-container .advanced-cron-editor-input{width:200px}.cron-editor-container .hour-types{width:70px}.cron-editor-container .advanced-cron-editor-label{font-weight:200}.nav-tabs li a{cursor:pointer}.form-control{height:auto}"]
            }] }
];
CronEditorComponent.propDecorators = {
    disabled: [{ type: Input }],
    options: [{ type: Input }],
    cron: [{ type: Input }],
    cronChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CronEditorComponent.prototype.disabled;
    /** @type {?} */
    CronEditorComponent.prototype.options;
    /** @type {?} */
    CronEditorComponent.prototype.cronChange;
    /** @type {?} */
    CronEditorComponent.prototype.activeTab;
    /** @type {?} */
    CronEditorComponent.prototype.selectOptions;
    /** @type {?} */
    CronEditorComponent.prototype.state;
    /**
     * @type {?}
     * @private
     */
    CronEditorComponent.prototype.localCron;
    /**
     * @type {?}
     * @private
     */
    CronEditorComponent.prototype.isDirty;
}
export class TimePickerComponent2 {
    constructor() {
        this.change = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.hours = this.use24HourTime ? Utils.getRange(0, 23) : Utils.getRange(0, 12);
        this.minutes = Utils.getRange(0, 59);
        this.seconds = Utils.getRange(0, 59);
        this.hourTypes = ['AM', 'PM'];
    }
}
TimePickerComponent2.decorators = [
    { type: Component, args: [{
                selector: 'cron-time-picker2',
                template: "<!-- hour -->\n<select class=\"timeFormControl\" (change)=\"change.emit()\" [(ngModel)]=\"time.hours\" [disabled]=\"disabled\" [ngClass]=\"selectClass\">\n  <option *ngFor=\"let hour of hours\" [ngValue]=\"hour\">{{hour}}</option>\n</select>\n\n<!-- minute -->\n<select class=\"timeFormControl\" (change)=\"change.emit()\" [(ngModel)]=\"time.minutes\" [disabled]=\"disabled\" [ngClass]=\"selectClass\">\n  <option *ngFor=\"let minute of minutes\" [ngValue]=\"minute\">{{minute}}</option>\n</select>\n\n<!-- second -->\n<select class=\"timeFormControl\" (change)=\"change.emit()\" [(ngModel)]=\"time.seconds\" [disabled]=\"disabled\" *ngIf=\"!hideSeconds\"\n  [ngClass]=\"selectClass\">\n  <option *ngFor=\"let second of seconds\" [ngValue]=\"second\">{{second}}</option>\n</select>\n\n<!-- am/pm -->\n<select class=\"timeFormControl\" (change)=\"change.emit()\" [(ngModel)]=\"time.hourTypes\" [disabled]=\"disabled\" *ngIf=\"!use24HourTime\"\n  [ngClass]=\"selectClass\">\n  <option *ngFor=\"let hourType of hourTypes\" [ngValue]=\"hourType\">{{hourType}}</option>\n</select>\n",
                styles: [".timeFormControl{width:70px;display:inline}"]
            }] }
];
TimePickerComponent2.propDecorators = {
    change: [{ type: Output }],
    disabled: [{ type: Input }],
    time: [{ type: Input }],
    selectClass: [{ type: Input }],
    use24HourTime: [{ type: Input }],
    hideSeconds: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    TimePickerComponent2.prototype.change;
    /** @type {?} */
    TimePickerComponent2.prototype.disabled;
    /** @type {?} */
    TimePickerComponent2.prototype.time;
    /** @type {?} */
    TimePickerComponent2.prototype.selectClass;
    /** @type {?} */
    TimePickerComponent2.prototype.use24HourTime;
    /** @type {?} */
    TimePickerComponent2.prototype.hideSeconds;
    /** @type {?} */
    TimePickerComponent2.prototype.hours;
    /** @type {?} */
    TimePickerComponent2.prototype.minutes;
    /** @type {?} */
    TimePickerComponent2.prototype.seconds;
    /** @type {?} */
    TimePickerComponent2.prototype.hourTypes;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Jvbi1lZGl0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vY3Jvbi1lZGl0b3IvIiwic291cmNlcyI6WyJsaWIvY3Jvbi1lZGl0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFHekcsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ25ELE9BQU8sS0FBSyxNQUFNLFNBQVMsQ0FBQztBQU81QixNQUFNLE9BQU8sbUJBQW1CO0lBTGhDOztRQWdCWSxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUduQyxrQkFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBdWdCakQsQ0FBQzs7OztJQWpoQkMsSUFBYSxJQUFJLEtBQWEsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDdEQsSUFBSSxJQUFJLENBQUMsS0FBYTtRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7OztJQVlNLFFBQVE7UUFDYixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFO1lBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUNqQztRQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXBDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFTSxXQUFXLENBQUMsT0FBc0I7O2NBQ2pDLE9BQU8sR0FBRyxPQUFP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a0I7Ozs7O0lBRWxCLHdDQUEwQjs7Ozs7SUFDMUIsc0NBQXlCOztBQTBnQjNCLE1BQU0sT0FBTyxvQkFBb0I7SUFMakM7UUFNbUIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFrQi9DLENBQUM7Ozs7SUFOUSxRQUFRO1FBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7O1lBdkJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3Qixpa0NBQXVEOzthQUV4RDs7O3FCQUVFLE1BQU07dUJBQ04sS0FBSzttQkFDTCxLQUFLOzBCQUNMLEtBQUs7NEJBQ0wsS0FBSzswQkFDTCxLQUFLOzs7O0lBTE4sc0NBQTZDOztJQUM3Qyx3Q0FBa0M7O0lBQ2xDLG9DQUEwQjs7SUFDMUIsMkNBQW9DOztJQUNwQyw2Q0FBdUM7O0lBQ3ZDLDJDQUFxQzs7SUFFckMscUNBQXVCOztJQUN2Qix1Q0FBeUI7O0lBQ3pCLHVDQUF5Qjs7SUFDekIseUNBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgU2ltcGxlQ2hhbmdlcywgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDcm9uT3B0aW9ucyB9IGZyb20gJy4vQ3Jvbk9wdGlvbnMnO1xuXG5pbXBvcnQgeyBEYXlzLCBNb250aFdlZWtzLCBNb250aHMgfSBmcm9tICcuL2VudW1zJztcbmltcG9ydCBVdGlscyBmcm9tICcuL1V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3Jvbi1lZGl0b3InLFxuICB0ZW1wbGF0ZVVybDogJy4vY3Jvbi1lZGl0b3IuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jcm9uLWVkaXRvci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ3JvbkVkaXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgcHVibGljIGRpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBwdWJsaWMgb3B0aW9uczogQ3Jvbk9wdGlvbnM7XG5cbiAgQElucHV0KCkgZ2V0IGNyb24oKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMubG9jYWxDcm9uOyB9XG4gIHNldCBjcm9uKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmxvY2FsQ3JvbiA9IHZhbHVlO1xuICAgIHRoaXMuY3JvbkNoYW5nZS5lbWl0KHRoaXMubG9jYWxDcm9uKTtcbiAgfVxuXG4gIC8vIHRoZSBuYW1lIGlzIGFuIEFuZ3VsYXIgY29udmVudGlvbiwgQElucHV0IHZhcmlhYmxlIG5hbWUgKyBcIkNoYW5nZVwiIHN1ZmZpeFxuICBAT3V0cHV0KCkgY3JvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwdWJsaWMgYWN0aXZlVGFiOiBzdHJpbmc7XG4gIHB1YmxpYyBzZWxlY3RPcHRpb25zID0gdGhpcy5nZXRTZWxlY3RPcHRpb25zKCk7XG4gIHB1YmxpYyBzdGF0ZTogYW55O1xuXG4gIHByaXZhdGUgbG9jYWxDcm9uOiBzdHJpbmc7XG4gIHByaXZhdGUgaXNEaXJ0eTogYm9vbGVhbjtcblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZW1vdmVTZWNvbmRzKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuaGlkZVNlY29uZHMgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLmdldERlZmF1bHRTdGF0ZSgpO1xuXG4gICAgdGhpcy5oYW5kbGVNb2RlbENoYW5nZSh0aGlzLmNyb24pO1xuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBjb25zdCBuZXdDcm9uID0gY2hhbmdlc1snY3JvbiddO1xuICAgIGlmIChuZXdDcm9uICYmICFuZXdDcm9uLmZpcnN0Q2hhbmdlKSB7XG4gICAgICB0aGlzLmhhbmRsZU1vZGVsQ2hhbmdlKHRoaXMuY3Jvbik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldEFjdGl2ZVRhYih0YWI6IHN0cmluZykge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5hY3RpdmVUYWIgPSB0YWI7XG4gICAgICB0aGlzLnJlZ2VuZXJhdGVDcm9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGRheURpc3BsYXkoZGF5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBEYXlzW2RheV07XG4gIH1cblxuICBwdWJsaWMgbW9udGhXZWVrRGlzcGxheShtb250aFdlZWtOdW1iZXI6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIE1vbnRoV2Vla3NbbW9udGhXZWVrTnVtYmVyXTtcbiAgfVxuXG4gIHB1YmxpYyBtb250aERpc3BsYXkobW9udGg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIE1vbnRoc1ttb250aF07XG4gIH1cblxuICBwdWJsaWMgbW9udGhEYXlEaXNwbGF5KG1vbnRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmIChtb250aCA9PT0gJ0wnKSB7XG4gICAgICByZXR1cm4gJ0xhc3QgRGF5JztcbiAgICB9IGVsc2UgaWYgKG1vbnRoID09PSAnTFcnKSB7XG4gICAgICByZXR1cm4gJ0xhc3QgV2Vla2RheSc7XG4gICAgfSBlbHNlIGlmIChtb250aCA9PT0gJzFXJykge1xuICAgICAgcmV0dXJuICdGaXJzdCBXZWVrZGF5JztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAke21vbnRofSR7dGhpcy5nZXRPcmRpbmFsU3VmZml4KG1vbnRoKX0gZGF5YDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVnZW5lcmF0ZUNyb24oKSB7XG4gICAgdGhpcy5pc0RpcnR5ID0gdHJ1ZTtcblxuICAgIHN3aXRjaCAodGhpcy5hY3RpdmVUYWIpIHtcbiAgICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgICAgICB0aGlzLmNyb24gPSBgMC8ke3RoaXMuc3RhdGUubWludXRlcy5taW51dGVzfSAqIDEvMSAqID9gO1xuXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLnJlbW92ZVNlY29uZHMpIHtcbiAgICAgICAgICB0aGlzLmNyb24gPSBgJHt0aGlzLnN0YXRlLm1pbnV0ZXMuc2Vjb25kc30gJHt0aGlzLmNyb259YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLnJlbW92ZVllYXJzKSB7XG4gICAgICAgICAgdGhpcy5jcm9uID0gYCR7dGhpcy5jcm9ufSAqYDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2hvdXJseSc6XG4gICAgICAgIHRoaXMuY3JvbiA9IGAke3RoaXMuc3RhdGUuaG91cmx5Lm1pbnV0ZXN9IDAvJHt0aGlzLnN0YXRlLmhvdXJseS5ob3Vyc30gMS8xICogP2A7XG5cbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucmVtb3ZlU2Vjb25kcykge1xuICAgICAgICAgIHRoaXMuY3JvbiA9IGAke3RoaXMuc3RhdGUuaG91cmx5LnNlY29uZHN9ICR7dGhpcy5jcm9ufWA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5yZW1vdmVZZWFycykge1xuICAgICAgICAgIHRoaXMuY3JvbiA9IGAke3RoaXMuY3Jvbn0gKmA7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkYWlseSc6XG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZS5kYWlseS5zdWJUYWIpIHtcbiAgICAgICAgICBjYXNlICdldmVyeURheXMnOlxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgICAgICAgdGhpcy5jcm9uID0gYCR7dGhpcy5zdGF0ZS5kYWlseS5ldmVyeURheXMubWludXRlc30gJHt0aGlzLmhvdXJUb0Nyb24odGhpcy5zdGF0ZS5kYWlseS5ldmVyeURheXMuaG91cnMsIHRoaXMuc3RhdGUuZGFpbHkuZXZlcnlEYXlzLmhvdXJUeXBlKX0gMS8ke3RoaXMuc3RhdGUuZGFpbHkuZXZlcnlEYXlzLmRheXN9ICogP2A7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLnJlbW92ZVNlY29uZHMpIHtcbiAgICAgICAgICAgICAgdGhpcy5jcm9uID0gYCR7dGhpcy5zdGF0ZS5kYWlseS5ldmVyeURheXMuc2Vjb25kc30gJHt0aGlzLmNyb259YDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucmVtb3ZlWWVhcnMpIHtcbiAgICAgICAgICAgICAgdGhpcy5jcm9uID0gYCR7dGhpcy5jcm9ufSAqYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2V2ZXJ5V2Vla0RheSc6XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICAgICB0aGlzLmNyb24gPSBgJHt0aGlzLnN0YXRlLmRhaWx5LmV2ZXJ5V2Vla0RheS5taW51dGVzfSAke3RoaXMuaG91clRvQ3Jvbih0aGlzLnN0YXRlLmRhaWx5LmV2ZXJ5V2Vla0RheS5ob3VycywgdGhpcy5zdGF0ZS5kYWlseS5ldmVyeVdlZWtEYXkuaG91clR5cGUpfSA/ICogTU9OLUZSSWA7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLnJlbW92ZVNlY29uZHMpIHtcbiAgICAgICAgICAgICAgdGhpcy5jcm9uID0gYCR7dGhpcy5zdGF0ZS5kYWlseS5ldmVyeVdlZWtEYXkuc2Vjb25kc30gJHt0aGlzLmNyb259YDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucmVtb3ZlWWVhcnMpIHtcbiAgICAgICAgICAgICAgdGhpcy5jcm9uID0gYCR7dGhpcy5jcm9ufSAqYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY3JvbiBkYWlseSBzdWJ0YWIgc2VsZWN0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd3ZWVrbHknOlxuICAgICAgICBjb25zdCBkYXlzID0gdGhpcy5zZWxlY3RPcHRpb25zLmRheXNcbiAgICAgICAgICAucmVkdWNlKChhY2MsIGRheSkgPT4gdGhpcy5zdGF0ZS53ZWVrbHlbZGF5XSA/IGFjYy5jb25jYXQoW2RheV0pIDogYWNjLCBbXSlcbiAgICAgICAgICAuam9pbignLCcpO1xuICAgICAgICB0aGlzLmNyb24gPSBgJHt0aGlzLnN0YXRlLndlZWtseS5taW51dGVzfSAke3RoaXMuaG91clRvQ3Jvbih0aGlzLnN0YXRlLndlZWtseS5ob3VycywgdGhpcy5zdGF0ZS53ZWVrbHkuaG91clR5cGUpfSA/ICogJHtkYXlzfWA7XG5cbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucmVtb3ZlU2Vjb25kcykge1xuICAgICAgICAgIHRoaXMuY3JvbiA9IGAke3RoaXMuc3RhdGUud2Vla2x5LnNlY29uZHN9ICR7dGhpcy5jcm9ufWA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5yZW1vdmVZZWFycykge1xuICAgICAgICAgIHRoaXMuY3JvbiA9IGAke3RoaXMuY3Jvbn0gKmA7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtb250aGx5JzpcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlLm1vbnRobHkuc3ViVGFiKSB7XG4gICAgICAgICAgY2FzZSAnc3BlY2lmaWNEYXknOlxuICAgICAgICAgICAgY29uc3QgZGF5ID0gdGhpcy5zdGF0ZS5tb250aGx5LnJ1bk9uV2Vla2RheSA/IGAke3RoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY0RheS5kYXl9V2AgOiB0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNEYXkuZGF5O1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgICAgICAgdGhpcy5jcm9uID0gYCR7dGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljRGF5Lm1pbnV0ZXN9ICR7dGhpcy5ob3VyVG9Dcm9uKHRoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY0RheS5ob3VycywgdGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljRGF5LmhvdXJUeXBlKX0gJHtkYXl9IDEvJHt0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNEYXkubW9udGhzfSA/YDtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucmVtb3ZlU2Vjb25kcykge1xuICAgICAgICAgICAgICB0aGlzLmNyb24gPSBgJHt0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNEYXkuc2Vjb25kc30gJHt0aGlzLmNyb259YDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucmVtb3ZlWWVhcnMpIHtcbiAgICAgICAgICAgICAgdGhpcy5jcm9uID0gYCR7dGhpcy5jcm9ufSAqYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NwZWNpZmljV2Vla0RheSc6XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICAgICB0aGlzLmNyb24gPSBgJHt0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNXZWVrRGF5Lm1pbnV0ZXN9ICR7dGhpcy5ob3VyVG9Dcm9uKHRoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY1dlZWtEYXkuaG91cnMsIHRoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY1dlZWtEYXkuaG91clR5cGUpfSA/ICR7dGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljV2Vla0RheS5zdGFydE1vbnRofS8ke3RoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY1dlZWtEYXkubW9udGhzfSAke3RoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY1dlZWtEYXkuZGF5fSR7dGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljV2Vla0RheS5tb250aFdlZWt9YDtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucmVtb3ZlU2Vjb25kcykge1xuICAgICAgICAgICAgICB0aGlzLmNyb24gPSBgJHt0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNXZWVrRGF5LnNlY29uZHN9ICR7dGhpcy5jcm9ufWA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLnJlbW92ZVllYXJzKSB7XG4gICAgICAgICAgICAgIHRoaXMuY3JvbiA9IGAke3RoaXMuY3Jvbn0gKmA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNyb24gbW9udGhseSBzdWJ0YWIgc2VsZWN0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd5ZWFybHknOlxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUueWVhcmx5LnN1YlRhYikge1xuICAgICAgICAgIGNhc2UgJ3NwZWNpZmljTW9udGhEYXknOlxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgICAgICAgY29uc3QgZGF5ID0gdGhpcy5zdGF0ZS55ZWFybHkucnVuT25XZWVrZGF5ID8gYCR7dGhpcy5zdGF0ZS55ZWFybHkuc3BlY2lmaWNNb250aERheS5kYXl9V2AgOiB0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoRGF5LmRheTtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICAgIHRoaXMuY3JvbiA9IGAke3RoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhEYXkubWludXRlc30gJHt0aGlzLmhvdXJUb0Nyb24odGhpcy5zdGF0ZS55ZWFybHkuc3BlY2lmaWNNb250aERheS5ob3VycywgdGhpcy5zdGF0ZS55ZWFybHkuc3BlY2lmaWNNb250aERheS5ob3VyVHlwZSl9ICR7ZGF5fSAke3RoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhEYXkubW9udGh9ID9gO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5yZW1vdmVTZWNvbmRzKSB7XG4gICAgICAgICAgICAgIHRoaXMuY3JvbiA9IGAke3RoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhEYXkuc2Vjb25kc30gJHt0aGlzLmNyb259YDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucmVtb3ZlWWVhcnMpIHtcbiAgICAgICAgICAgICAgdGhpcy5jcm9uID0gYCR7dGhpcy5jcm9ufSAqYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NwZWNpZmljTW9udGhXZWVrJzpcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICAgIHRoaXMuY3JvbiA9IGAke3RoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhXZWVrLm1pbnV0ZXN9ICR7dGhpcy5ob3VyVG9Dcm9uKHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhXZWVrLmhvdXJzLCB0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoV2Vlay5ob3VyVHlwZSl9ID8gJHt0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoV2Vlay5tb250aH0gJHt0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoV2Vlay5kYXl9JHt0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoV2Vlay5tb250aFdlZWt9YDtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucmVtb3ZlU2Vjb25kcykge1xuICAgICAgICAgICAgICB0aGlzLmNyb24gPSBgJHt0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoV2Vlay5zZWNvbmRzfSAke3RoaXMuY3Jvbn1gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5yZW1vdmVZZWFycykge1xuICAgICAgICAgICAgICB0aGlzLmNyb24gPSBgJHt0aGlzLmNyb259ICpgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjcm9uIHllYXJseSBzdWJ0YWIgc2VsZWN0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhZHZhbmNlZCc6XG4gICAgICAgIHRoaXMuY3JvbiA9IHRoaXMuc3RhdGUuYWR2YW5jZWQuZXhwcmVzc2lvbjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY3JvbiBhY3RpdmUgdGFiIHNlbGVjdGlvbicpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0QW1QbUhvdXIoaG91cjogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy51c2UyNEhvdXJUaW1lID8gaG91ciA6IChob3VyICsgMTEpICUgMTIgKyAxO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRIb3VyVHlwZShob3VyOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnVzZTI0SG91clRpbWUgPyB1bmRlZmluZWQgOiAoaG91ciA+PSAxMiA/ICdQTScgOiAnQU0nKTtcbiAgfVxuXG4gIHByaXZhdGUgaG91clRvQ3Jvbihob3VyOiBudW1iZXIsIGhvdXJUeXBlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnVzZTI0SG91clRpbWUpIHtcbiAgICAgIHJldHVybiBob3VyO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaG91clR5cGUgPT09ICdBTScgPyAoaG91ciA9PT0gMTIgPyAwIDogaG91cikgOiAoaG91ciA9PT0gMTIgPyAxMiA6IGhvdXIgKyAxMik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVNb2RlbENoYW5nZShjcm9uOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5pc0RpcnR5KSB7XG4gICAgICB0aGlzLmlzRGlydHkgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc0RpcnR5ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy52YWxpZGF0ZShjcm9uKTtcblxuICAgIGxldCBjcm9uU2V2ZW4gPSBjcm9uO1xuICAgIGlmICh0aGlzLm9wdGlvbnMucmVtb3ZlU2Vjb25kcykge1xuICAgICAgY3JvblNldmVuID0gYDAgJHtjcm9ufWA7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZW1vdmVZZWFycykge1xuICAgICAgY3JvblNldmVuID0gYCR7Y3JvblNldmVufSAqYDtcbiAgICB9XG5cbiAgICBjb25zdCBbc2Vjb25kcywgbWludXRlcywgaG91cnMsIGRheU9mTW9udGgsIG1vbnRoLCBkYXlPZldlZWtdID0gY3JvblNldmVuLnNwbGl0KCcgJyk7XG5cbiAgICBpZiAoY3JvblNldmVuLm1hdGNoKC9cXGQrIDBcXC9cXGQrIFxcKiAxXFwvMSBcXCogXFw/IFxcKi8pKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9ICdtaW51dGVzJztcblxuICAgICAgdGhpcy5zdGF0ZS5taW51dGVzLm1pbnV0ZXMgPSBOdW1iZXIobWludXRlcy5zdWJzdHJpbmcoMikpO1xuICAgICAgdGhpcy5zdGF0ZS5taW51dGVzLnNlY29uZHMgPSBOdW1iZXIoc2Vjb25kcyk7XG4gICAgfSBlbHNlIGlmIChjcm9uU2V2ZW4ubWF0Y2goL1xcZCsgXFxkKyAwXFwvXFxkKyAxXFwvMSBcXCogXFw/IFxcKi8pKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9ICdob3VybHknO1xuXG4gICAgICB0aGlzLnN0YXRlLmhvdXJseS5ob3VycyA9IE51bWJlcihob3Vycy5zdWJzdHJpbmcoMikpO1xuICAgICAgdGhpcy5zdGF0ZS5ob3VybHkubWludXRlcyA9IE51bWJlcihtaW51dGVzKTtcbiAgICAgIHRoaXMuc3RhdGUuaG91cmx5LnNlY29uZHMgPSBOdW1iZXIoc2Vjb25kcyk7XG4gICAgfSBlbHNlIGlmIChjcm9uU2V2ZW4ubWF0Y2goL1xcZCsgXFxkKyBcXGQrIDFcXC9cXGQrIFxcKiBcXD8gXFwqLykpIHtcbiAgICAgIHRoaXMuYWN0aXZlVGFiID0gJ2RhaWx5JztcblxuICAgICAgdGhpcy5zdGF0ZS5kYWlseS5zdWJUYWIgPSAnZXZlcnlEYXlzJztcbiAgICAgIHRoaXMuc3RhdGUuZGFpbHkuZXZlcnlEYXlzLmRheXMgPSBOdW1iZXIoZGF5T2ZNb250aC5zdWJzdHJpbmcoMikpO1xuICAgICAgY29uc3QgcGFyc2VkSG91cnMgPSBOdW1iZXIoaG91cnMpO1xuICAgICAgdGhpcy5zdGF0ZS5kYWlseS5ldmVyeURheXMuaG91cnMgPSB0aGlzLmdldEFtUG1Ib3VyKHBhcnNlZEhvdXJzKTtcbiAgICAgIHRoaXMuc3RhdGUuZGFpbHkuZXZlcnlEYXlzLmhvdXJUeXBlID0gdGhpcy5nZXRIb3VyVHlwZShwYXJzZWRIb3Vycyk7XG4gICAgICB0aGlzLnN0YXRlLmRhaWx5LmV2ZXJ5RGF5cy5taW51dGVzID0gTnVtYmVyKG1pbnV0ZXMpO1xuICAgICAgdGhpcy5zdGF0ZS5kYWlseS5ldmVyeURheXMuc2Vjb25kcyA9IE51bWJlcihzZWNvbmRzKTtcbiAgICB9IGVsc2UgaWYgKGNyb25TZXZlbi5tYXRjaCgvXFxkKyBcXGQrIFxcZCsgXFw/IFxcKiBNT04tRlJJIFxcKi8pKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9ICdkYWlseSc7XG5cbiAgICAgIHRoaXMuc3RhdGUuZGFpbHkuc3ViVGFiID0gJ2V2ZXJ5V2Vla0RheSc7XG4gICAgICBjb25zdCBwYXJzZWRIb3VycyA9IE51bWJlcihob3Vycyk7XG4gICAgICB0aGlzLnN0YXRlLmRhaWx5LmV2ZXJ5V2Vla0RheS5ob3VycyA9IHRoaXMuZ2V0QW1QbUhvdXIocGFyc2VkSG91cnMpO1xuICAgICAgdGhpcy5zdGF0ZS5kYWlseS5ldmVyeVdlZWtEYXkuaG91clR5cGUgPSB0aGlzLmdldEhvdXJUeXBlKHBhcnNlZEhvdXJzKTtcbiAgICAgIHRoaXMuc3RhdGUuZGFpbHkuZXZlcnlXZWVrRGF5Lm1pbnV0ZXMgPSBOdW1iZXIobWludXRlcyk7XG4gICAgICB0aGlzLnN0YXRlLmRhaWx5LmV2ZXJ5V2Vla0RheS5zZWNvbmRzID0gTnVtYmVyKHNlY29uZHMpO1xuICAgIH0gZWxzZSBpZiAoY3JvblNldmVuLm1hdGNoKC9cXGQrIFxcZCsgXFxkKyBcXD8gXFwqIChNT058VFVFfFdFRHxUSFV8RlJJfFNBVHxTVU4pKCwoTU9OfFRVRXxXRUR8VEhVfEZSSXxTQVR8U1VOKSkqIFxcKi8pKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9ICd3ZWVrbHknO1xuICAgICAgdGhpcy5zZWxlY3RPcHRpb25zLmRheXMuZm9yRWFjaCh3ZWVrRGF5ID0+IHRoaXMuc3RhdGUud2Vla2x5W3dlZWtEYXldID0gZmFsc2UpO1xuICAgICAgZGF5T2ZXZWVrLnNwbGl0KCcsJykuZm9yRWFjaCh3ZWVrRGF5ID0+IHRoaXMuc3RhdGUud2Vla2x5W3dlZWtEYXldID0gdHJ1ZSk7XG4gICAgICBjb25zdCBwYXJzZWRIb3VycyA9IE51bWJlcihob3Vycyk7XG4gICAgICB0aGlzLnN0YXRlLndlZWtseS5ob3VycyA9IHRoaXMuZ2V0QW1QbUhvdXIocGFyc2VkSG91cnMpO1xuICAgICAgdGhpcy5zdGF0ZS53ZWVrbHkuaG91clR5cGUgPSB0aGlzLmdldEhvdXJUeXBlKHBhcnNlZEhvdXJzKTtcbiAgICAgIHRoaXMuc3RhdGUud2Vla2x5Lm1pbnV0ZXMgPSBOdW1iZXIobWludXRlcyk7XG4gICAgICB0aGlzLnN0YXRlLndlZWtseS5zZWNvbmRzID0gTnVtYmVyKHNlY29uZHMpO1xuICAgIH0gZWxzZSBpZiAoY3JvblNldmVuLm1hdGNoKC9cXGQrIFxcZCsgXFxkKyAoXFxkK3xMfExXfDFXKSAxXFwvXFxkKyBcXD8gXFwqLykpIHtcbiAgICAgIHRoaXMuYWN0aXZlVGFiID0gJ21vbnRobHknO1xuICAgICAgdGhpcy5zdGF0ZS5tb250aGx5LnN1YlRhYiA9ICdzcGVjaWZpY0RheSc7XG5cbiAgICAgIGlmIChkYXlPZk1vbnRoLmluZGV4T2YoJ1cnKSAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljRGF5LmRheSA9IGRheU9mTW9udGguY2hhckF0KDApO1xuICAgICAgICB0aGlzLnN0YXRlLm1vbnRobHkucnVuT25XZWVrZGF5ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY0RheS5kYXkgPSBkYXlPZk1vbnRoO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNEYXkubW9udGhzID0gTnVtYmVyKG1vbnRoLnN1YnN0cmluZygyKSk7XG4gICAgICBjb25zdCBwYXJzZWRIb3VycyA9IE51bWJlcihob3Vycyk7XG4gICAgICB0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNEYXkuaG91cnMgPSB0aGlzLmdldEFtUG1Ib3VyKHBhcnNlZEhvdXJzKTtcbiAgICAgIHRoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY0RheS5ob3VyVHlwZSA9IHRoaXMuZ2V0SG91clR5cGUocGFyc2VkSG91cnMpO1xuICAgICAgdGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljRGF5Lm1pbnV0ZXMgPSBOdW1iZXIobWludXRlcyk7XG4gICAgICB0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNEYXkuc2Vjb25kcyA9IE51bWJlcihzZWNvbmRzKTtcbiAgICB9IGVsc2UgaWYgKGNyb25TZXZlbi5tYXRjaCgvXFxkKyBcXGQrIFxcZCsgXFw/IFxcZCtcXC9cXGQrIChNT058VFVFfFdFRHxUSFV8RlJJfFNBVHxTVU4pKCgjWzEtNV0pfEwpIFxcKi8pKSB7XG4gICAgICBjb25zdCBkYXkgPSBkYXlPZldlZWsuc3Vic3RyKDAsIDMpO1xuICAgICAgY29uc3QgbW9udGhXZWVrID0gZGF5T2ZXZWVrLnN1YnN0cigzKTtcbiAgICAgIHRoaXMuYWN0aXZlVGFiID0gJ21vbnRobHknO1xuICAgICAgdGhpcy5zdGF0ZS5tb250aGx5LnN1YlRhYiA9ICdzcGVjaWZpY1dlZWtEYXknO1xuICAgICAgdGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljV2Vla0RheS5tb250aFdlZWsgPSBtb250aFdlZWs7XG4gICAgICB0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNXZWVrRGF5LmRheSA9IGRheTtcblxuICAgICAgaWYgKG1vbnRoLmluZGV4T2YoJy8nKSAhPT0gLTEpIHtcbiAgICAgICAgY29uc3QgW3N0YXJ0TW9udGgsIG1vbnRoc10gPSBtb250aC5zcGxpdCgnLycpLm1hcChOdW1iZXIpO1xuICAgICAgICB0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNXZWVrRGF5Lm1vbnRocyA9IG1vbnRocztcbiAgICAgICAgdGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljV2Vla0RheS5zdGFydE1vbnRoID0gc3RhcnRNb250aDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFyc2VkSG91cnMgPSBOdW1iZXIoaG91cnMpO1xuICAgICAgdGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljV2Vla0RheS5ob3VycyA9IHRoaXMuZ2V0QW1QbUhvdXIocGFyc2VkSG91cnMpO1xuICAgICAgdGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljV2Vla0RheS5ob3VyVHlwZSA9IHRoaXMuZ2V0SG91clR5cGUocGFyc2VkSG91cnMpO1xuICAgICAgdGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljV2Vla0RheS5taW51dGVzID0gTnVtYmVyKG1pbnV0ZXMpO1xuICAgICAgdGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljV2Vla0RheS5zZWNvbmRzID0gTnVtYmVyKHNlY29uZHMpO1xuICAgIH0gZWxzZSBpZiAoY3JvblNldmVuLm1hdGNoKC9cXGQrIFxcZCsgXFxkKyAoXFxkK3xMfExXfDFXKSBcXGQrIFxcPyBcXCovKSkge1xuICAgICAgdGhpcy5hY3RpdmVUYWIgPSAneWVhcmx5JztcbiAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnN1YlRhYiA9ICdzcGVjaWZpY01vbnRoRGF5JztcbiAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhEYXkubW9udGggPSBOdW1iZXIobW9udGgpO1xuXG4gICAgICBpZiAoZGF5T2ZNb250aC5pbmRleE9mKCdXJykgIT09IC0xKSB7XG4gICAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhEYXkuZGF5ID0gZGF5T2ZNb250aC5jaGFyQXQoMCk7XG4gICAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnJ1bk9uV2Vla2RheSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoRGF5LmRheSA9IGRheU9mTW9udGg7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhcnNlZEhvdXJzID0gTnVtYmVyKGhvdXJzKTtcbiAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhEYXkuaG91cnMgPSB0aGlzLmdldEFtUG1Ib3VyKHBhcnNlZEhvdXJzKTtcbiAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhEYXkuaG91clR5cGUgPSB0aGlzLmdldEhvdXJUeXBlKHBhcnNlZEhvdXJzKTtcbiAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhEYXkubWludXRlcyA9IE51bWJlcihtaW51dGVzKTtcbiAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhEYXkuc2Vjb25kcyA9IE51bWJlcihzZWNvbmRzKTtcbiAgICB9IGVsc2UgaWYgKGNyb25TZXZlbi5tYXRjaCgvXFxkKyBcXGQrIFxcZCsgXFw/IFxcZCsgKE1PTnxUVUV8V0VEfFRIVXxGUkl8U0FUfFNVTikoKCNbMS01XSl8TCkgXFwqLykpIHtcbiAgICAgIGNvbnN0IGRheSA9IGRheU9mV2Vlay5zdWJzdHIoMCwgMyk7XG4gICAgICBjb25zdCBtb250aFdlZWsgPSBkYXlPZldlZWsuc3Vic3RyKDMpO1xuICAgICAgdGhpcy5hY3RpdmVUYWIgPSAneWVhcmx5JztcbiAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnN1YlRhYiA9ICdzcGVjaWZpY01vbnRoV2Vlayc7XG4gICAgICB0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoV2Vlay5tb250aFdlZWsgPSBtb250aFdlZWs7XG4gICAgICB0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoV2Vlay5kYXkgPSBkYXk7XG4gICAgICB0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoV2Vlay5tb250aCA9IE51bWJlcihtb250aCk7XG4gICAgICBjb25zdCBwYXJzZWRIb3VycyA9IE51bWJlcihob3Vycyk7XG4gICAgICB0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoV2Vlay5ob3VycyA9IHRoaXMuZ2V0QW1QbUhvdXIocGFyc2VkSG91cnMpO1xuICAgICAgdGhpcy5zdGF0ZS55ZWFybHkuc3BlY2lmaWNNb250aFdlZWsuaG91clR5cGUgPSB0aGlzLmdldEhvdXJUeXBlKHBhcnNlZEhvdXJzKTtcbiAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhXZWVrLm1pbnV0ZXMgPSBOdW1iZXIobWludXRlcyk7XG4gICAgICB0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoV2Vlay5zZWNvbmRzID0gTnVtYmVyKHNlY29uZHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9ICdhZHZhbmNlZCc7XG4gICAgICB0aGlzLnN0YXRlLmFkdmFuY2VkLmV4cHJlc3Npb24gPSBjcm9uO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdmFsaWRhdGUoY3Jvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZS52YWxpZGF0aW9uLmlzVmFsaWQgPSBmYWxzZTtcbiAgICB0aGlzLnN0YXRlLnZhbGlkYXRpb24uZXJyb3JNZXNzYWdlID0gJyc7XG5cbiAgICBpZiAoIWNyb24pIHtcbiAgICAgIHRoaXMuc3RhdGUudmFsaWRhdGlvbi5lcnJvck1lc3NhZ2UgPSAnQ3JvbiBleHByZXNzaW9uIGNhbm5vdCBiZSBudWxsJztcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjcm9uUGFydHMgPSBjcm9uLnNwbGl0KCcgJyk7XG5cbiAgICBsZXQgZXhwZWN0ZWQgPSA1O1xuXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMucmVtb3ZlU2Vjb25kcykge1xuICAgICAgZXhwZWN0ZWQrKztcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5yZW1vdmVZZWFycykge1xuICAgICAgZXhwZWN0ZWQrKztcbiAgICB9XG5cbiAgICBpZiAoY3JvblBhcnRzLmxlbmd0aCAhPT0gZXhwZWN0ZWQpIHtcbiAgICAgIHRoaXMuc3RhdGUudmFsaWRhdGlvbi5lcnJvck1lc3NhZ2UgPSBgSW52YWxpZCBjcm9uIGV4cHJlc3Npb24sIHRoZXJlIG11c3QgYmUgJHtleHBlY3RlZH0gc2VnbWVudHNgO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc3RhdGUudmFsaWRhdGlvbi5pc1ZhbGlkID0gdHJ1ZTtcbiAgICByZXR1cm47XG4gIH1cblxuICBwcml2YXRlIGdldERlZmF1bHRBZHZhbmNlZENyb25FeHByZXNzaW9uKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZW1vdmVTZWNvbmRzICYmICF0aGlzLm9wdGlvbnMucmVtb3ZlWWVhcnMpIHtcbiAgICAgIHJldHVybiAnMTUgMTAgTC0yICogPyAyMDE5JztcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5yZW1vdmVTZWNvbmRzICYmIHRoaXMub3B0aW9ucy5yZW1vdmVZZWFycykge1xuICAgICAgcmV0dXJuICcwIDE1IDEwIEwtMiAqID8nO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMucmVtb3ZlU2Vjb25kcyAmJiB0aGlzLm9wdGlvbnMucmVtb3ZlWWVhcnMpIHtcbiAgICAgIHJldHVybiAnMTUgMTAgTC0yICogPyc7XG4gICAgfVxuXG4gICAgcmV0dXJuICcwIDE1IDEwIEwtMiAqID8gMjAxOSc7XG4gIH1cblxuICBwcml2YXRlIGdldERlZmF1bHRTdGF0ZSgpIHtcbiAgICBjb25zdCBbZGVmYXVsdEhvdXJzLCBkZWZhdWx0TWludXRlcywgZGVmYXVsdFNlY29uZHNdID0gdGhpcy5vcHRpb25zLmRlZmF1bHRUaW1lLnNwbGl0KCc6JykubWFwKE51bWJlcik7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbWludXRlczoge1xuICAgICAgICBtaW51dGVzOiAxLFxuICAgICAgICBzZWNvbmRzOiAwXG4gICAgICB9LFxuICAgICAgaG91cmx5OiB7XG4gICAgICAgIGhvdXJzOiAxLFxuICAgICAgICBtaW51dGVzOiAwLFxuICAgICAgICBzZWNvbmRzOiAwXG4gICAgICB9LFxuICAgICAgZGFpbHk6IHtcbiAgICAgICAgc3ViVGFiOiAnZXZlcnlEYXlzJyxcbiAgICAgICAgZXZlcnlEYXlzOiB7XG4gICAgICAgICAgZGF5czogMSxcbiAgICAgICAgICBob3VyczogdGhpcy5nZXRBbVBtSG91cihkZWZhdWx0SG91cnMpLFxuICAgICAgICAgIG1pbnV0ZXM6IGRlZmF1bHRNaW51dGVzLFxuICAgICAgICAgIHNlY29uZHM6IGRlZmF1bHRTZWNvbmRzLFxuICAgICAgICAgIGhvdXJUeXBlOiB0aGlzLmdldEhvdXJUeXBlKGRlZmF1bHRIb3VycylcbiAgICAgICAgfSxcbiAgICAgICAgZXZlcnlXZWVrRGF5OiB7XG4gICAgICAgICAgaG91cnM6IHRoaXMuZ2V0QW1QbUhvdXIoZGVmYXVsdEhvdXJzKSxcbiAgICAgICAgICBtaW51dGVzOiBkZWZhdWx0TWludXRlcyxcbiAgICAgICAgICBzZWNvbmRzOiBkZWZhdWx0U2Vjb25kcyxcbiAgICAgICAgICBob3VyVHlwZTogdGhpcy5nZXRIb3VyVHlwZShkZWZhdWx0SG91cnMpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB3ZWVrbHk6IHtcbiAgICAgICAgTU9OOiB0cnVlLFxuICAgICAgICBUVUU6IGZhbHNlLFxuICAgICAgICBXRUQ6IGZhbHNlLFxuICAgICAgICBUSFU6IGZhbHNlLFxuICAgICAgICBGUkk6IGZhbHNlLFxuICAgICAgICBTQVQ6IGZhbHNlLFxuICAgICAgICBTVU46IGZhbHNlLFxuICAgICAgICBob3VyczogdGhpcy5nZXRBbVBtSG91cihkZWZhdWx0SG91cnMpLFxuICAgICAgICBtaW51dGVzOiBkZWZhdWx0TWludXRlcyxcbiAgICAgICAgc2Vjb25kczogZGVmYXVsdFNlY29uZHMsXG4gICAgICAgIGhvdXJUeXBlOiB0aGlzLmdldEhvdXJUeXBlKGRlZmF1bHRIb3VycylcbiAgICAgIH0sXG4gICAgICBtb250aGx5OiB7XG4gICAgICAgIHN1YlRhYjogJ3NwZWNpZmljRGF5JyxcbiAgICAgICAgcnVuT25XZWVrZGF5OiBmYWxzZSxcbiAgICAgICAgc3BlY2lmaWNEYXk6IHtcbiAgICAgICAgICBkYXk6ICcxJyxcbiAgICAgICAgICBtb250aHM6IDEsXG4gICAgICAgICAgaG91cnM6IHRoaXMuZ2V0QW1QbUhvdXIoZGVmYXVsdEhvdXJzKSxcbiAgICAgICAgICBtaW51dGVzOiBkZWZhdWx0TWludXRlcyxcbiAgICAgICAgICBzZWNvbmRzOiBkZWZhdWx0U2Vjb25kcyxcbiAgICAgICAgICBob3VyVHlwZTogdGhpcy5nZXRIb3VyVHlwZShkZWZhdWx0SG91cnMpXG4gICAgICAgIH0sXG4gICAgICAgIHNwZWNpZmljV2Vla0RheToge1xuICAgICAgICAgIG1vbnRoV2VlazogJyMxJyxcbiAgICAgICAgICBkYXk6ICdNT04nLFxuICAgICAgICAgIHN0YXJ0TW9udGg6IDEsXG4gICAgICAgICAgbW9udGhzOiAxLFxuICAgICAgICAgIGhvdXJzOiB0aGlzLmdldEFtUG1Ib3VyKGRlZmF1bHRIb3VycyksXG4gICAgICAgICAgbWludXRlczogZGVmYXVsdE1pbnV0ZXMsXG4gICAgICAgICAgc2Vjb25kczogZGVmYXVsdFNlY29uZHMsXG4gICAgICAgICAgaG91clR5cGU6IHRoaXMuZ2V0SG91clR5cGUoZGVmYXVsdEhvdXJzKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgeWVhcmx5OiB7XG4gICAgICAgIHN1YlRhYjogJ3NwZWNpZmljTW9udGhEYXknLFxuICAgICAgICBydW5PbldlZWtkYXk6IGZhbHNlLFxuICAgICAgICBzcGVjaWZpY01vbnRoRGF5OiB7XG4gICAgICAgICAgbW9udGg6IDEsXG4gICAgICAgICAgZGF5OiAnMScsXG4gICAgICAgICAgaG91cnM6IHRoaXMuZ2V0QW1QbUhvdXIoZGVmYXVsdEhvdXJzKSxcbiAgICAgICAgICBtaW51dGVzOiBkZWZhdWx0TWludXRlcyxcbiAgICAgICAgICBzZWNvbmRzOiBkZWZhdWx0U2Vjb25kcyxcbiAgICAgICAgICBob3VyVHlwZTogdGhpcy5nZXRIb3VyVHlwZShkZWZhdWx0SG91cnMpXG4gICAgICAgIH0sXG4gICAgICAgIHNwZWNpZmljTW9udGhXZWVrOiB7XG4gICAgICAgICAgbW9udGhXZWVrOiAnIzEnLFxuICAgICAgICAgIGRheTogJ01PTicsXG4gICAgICAgICAgbW9udGg6IDEsXG4gICAgICAgICAgaG91cnM6IHRoaXMuZ2V0QW1QbUhvdXIoZGVmYXVsdEhvdXJzKSxcbiAgICAgICAgICBtaW51dGVzOiBkZWZhdWx0TWludXRlcyxcbiAgICAgICAgICBzZWNvbmRzOiBkZWZhdWx0U2Vjb25kcyxcbiAgICAgICAgICBob3VyVHlwZTogdGhpcy5nZXRIb3VyVHlwZShkZWZhdWx0SG91cnMpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBhZHZhbmNlZDoge1xuICAgICAgICBleHByZXNzaW9uOiB0aGlzLmdldERlZmF1bHRBZHZhbmNlZENyb25FeHByZXNzaW9uKClcbiAgICAgIH0sXG4gICAgICB2YWxpZGF0aW9uOiB7XG4gICAgICAgIGlzVmFsaWQ6IHRydWUsXG4gICAgICAgIGVycm9yTWVzc2FnZTogJydcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRPcmRpbmFsU3VmZml4KHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodmFsdWUubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3Qgc2Vjb25kVG9MYXN0RGlnaXQgPSB2YWx1ZS5jaGFyQXQodmFsdWUubGVuZ3RoIC0gMik7XG4gICAgICBpZiAoc2Vjb25kVG9MYXN0RGlnaXQgPT09ICcxJykge1xuICAgICAgICByZXR1cm4gJ3RoJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBsYXN0RGlnaXQgPSB2YWx1ZS5jaGFyQXQodmFsdWUubGVuZ3RoIC0gMSk7XG4gICAgc3dpdGNoIChsYXN0RGlnaXQpIHtcbiAgICAgIGNhc2UgJzEnOlxuICAgICAgICByZXR1cm4gJ3N0JztcbiAgICAgIGNhc2UgJzInOlxuICAgICAgICByZXR1cm4gJ25kJztcbiAgICAgIGNhc2UgJzMnOlxuICAgICAgICByZXR1cm4gJ3JkJztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAndGgnO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0U2VsZWN0T3B0aW9ucygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbW9udGhzOiBVdGlscy5nZXRSYW5nZSgxLCAxMiksXG4gICAgICBtb250aFdlZWtzOiBbJyMxJywgJyMyJywgJyMzJywgJyM0JywgJyM1JywgJ0wnXSxcbiAgICAgIGRheXM6IFsnTU9OJywgJ1RVRScsICdXRUQnLCAnVEhVJywgJ0ZSSScsICdTQVQnLCAnU1VOJ10sXG4gICAgICBtaW51dGVzOiBVdGlscy5nZXRSYW5nZSgwLCA1OSksXG4gICAgICBmdWxsTWludXRlczogVXRpbHMuZ2V0UmFuZ2UoMCwgNTkpLFxuICAgICAgc2Vjb25kczogVXRpbHMuZ2V0UmFuZ2UoMCwgNTkpLFxuICAgICAgaG91cnM6IFV0aWxzLmdldFJhbmdlKDEsIDIzKSxcbiAgICAgIG1vbnRoRGF5czogVXRpbHMuZ2V0UmFuZ2UoMSwgMzEpLFxuICAgICAgbW9udGhEYXlzV2l0aExhc3RzOiBbLi4uVXRpbHMuZ2V0UmFuZ2UoMSwgMzEpLm1hcChTdHJpbmcpLCAnTCddLFxuICAgICAgaG91clR5cGVzOiBbJ0FNJywgJ1BNJ11cbiAgICB9O1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nyb24tdGltZS1waWNrZXIyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RpbWUtcGlja2VyL3RpbWUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGltZS1waWNrZXIvdGltZS1waWNrZXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVQaWNrZXJDb21wb25lbnQyIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQE91dHB1dCgpIHB1YmxpYyBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBJbnB1dCgpIHB1YmxpYyBkaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgcHVibGljIHRpbWU6IGFueTtcbiAgQElucHV0KCkgcHVibGljIHNlbGVjdENsYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyB1c2UyNEhvdXJUaW1lOiBib29sZWFuO1xuICBASW5wdXQoKSBwdWJsaWMgaGlkZVNlY29uZHM6IGJvb2xlYW47XG5cbiAgcHVibGljIGhvdXJzOiBudW1iZXJbXTtcbiAgcHVibGljIG1pbnV0ZXM6IG51bWJlcltdO1xuICBwdWJsaWMgc2Vjb25kczogbnVtYmVyW107XG4gIHB1YmxpYyBob3VyVHlwZXM6IHN0cmluZ1tdO1xuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmhvdXJzID0gdGhpcy51c2UyNEhvdXJUaW1lID8gVXRpbHMuZ2V0UmFuZ2UoMCwgMjMpIDogVXRpbHMuZ2V0UmFuZ2UoMCwgMTIpO1xuICAgIHRoaXMubWludXRlcyA9IFV0aWxzLmdldFJhbmdlKDAsIDU5KTtcbiAgICB0aGlzLnNlY29uZHMgPSBVdGlscy5nZXRSYW5nZSgwLCA1OSk7XG4gICAgdGhpcy5ob3VyVHlwZXMgPSBbJ0FNJywgJ1BNJ107XG4gIH1cbn1cbiJdfQ==