/**
 * @fileoverview added by tsickle
 * Generated from: lib/cron-editor.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Days, MonthWeeks, Months } from './enums';
import Utils from './Utils';
var CronEditorComponent = /** @class */ (function () {
    function CronEditorComponent() {
        // the name is an Angular convention, @Input variable name + "Change" suffix
        this.cronChange = new EventEmitter();
        this.selectOptions = this.getSelectOptions();
    }
    Object.defineProperty(CronEditorComponent.prototype, "cron", {
        get: /**
         * @return {?}
         */
        function () { return this.localCron; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.localCron = value;
            this.cronChange.emit(this.localCron);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CronEditorComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.options.removeSeconds) {
            this.options.hideSeconds = true;
        }
        this.state = this.getDefaultState();
        this.handleModelChange(this.cron);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    CronEditorComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var newCron = changes['cron'];
        if (newCron && !newCron.firstChange) {
            this.handleModelChange(this.cron);
        }
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    CronEditorComponent.prototype.setActiveTab = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        if (!this.disabled) {
            this.activeTab = tab;
            this.regenerateCron();
        }
    };
    /**
     * @param {?} day
     * @return {?}
     */
    CronEditorComponent.prototype.dayDisplay = /**
     * @param {?} day
     * @return {?}
     */
    function (day) {
        return Days[day];
    };
    /**
     * @param {?} monthWeekNumber
     * @return {?}
     */
    CronEditorComponent.prototype.monthWeekDisplay = /**
     * @param {?} monthWeekNumber
     * @return {?}
     */
    function (monthWeekNumber) {
        return MonthWeeks[monthWeekNumber];
    };
    /**
     * @param {?} month
     * @return {?}
     */
    CronEditorComponent.prototype.monthDisplay = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
        return Months[month];
    };
    /**
     * @param {?} month
     * @return {?}
     */
    CronEditorComponent.prototype.monthDayDisplay = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
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
            return "" + month + this.getOrdinalSuffix(month) + " day";
        }
    };
    /**
     * @return {?}
     */
    CronEditorComponent.prototype.regenerateCron = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.isDirty = true;
        switch (this.activeTab) {
            case 'minutes':
                this.cron = "0/" + this.state.minutes.minutes + " * 1/1 * ?";
                if (!this.options.removeSeconds) {
                    this.cron = this.state.minutes.seconds + " " + this.cron;
                }
                if (!this.options.removeYears) {
                    this.cron = this.cron + " *";
                }
                break;
            case 'hourly':
                this.cron = this.state.hourly.minutes + " 0/" + this.state.hourly.hours + " 1/1 * ?";
                if (!this.options.removeSeconds) {
                    this.cron = this.state.hourly.seconds + " " + this.cron;
                }
                if (!this.options.removeYears) {
                    this.cron = this.cron + " *";
                }
                break;
            case 'daily':
                switch (this.state.daily.subTab) {
                    case 'everyDays':
                        // tslint:disable-next-line:max-line-length
                        this.cron = this.state.daily.everyDays.minutes + " " + this.hourToCron(this.state.daily.everyDays.hours, this.state.daily.everyDays.hourType) + " 1/" + this.state.daily.everyDays.days + " * ?";
                        if (!this.options.removeSeconds) {
                            this.cron = this.state.daily.everyDays.seconds + " " + this.cron;
                        }
                        if (!this.options.removeYears) {
                            this.cron = this.cron + " *";
                        }
                        break;
                    case 'everyWeekDay':
                        // tslint:disable-next-line:max-line-length
                        this.cron = this.state.daily.everyWeekDay.minutes + " " + this.hourToCron(this.state.daily.everyWeekDay.hours, this.state.daily.everyWeekDay.hourType) + " ? * MON-FRI";
                        if (!this.options.removeSeconds) {
                            this.cron = this.state.daily.everyWeekDay.seconds + " " + this.cron;
                        }
                        if (!this.options.removeYears) {
                            this.cron = this.cron + " *";
                        }
                        break;
                    default:
                        throw new Error('Invalid cron daily subtab selection');
                }
                break;
            case 'weekly':
                /** @type {?} */
                var days = this.selectOptions.days
                    .reduce((/**
                 * @param {?} acc
                 * @param {?} day
                 * @return {?}
                 */
                function (acc, day) { return _this.state.weekly[day] ? acc.concat([day]) : acc; }), [])
                    .join(',');
                this.cron = this.state.weekly.minutes + " " + this.hourToCron(this.state.weekly.hours, this.state.weekly.hourType) + " ? * " + days;
                if (!this.options.removeSeconds) {
                    this.cron = this.state.weekly.seconds + " " + this.cron;
                }
                if (!this.options.removeYears) {
                    this.cron = this.cron + " *";
                }
                break;
            case 'monthly':
                switch (this.state.monthly.subTab) {
                    case 'specificDay':
                        /** @type {?} */
                        var day = this.state.monthly.runOnWeekday ? this.state.monthly.specificDay.day + "W" : this.state.monthly.specificDay.day;
                        // tslint:disable-next-line:max-line-length
                        this.cron = this.state.monthly.specificDay.minutes + " " + this.hourToCron(this.state.monthly.specificDay.hours, this.state.monthly.specificDay.hourType) + " " + day + " 1/" + this.state.monthly.specificDay.months + " ?";
                        if (!this.options.removeSeconds) {
                            this.cron = this.state.monthly.specificDay.seconds + " " + this.cron;
                        }
                        if (!this.options.removeYears) {
                            this.cron = this.cron + " *";
                        }
                        break;
                    case 'specificWeekDay':
                        // tslint:disable-next-line:max-line-length
                        this.cron = this.state.monthly.specificWeekDay.minutes + " " + this.hourToCron(this.state.monthly.specificWeekDay.hours, this.state.monthly.specificWeekDay.hourType) + " ? " + this.state.monthly.specificWeekDay.startMonth + "/" + this.state.monthly.specificWeekDay.months + " " + this.state.monthly.specificWeekDay.day + this.state.monthly.specificWeekDay.monthWeek;
                        if (!this.options.removeSeconds) {
                            this.cron = this.state.monthly.specificWeekDay.seconds + " " + this.cron;
                        }
                        if (!this.options.removeYears) {
                            this.cron = this.cron + " *";
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
                        var day = this.state.yearly.runOnWeekday ? this.state.yearly.specificMonthDay.day + "W" : this.state.yearly.specificMonthDay.day;
                        // tslint:disable-next-line:max-line-length
                        this.cron = this.state.yearly.specificMonthDay.minutes + " " + this.hourToCron(this.state.yearly.specificMonthDay.hours, this.state.yearly.specificMonthDay.hourType) + " " + day + " " + this.state.yearly.specificMonthDay.month + " ?";
                        if (!this.options.removeSeconds) {
                            this.cron = this.state.yearly.specificMonthDay.seconds + " " + this.cron;
                        }
                        if (!this.options.removeYears) {
                            this.cron = this.cron + " *";
                        }
                        break;
                    case 'specificMonthWeek':
                        // tslint:disable-next-line:max-line-length
                        this.cron = this.state.yearly.specificMonthWeek.minutes + " " + this.hourToCron(this.state.yearly.specificMonthWeek.hours, this.state.yearly.specificMonthWeek.hourType) + " ? " + this.state.yearly.specificMonthWeek.month + " " + this.state.yearly.specificMonthWeek.day + this.state.yearly.specificMonthWeek.monthWeek;
                        if (!this.options.removeSeconds) {
                            this.cron = this.state.yearly.specificMonthWeek.seconds + " " + this.cron;
                        }
                        if (!this.options.removeYears) {
                            this.cron = this.cron + " *";
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
    };
    /**
     * @private
     * @param {?} hour
     * @return {?}
     */
    CronEditorComponent.prototype.getAmPmHour = /**
     * @private
     * @param {?} hour
     * @return {?}
     */
    function (hour) {
        return this.options.use24HourTime ? hour : (hour + 11) % 12 + 1;
    };
    /**
     * @private
     * @param {?} hour
     * @return {?}
     */
    CronEditorComponent.prototype.getHourType = /**
     * @private
     * @param {?} hour
     * @return {?}
     */
    function (hour) {
        return this.options.use24HourTime ? undefined : (hour >= 12 ? 'PM' : 'AM');
    };
    /**
     * @private
     * @param {?} hour
     * @param {?} hourType
     * @return {?}
     */
    CronEditorComponent.prototype.hourToCron = /**
     * @private
     * @param {?} hour
     * @param {?} hourType
     * @return {?}
     */
    function (hour, hourType) {
        if (this.options.use24HourTime) {
            return hour;
        }
        else {
            return hourType === 'AM' ? (hour === 12 ? 0 : hour) : (hour === 12 ? 12 : hour + 12);
        }
    };
    /**
     * @private
     * @param {?} cron
     * @return {?}
     */
    CronEditorComponent.prototype.handleModelChange = /**
     * @private
     * @param {?} cron
     * @return {?}
     */
    function (cron) {
        var _this = this;
        if (this.isDirty) {
            this.isDirty = false;
            return;
        }
        else {
            this.isDirty = false;
        }
        this.validate(cron);
        /** @type {?} */
        var cronSeven = cron;
        if (this.options.removeSeconds) {
            cronSeven = "0 " + cron;
        }
        if (this.options.removeYears) {
            cronSeven = cronSeven + " *";
        }
        var _a = tslib_1.__read(cronSeven.split(' '), 6), seconds = _a[0], minutes = _a[1], hours = _a[2], dayOfMonth = _a[3], month = _a[4], dayOfWeek = _a[5];
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
            var parsedHours = Number(hours);
            this.state.daily.everyDays.hours = this.getAmPmHour(parsedHours);
            this.state.daily.everyDays.hourType = this.getHourType(parsedHours);
            this.state.daily.everyDays.minutes = Number(minutes);
            this.state.daily.everyDays.seconds = Number(seconds);
        }
        else if (cronSeven.match(/\d+ \d+ \d+ \? \* MON-FRI \*/)) {
            this.activeTab = 'daily';
            this.state.daily.subTab = 'everyWeekDay';
            /** @type {?} */
            var parsedHours = Number(hours);
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
            function (weekDay) { return _this.state.weekly[weekDay] = false; }));
            dayOfWeek.split(',').forEach((/**
             * @param {?} weekDay
             * @return {?}
             */
            function (weekDay) { return _this.state.weekly[weekDay] = true; }));
            /** @type {?} */
            var parsedHours = Number(hours);
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
            var parsedHours = Number(hours);
            this.state.monthly.specificDay.hours = this.getAmPmHour(parsedHours);
            this.state.monthly.specificDay.hourType = this.getHourType(parsedHours);
            this.state.monthly.specificDay.minutes = Number(minutes);
            this.state.monthly.specificDay.seconds = Number(seconds);
        }
        else if (cronSeven.match(/\d+ \d+ \d+ \? \d+\/\d+ (MON|TUE|WED|THU|FRI|SAT|SUN)((#[1-5])|L) \*/)) {
            /** @type {?} */
            var day = dayOfWeek.substr(0, 3);
            /** @type {?} */
            var monthWeek = dayOfWeek.substr(3);
            this.activeTab = 'monthly';
            this.state.monthly.subTab = 'specificWeekDay';
            this.state.monthly.specificWeekDay.monthWeek = monthWeek;
            this.state.monthly.specificWeekDay.day = day;
            if (month.indexOf('/') !== -1) {
                var _b = tslib_1.__read(month.split('/').map(Number), 2), startMonth = _b[0], months = _b[1];
                this.state.monthly.specificWeekDay.months = months;
                this.state.monthly.specificWeekDay.startMonth = startMonth;
            }
            /** @type {?} */
            var parsedHours = Number(hours);
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
            var parsedHours = Number(hours);
            this.state.yearly.specificMonthDay.hours = this.getAmPmHour(parsedHours);
            this.state.yearly.specificMonthDay.hourType = this.getHourType(parsedHours);
            this.state.yearly.specificMonthDay.minutes = Number(minutes);
            this.state.yearly.specificMonthDay.seconds = Number(seconds);
        }
        else if (cronSeven.match(/\d+ \d+ \d+ \? \d+ (MON|TUE|WED|THU|FRI|SAT|SUN)((#[1-5])|L) \*/)) {
            /** @type {?} */
            var day = dayOfWeek.substr(0, 3);
            /** @type {?} */
            var monthWeek = dayOfWeek.substr(3);
            this.activeTab = 'yearly';
            this.state.yearly.subTab = 'specificMonthWeek';
            this.state.yearly.specificMonthWeek.monthWeek = monthWeek;
            this.state.yearly.specificMonthWeek.day = day;
            this.state.yearly.specificMonthWeek.month = Number(month);
            /** @type {?} */
            var parsedHours = Number(hours);
            this.state.yearly.specificMonthWeek.hours = this.getAmPmHour(parsedHours);
            this.state.yearly.specificMonthWeek.hourType = this.getHourType(parsedHours);
            this.state.yearly.specificMonthWeek.minutes = Number(minutes);
            this.state.yearly.specificMonthWeek.seconds = Number(seconds);
        }
        else {
            this.activeTab = 'advanced';
            this.state.advanced.expression = cron;
        }
    };
    /**
     * @private
     * @param {?} cron
     * @return {?}
     */
    CronEditorComponent.prototype.validate = /**
     * @private
     * @param {?} cron
     * @return {?}
     */
    function (cron) {
        this.state.validation.isValid = false;
        this.state.validation.errorMessage = '';
        if (!cron) {
            this.state.validation.errorMessage = 'Cron expression cannot be null';
            return;
        }
        /** @type {?} */
        var cronParts = cron.split(' ');
        /** @type {?} */
        var expected = 5;
        if (!this.options.removeSeconds) {
            expected++;
        }
        if (!this.options.removeYears) {
            expected++;
        }
        if (cronParts.length !== expected) {
            this.state.validation.errorMessage = "Invalid cron expression, there must be " + expected + " segments";
            return;
        }
        this.state.validation.isValid = true;
        return;
    };
    /**
     * @private
     * @return {?}
     */
    CronEditorComponent.prototype.getDefaultAdvancedCronExpression = /**
     * @private
     * @return {?}
     */
    function () {
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
    };
    /**
     * @private
     * @return {?}
     */
    CronEditorComponent.prototype.getDefaultState = /**
     * @private
     * @return {?}
     */
    function () {
        var _a = tslib_1.__read(this.options.defaultTime.split(':').map(Number), 3), defaultHours = _a[0], defaultMinutes = _a[1], defaultSeconds = _a[2];
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
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    CronEditorComponent.prototype.getOrdinalSuffix = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value.length > 1) {
            /** @type {?} */
            var secondToLastDigit = value.charAt(value.length - 2);
            if (secondToLastDigit === '1') {
                return 'th';
            }
        }
        /** @type {?} */
        var lastDigit = value.charAt(value.length - 1);
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
    };
    /**
     * @private
     * @return {?}
     */
    CronEditorComponent.prototype.getSelectOptions = /**
     * @private
     * @return {?}
     */
    function () {
        return {
            months: Utils.getRange(1, 12),
            monthWeeks: ['#1', '#2', '#3', '#4', '#5', 'L'],
            days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
            minutes: Utils.getRange(0, 59),
            fullMinutes: Utils.getRange(0, 59),
            seconds: Utils.getRange(0, 59),
            hours: Utils.getRange(1, 23),
            monthDays: Utils.getRange(1, 31),
            monthDaysWithLasts: tslib_1.__spread(Utils.getRange(1, 31).map(String), ['L']),
            hourTypes: ['AM', 'PM']
        };
    };
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
    return CronEditorComponent;
}());
export { CronEditorComponent };
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
var TimePickerComponent2 = /** @class */ (function () {
    function TimePickerComponent2() {
        this.change = new EventEmitter();
    }
    /**
     * @return {?}
     */
    TimePickerComponent2.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.hours = this.use24HourTime ? Utils.getRange(0, 23) : Utils.getRange(0, 12);
        this.minutes = Utils.getRange(0, 59);
        this.seconds = Utils.getRange(0, 59);
        this.hourTypes = ['AM', 'PM'];
    };
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
    return TimePickerComponent2;
}());
export { TimePickerComponent2 };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Jvbi1lZGl0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vY3Jvbi1lZGl0b3IvIiwic291cmNlcyI6WyJsaWIvY3Jvbi1lZGl0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBR3pHLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNuRCxPQUFPLEtBQUssTUFBTSxTQUFTLENBQUM7QUFFNUI7SUFBQTs7UUFnQlksZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFHbkMsa0JBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQXVnQmpELENBQUM7SUFqaEJDLHNCQUFhLHFDQUFJOzs7O1FBQWpCLGNBQThCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQ3RELFVBQVMsS0FBYTtZQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkMsQ0FBQzs7O09BSnFEOzs7O0lBZ0IvQyxzQ0FBUTs7O0lBQWY7UUFDRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFO1lBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUNqQztRQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXBDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFTSx5Q0FBVzs7OztJQUFsQixVQUFtQixPQUFzQjs7WUFDakMsT0FB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QztJQWtCL0MsQ0FBQzs7OztJQU5RLHVDQUFROzs7SUFBZjtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7O2dCQXZCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsaWtDQUF1RDs7aUJBRXhEOzs7eUJBRUUsTUFBTTsyQkFDTixLQUFLO3VCQUNMLEtBQUs7OEJBQ0wsS0FBSztnQ0FDTCxLQUFLOzhCQUNMLEtBQUs7O0lBYVIsMkJBQUM7Q0FBQSxBQXhCRCxJQXdCQztTQW5CWSxvQkFBb0I7OztJQUMvQixzQ0FBNkM7O0lBQzdDLHdDQUFrQzs7SUFDbEMsb0NBQTBCOztJQUMxQiwyQ0FBb0M7O0lBQ3BDLDZDQUF1Qzs7SUFDdkMsMkNBQXFDOztJQUVyQyxxQ0FBdUI7O0lBQ3ZCLHVDQUF5Qjs7SUFDekIsdUNBQXlCOztJQUN6Qix5Q0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBTaW1wbGVDaGFuZ2VzLCBPbkNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENyb25PcHRpb25zIH0gZnJvbSAnLi9Dcm9uT3B0aW9ucyc7XG5cbmltcG9ydCB7IERheXMsIE1vbnRoV2Vla3MsIE1vbnRocyB9IGZyb20gJy4vZW51bXMnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vVXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjcm9uLWVkaXRvcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jcm9uLWVkaXRvci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Nyb24tZWRpdG9yLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDcm9uRWRpdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBwdWJsaWMgZGlzYWJsZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHB1YmxpYyBvcHRpb25zOiBDcm9uT3B0aW9ucztcblxuICBASW5wdXQoKSBnZXQgY3JvbigpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5sb2NhbENyb247IH1cbiAgc2V0IGNyb24odmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMubG9jYWxDcm9uID0gdmFsdWU7XG4gICAgdGhpcy5jcm9uQ2hhbmdlLmVtaXQodGhpcy5sb2NhbENyb24pO1xuICB9XG5cbiAgLy8gdGhlIG5hbWUgaXMgYW4gQW5ndWxhciBjb252ZW50aW9uLCBASW5wdXQgdmFyaWFibGUgbmFtZSArIFwiQ2hhbmdlXCIgc3VmZml4XG4gIEBPdXRwdXQoKSBjcm9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBhY3RpdmVUYWI6IHN0cmluZztcbiAgcHVibGljIHNlbGVjdE9wdGlvbnMgPSB0aGlzLmdldFNlbGVjdE9wdGlvbnMoKTtcbiAgcHVibGljIHN0YXRlOiBhbnk7XG5cbiAgcHJpdmF0ZSBsb2NhbENyb246IHN0cmluZztcbiAgcHJpdmF0ZSBpc0RpcnR5OiBib29sZWFuO1xuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnJlbW92ZVNlY29uZHMpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5oaWRlU2Vjb25kcyA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZSA9IHRoaXMuZ2V0RGVmYXVsdFN0YXRlKCk7XG5cbiAgICB0aGlzLmhhbmRsZU1vZGVsQ2hhbmdlKHRoaXMuY3Jvbik7XG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGNvbnN0IG5ld0Nyb24gPSBjaGFuZ2VzWydjcm9uJ107XG4gICAgaWYgKG5ld0Nyb24gJiYgIW5ld0Nyb24uZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHRoaXMuaGFuZGxlTW9kZWxDaGFuZ2UodGhpcy5jcm9uKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0QWN0aXZlVGFiKHRhYjogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9IHRhYjtcbiAgICAgIHRoaXMucmVnZW5lcmF0ZUNyb24oKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZGF5RGlzcGxheShkYXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIERheXNbZGF5XTtcbiAgfVxuXG4gIHB1YmxpYyBtb250aFdlZWtEaXNwbGF5KG1vbnRoV2Vla051bWJlcjogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTW9udGhXZWVrc1ttb250aFdlZWtOdW1iZXJdO1xuICB9XG5cbiAgcHVibGljIG1vbnRoRGlzcGxheShtb250aDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTW9udGhzW21vbnRoXTtcbiAgfVxuXG4gIHB1YmxpYyBtb250aERheURpc3BsYXkobW9udGg6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKG1vbnRoID09PSAnTCcpIHtcbiAgICAgIHJldHVybiAnTGFzdCBEYXknO1xuICAgIH0gZWxzZSBpZiAobW9udGggPT09ICdMVycpIHtcbiAgICAgIHJldHVybiAnTGFzdCBXZWVrZGF5JztcbiAgICB9IGVsc2UgaWYgKG1vbnRoID09PSAnMVcnKSB7XG4gICAgICByZXR1cm4gJ0ZpcnN0IFdlZWtkYXknO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCR7bW9udGh9JHt0aGlzLmdldE9yZGluYWxTdWZmaXgobW9udGgpfSBkYXlgO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZWdlbmVyYXRlQ3JvbigpIHtcbiAgICB0aGlzLmlzRGlydHkgPSB0cnVlO1xuXG4gICAgc3dpdGNoICh0aGlzLmFjdGl2ZVRhYikge1xuICAgICAgY2FzZSAnbWludXRlcyc6XG4gICAgICAgIHRoaXMuY3JvbiA9IGAwLyR7dGhpcy5zdGF0ZS5taW51dGVzLm1pbnV0ZXN9ICogMS8xICogP2A7XG5cbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucmVtb3ZlU2Vjb25kcykge1xuICAgICAgICAgIHRoaXMuY3JvbiA9IGAke3RoaXMuc3RhdGUubWludXRlcy5zZWNvbmRzfSAke3RoaXMuY3Jvbn1gO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucmVtb3ZlWWVhcnMpIHtcbiAgICAgICAgICB0aGlzLmNyb24gPSBgJHt0aGlzLmNyb259ICpgO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnaG91cmx5JzpcbiAgICAgICAgdGhpcy5jcm9uID0gYCR7dGhpcy5zdGF0ZS5ob3VybHkubWludXRlc30gMC8ke3RoaXMuc3RhdGUuaG91cmx5LmhvdXJzfSAxLzEgKiA/YDtcblxuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5yZW1vdmVTZWNvbmRzKSB7XG4gICAgICAgICAgdGhpcy5jcm9uID0gYCR7dGhpcy5zdGF0ZS5ob3VybHkuc2Vjb25kc30gJHt0aGlzLmNyb259YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLnJlbW92ZVllYXJzKSB7XG4gICAgICAgICAgdGhpcy5jcm9uID0gYCR7dGhpcy5jcm9ufSAqYDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2RhaWx5JzpcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlLmRhaWx5LnN1YlRhYikge1xuICAgICAgICAgIGNhc2UgJ2V2ZXJ5RGF5cyc6XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICAgICB0aGlzLmNyb24gPSBgJHt0aGlzLnN0YXRlLmRhaWx5LmV2ZXJ5RGF5cy5taW51dGVzfSAke3RoaXMuaG91clRvQ3Jvbih0aGlzLnN0YXRlLmRhaWx5LmV2ZXJ5RGF5cy5ob3VycywgdGhpcy5zdGF0ZS5kYWlseS5ldmVyeURheXMuaG91clR5cGUpfSAxLyR7dGhpcy5zdGF0ZS5kYWlseS5ldmVyeURheXMuZGF5c30gKiA/YDtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucmVtb3ZlU2Vjb25kcykge1xuICAgICAgICAgICAgICB0aGlzLmNyb24gPSBgJHt0aGlzLnN0YXRlLmRhaWx5LmV2ZXJ5RGF5cy5zZWNvbmRzfSAke3RoaXMuY3Jvbn1gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5yZW1vdmVZZWFycykge1xuICAgICAgICAgICAgICB0aGlzLmNyb24gPSBgJHt0aGlzLmNyb259ICpgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZXZlcnlXZWVrRGF5JzpcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICAgIHRoaXMuY3JvbiA9IGAke3RoaXMuc3RhdGUuZGFpbHkuZXZlcnlXZWVrRGF5Lm1pbnV0ZXN9ICR7dGhpcy5ob3VyVG9Dcm9uKHRoaXMuc3RhdGUuZGFpbHkuZXZlcnlXZWVrRGF5LmhvdXJzLCB0aGlzLnN0YXRlLmRhaWx5LmV2ZXJ5V2Vla0RheS5ob3VyVHlwZSl9ID8gKiBNT04tRlJJYDtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucmVtb3ZlU2Vjb25kcykge1xuICAgICAgICAgICAgICB0aGlzLmNyb24gPSBgJHt0aGlzLnN0YXRlLmRhaWx5LmV2ZXJ5V2Vla0RheS5zZWNvbmRzfSAke3RoaXMuY3Jvbn1gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5yZW1vdmVZZWFycykge1xuICAgICAgICAgICAgICB0aGlzLmNyb24gPSBgJHt0aGlzLmNyb259ICpgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjcm9uIGRhaWx5IHN1YnRhYiBzZWxlY3Rpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3dlZWtseSc6XG4gICAgICAgIGNvbnN0IGRheXMgPSB0aGlzLnNlbGVjdE9wdGlvbnMuZGF5c1xuICAgICAgICAgIC5yZWR1Y2UoKGFjYywgZGF5KSA9PiB0aGlzLnN0YXRlLndlZWtseVtkYXldID8gYWNjLmNvbmNhdChbZGF5XSkgOiBhY2MsIFtdKVxuICAgICAgICAgIC5qb2luKCcsJyk7XG4gICAgICAgIHRoaXMuY3JvbiA9IGAke3RoaXMuc3RhdGUud2Vla2x5Lm1pbnV0ZXN9ICR7dGhpcy5ob3VyVG9Dcm9uKHRoaXMuc3RhdGUud2Vla2x5LmhvdXJzLCB0aGlzLnN0YXRlLndlZWtseS5ob3VyVHlwZSl9ID8gKiAke2RheXN9YDtcblxuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5yZW1vdmVTZWNvbmRzKSB7XG4gICAgICAgICAgdGhpcy5jcm9uID0gYCR7dGhpcy5zdGF0ZS53ZWVrbHkuc2Vjb25kc30gJHt0aGlzLmNyb259YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLnJlbW92ZVllYXJzKSB7XG4gICAgICAgICAgdGhpcy5jcm9uID0gYCR7dGhpcy5jcm9ufSAqYDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21vbnRobHknOlxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUubW9udGhseS5zdWJUYWIpIHtcbiAgICAgICAgICBjYXNlICdzcGVjaWZpY0RheSc6XG4gICAgICAgICAgICBjb25zdCBkYXkgPSB0aGlzLnN0YXRlLm1vbnRobHkucnVuT25XZWVrZGF5ID8gYCR7dGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljRGF5LmRheX1XYCA6IHRoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY0RheS5kYXk7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICAgICB0aGlzLmNyb24gPSBgJHt0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNEYXkubWludXRlc30gJHt0aGlzLmhvdXJUb0Nyb24odGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljRGF5LmhvdXJzLCB0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNEYXkuaG91clR5cGUpfSAke2RheX0gMS8ke3RoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY0RheS5tb250aHN9ID9gO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5yZW1vdmVTZWNvbmRzKSB7XG4gICAgICAgICAgICAgIHRoaXMuY3JvbiA9IGAke3RoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY0RheS5zZWNvbmRzfSAke3RoaXMuY3Jvbn1gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5yZW1vdmVZZWFycykge1xuICAgICAgICAgICAgICB0aGlzLmNyb24gPSBgJHt0aGlzLmNyb259ICpgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc3BlY2lmaWNXZWVrRGF5JzpcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgICAgICAgIHRoaXMuY3JvbiA9IGAke3RoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY1dlZWtEYXkubWludXRlc30gJHt0aGlzLmhvdXJUb0Nyb24odGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljV2Vla0RheS5ob3VycywgdGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljV2Vla0RheS5ob3VyVHlwZSl9ID8gJHt0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNXZWVrRGF5LnN0YXJ0TW9udGh9LyR7dGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljV2Vla0RheS5tb250aHN9ICR7dGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljV2Vla0RheS5kYXl9JHt0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNXZWVrRGF5Lm1vbnRoV2Vla31gO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5yZW1vdmVTZWNvbmRzKSB7XG4gICAgICAgICAgICAgIHRoaXMuY3JvbiA9IGAke3RoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY1dlZWtEYXkuc2Vjb25kc30gJHt0aGlzLmNyb259YDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucmVtb3ZlWWVhcnMpIHtcbiAgICAgICAgICAgICAgdGhpcy5jcm9uID0gYCR7dGhpcy5jcm9ufSAqYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY3JvbiBtb250aGx5IHN1YnRhYiBzZWxlY3Rpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3llYXJseSc6XG4gICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZS55ZWFybHkuc3ViVGFiKSB7XG4gICAgICAgICAgY2FzZSAnc3BlY2lmaWNNb250aERheSc6XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgICAgICBjb25zdCBkYXkgPSB0aGlzLnN0YXRlLnllYXJseS5ydW5PbldlZWtkYXkgPyBgJHt0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoRGF5LmRheX1XYCA6IHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhEYXkuZGF5O1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgICAgICAgdGhpcy5jcm9uID0gYCR7dGhpcy5zdGF0ZS55ZWFybHkuc3BlY2lmaWNNb250aERheS5taW51dGVzfSAke3RoaXMuaG91clRvQ3Jvbih0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoRGF5LmhvdXJzLCB0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoRGF5LmhvdXJUeXBlKX0gJHtkYXl9ICR7dGhpcy5zdGF0ZS55ZWFybHkuc3BlY2lmaWNNb250aERheS5tb250aH0gP2A7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLnJlbW92ZVNlY29uZHMpIHtcbiAgICAgICAgICAgICAgdGhpcy5jcm9uID0gYCR7dGhpcy5zdGF0ZS55ZWFybHkuc3BlY2lmaWNNb250aERheS5zZWNvbmRzfSAke3RoaXMuY3Jvbn1gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5yZW1vdmVZZWFycykge1xuICAgICAgICAgICAgICB0aGlzLmNyb24gPSBgJHt0aGlzLmNyb259ICpgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc3BlY2lmaWNNb250aFdlZWsnOlxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgICAgICAgdGhpcy5jcm9uID0gYCR7dGhpcy5zdGF0ZS55ZWFybHkuc3BlY2lmaWNNb250aFdlZWsubWludXRlc30gJHt0aGlzLmhvdXJUb0Nyb24odGhpcy5zdGF0ZS55ZWFybHkuc3BlY2lmaWNNb250aFdlZWsuaG91cnMsIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhXZWVrLmhvdXJUeXBlKX0gPyAke3RoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhXZWVrLm1vbnRofSAke3RoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhXZWVrLmRheX0ke3RoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhXZWVrLm1vbnRoV2Vla31gO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5yZW1vdmVTZWNvbmRzKSB7XG4gICAgICAgICAgICAgIHRoaXMuY3JvbiA9IGAke3RoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhXZWVrLnNlY29uZHN9ICR7dGhpcy5jcm9ufWA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5vcHRpb25zLnJlbW92ZVllYXJzKSB7XG4gICAgICAgICAgICAgIHRoaXMuY3JvbiA9IGAke3RoaXMuY3Jvbn0gKmA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNyb24geWVhcmx5IHN1YnRhYiBzZWxlY3Rpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2FkdmFuY2VkJzpcbiAgICAgICAgdGhpcy5jcm9uID0gdGhpcy5zdGF0ZS5hZHZhbmNlZC5leHByZXNzaW9uO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjcm9uIGFjdGl2ZSB0YWIgc2VsZWN0aW9uJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRBbVBtSG91cihob3VyOiBudW1iZXIpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnVzZTI0SG91clRpbWUgPyBob3VyIDogKGhvdXIgKyAxMSkgJSAxMiArIDE7XG4gIH1cblxuICBwcml2YXRlIGdldEhvdXJUeXBlKGhvdXI6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMudXNlMjRIb3VyVGltZSA/IHVuZGVmaW5lZCA6IChob3VyID49IDEyID8gJ1BNJyA6ICdBTScpO1xuICB9XG5cbiAgcHJpdmF0ZSBob3VyVG9Dcm9uKGhvdXI6IG51bWJlciwgaG91clR5cGU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLm9wdGlvbnMudXNlMjRIb3VyVGltZSkge1xuICAgICAgcmV0dXJuIGhvdXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBob3VyVHlwZSA9PT0gJ0FNJyA/IChob3VyID09PSAxMiA/IDAgOiBob3VyKSA6IChob3VyID09PSAxMiA/IDEyIDogaG91ciArIDEyKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZU1vZGVsQ2hhbmdlKGNyb246IHN0cmluZykge1xuICAgIGlmICh0aGlzLmlzRGlydHkpIHtcbiAgICAgIHRoaXMuaXNEaXJ0eSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzRGlydHkgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLnZhbGlkYXRlKGNyb24pO1xuXG4gICAgbGV0IGNyb25TZXZlbiA9IGNyb247XG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZW1vdmVTZWNvbmRzKSB7XG4gICAgICBjcm9uU2V2ZW4gPSBgMCAke2Nyb259YDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnJlbW92ZVllYXJzKSB7XG4gICAgICBjcm9uU2V2ZW4gPSBgJHtjcm9uU2V2ZW59ICpgO1xuICAgIH1cblxuICAgIGNvbnN0IFtzZWNvbmRzLCBtaW51dGVzLCBob3VycywgZGF5T2ZNb250aCwgbW9udGgsIGRheU9mV2Vla10gPSBjcm9uU2V2ZW4uc3BsaXQoJyAnKTtcblxuICAgIGlmIChjcm9uU2V2ZW4ubWF0Y2goL1xcZCsgMFxcL1xcZCsgXFwqIDFcXC8xIFxcKiBcXD8gXFwqLykpIHtcbiAgICAgIHRoaXMuYWN0aXZlVGFiID0gJ21pbnV0ZXMnO1xuXG4gICAgICB0aGlzLnN0YXRlLm1pbnV0ZXMubWludXRlcyA9IE51bWJlcihtaW51dGVzLnN1YnN0cmluZygyKSk7XG4gICAgICB0aGlzLnN0YXRlLm1pbnV0ZXMuc2Vjb25kcyA9IE51bWJlcihzZWNvbmRzKTtcbiAgICB9IGVsc2UgaWYgKGNyb25TZXZlbi5tYXRjaCgvXFxkKyBcXGQrIDBcXC9cXGQrIDFcXC8xIFxcKiBcXD8gXFwqLykpIHtcbiAgICAgIHRoaXMuYWN0aXZlVGFiID0gJ2hvdXJseSc7XG5cbiAgICAgIHRoaXMuc3RhdGUuaG91cmx5LmhvdXJzID0gTnVtYmVyKGhvdXJzLnN1YnN0cmluZygyKSk7XG4gICAgICB0aGlzLnN0YXRlLmhvdXJseS5taW51dGVzID0gTnVtYmVyKG1pbnV0ZXMpO1xuICAgICAgdGhpcy5zdGF0ZS5ob3VybHkuc2Vjb25kcyA9IE51bWJlcihzZWNvbmRzKTtcbiAgICB9IGVsc2UgaWYgKGNyb25TZXZlbi5tYXRjaCgvXFxkKyBcXGQrIFxcZCsgMVxcL1xcZCsgXFwqIFxcPyBcXCovKSkge1xuICAgICAgdGhpcy5hY3RpdmVUYWIgPSAnZGFpbHknO1xuXG4gICAgICB0aGlzLnN0YXRlLmRhaWx5LnN1YlRhYiA9ICdldmVyeURheXMnO1xuICAgICAgdGhpcy5zdGF0ZS5kYWlseS5ldmVyeURheXMuZGF5cyA9IE51bWJlcihkYXlPZk1vbnRoLnN1YnN0cmluZygyKSk7XG4gICAgICBjb25zdCBwYXJzZWRIb3VycyA9IE51bWJlcihob3Vycyk7XG4gICAgICB0aGlzLnN0YXRlLmRhaWx5LmV2ZXJ5RGF5cy5ob3VycyA9IHRoaXMuZ2V0QW1QbUhvdXIocGFyc2VkSG91cnMpO1xuICAgICAgdGhpcy5zdGF0ZS5kYWlseS5ldmVyeURheXMuaG91clR5cGUgPSB0aGlzLmdldEhvdXJUeXBlKHBhcnNlZEhvdXJzKTtcbiAgICAgIHRoaXMuc3RhdGUuZGFpbHkuZXZlcnlEYXlzLm1pbnV0ZXMgPSBOdW1iZXIobWludXRlcyk7XG4gICAgICB0aGlzLnN0YXRlLmRhaWx5LmV2ZXJ5RGF5cy5zZWNvbmRzID0gTnVtYmVyKHNlY29uZHMpO1xuICAgIH0gZWxzZSBpZiAoY3JvblNldmVuLm1hdGNoKC9cXGQrIFxcZCsgXFxkKyBcXD8gXFwqIE1PTi1GUkkgXFwqLykpIHtcbiAgICAgIHRoaXMuYWN0aXZlVGFiID0gJ2RhaWx5JztcblxuICAgICAgdGhpcy5zdGF0ZS5kYWlseS5zdWJUYWIgPSAnZXZlcnlXZWVrRGF5JztcbiAgICAgIGNvbnN0IHBhcnNlZEhvdXJzID0gTnVtYmVyKGhvdXJzKTtcbiAgICAgIHRoaXMuc3RhdGUuZGFpbHkuZXZlcnlXZWVrRGF5LmhvdXJzID0gdGhpcy5nZXRBbVBtSG91cihwYXJzZWRIb3Vycyk7XG4gICAgICB0aGlzLnN0YXRlLmRhaWx5LmV2ZXJ5V2Vla0RheS5ob3VyVHlwZSA9IHRoaXMuZ2V0SG91clR5cGUocGFyc2VkSG91cnMpO1xuICAgICAgdGhpcy5zdGF0ZS5kYWlseS5ldmVyeVdlZWtEYXkubWludXRlcyA9IE51bWJlcihtaW51dGVzKTtcbiAgICAgIHRoaXMuc3RhdGUuZGFpbHkuZXZlcnlXZWVrRGF5LnNlY29uZHMgPSBOdW1iZXIoc2Vjb25kcyk7XG4gICAgfSBlbHNlIGlmIChjcm9uU2V2ZW4ubWF0Y2goL1xcZCsgXFxkKyBcXGQrIFxcPyBcXCogKE1PTnxUVUV8V0VEfFRIVXxGUkl8U0FUfFNVTikoLChNT058VFVFfFdFRHxUSFV8RlJJfFNBVHxTVU4pKSogXFwqLykpIHtcbiAgICAgIHRoaXMuYWN0aXZlVGFiID0gJ3dlZWtseSc7XG4gICAgICB0aGlzLnNlbGVjdE9wdGlvbnMuZGF5cy5mb3JFYWNoKHdlZWtEYXkgPT4gdGhpcy5zdGF0ZS53ZWVrbHlbd2Vla0RheV0gPSBmYWxzZSk7XG4gICAgICBkYXlPZldlZWsuc3BsaXQoJywnKS5mb3JFYWNoKHdlZWtEYXkgPT4gdGhpcy5zdGF0ZS53ZWVrbHlbd2Vla0RheV0gPSB0cnVlKTtcbiAgICAgIGNvbnN0IHBhcnNlZEhvdXJzID0gTnVtYmVyKGhvdXJzKTtcbiAgICAgIHRoaXMuc3RhdGUud2Vla2x5LmhvdXJzID0gdGhpcy5nZXRBbVBtSG91cihwYXJzZWRIb3Vycyk7XG4gICAgICB0aGlzLnN0YXRlLndlZWtseS5ob3VyVHlwZSA9IHRoaXMuZ2V0SG91clR5cGUocGFyc2VkSG91cnMpO1xuICAgICAgdGhpcy5zdGF0ZS53ZWVrbHkubWludXRlcyA9IE51bWJlcihtaW51dGVzKTtcbiAgICAgIHRoaXMuc3RhdGUud2Vla2x5LnNlY29uZHMgPSBOdW1iZXIoc2Vjb25kcyk7XG4gICAgfSBlbHNlIGlmIChjcm9uU2V2ZW4ubWF0Y2goL1xcZCsgXFxkKyBcXGQrIChcXGQrfEx8TFd8MVcpIDFcXC9cXGQrIFxcPyBcXCovKSkge1xuICAgICAgdGhpcy5hY3RpdmVUYWIgPSAnbW9udGhseSc7XG4gICAgICB0aGlzLnN0YXRlLm1vbnRobHkuc3ViVGFiID0gJ3NwZWNpZmljRGF5JztcblxuICAgICAgaWYgKGRheU9mTW9udGguaW5kZXhPZignVycpICE9PSAtMSkge1xuICAgICAgICB0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNEYXkuZGF5ID0gZGF5T2ZNb250aC5jaGFyQXQoMCk7XG4gICAgICAgIHRoaXMuc3RhdGUubW9udGhseS5ydW5PbldlZWtkYXkgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljRGF5LmRheSA9IGRheU9mTW9udGg7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY0RheS5tb250aHMgPSBOdW1iZXIobW9udGguc3Vic3RyaW5nKDIpKTtcbiAgICAgIGNvbnN0IHBhcnNlZEhvdXJzID0gTnVtYmVyKGhvdXJzKTtcbiAgICAgIHRoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY0RheS5ob3VycyA9IHRoaXMuZ2V0QW1QbUhvdXIocGFyc2VkSG91cnMpO1xuICAgICAgdGhpcy5zdGF0ZS5tb250aGx5LnNwZWNpZmljRGF5LmhvdXJUeXBlID0gdGhpcy5nZXRIb3VyVHlwZShwYXJzZWRIb3Vycyk7XG4gICAgICB0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNEYXkubWludXRlcyA9IE51bWJlcihtaW51dGVzKTtcbiAgICAgIHRoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY0RheS5zZWNvbmRzID0gTnVtYmVyKHNlY29uZHMpO1xuICAgIH0gZWxzZSBpZiAoY3JvblNldmVuLm1hdGNoKC9cXGQrIFxcZCsgXFxkKyBcXD8gXFxkK1xcL1xcZCsgKE1PTnxUVUV8V0VEfFRIVXxGUkl8U0FUfFNVTikoKCNbMS01XSl8TCkgXFwqLykpIHtcbiAgICAgIGNvbnN0IGRheSA9IGRheU9mV2Vlay5zdWJzdHIoMCwgMyk7XG4gICAgICBjb25zdCBtb250aFdlZWsgPSBkYXlPZldlZWsuc3Vic3RyKDMpO1xuICAgICAgdGhpcy5hY3RpdmVUYWIgPSAnbW9udGhseSc7XG4gICAgICB0aGlzLnN0YXRlLm1vbnRobHkuc3ViVGFiID0gJ3NwZWNpZmljV2Vla0RheSc7XG4gICAgICB0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNXZWVrRGF5Lm1vbnRoV2VlayA9IG1vbnRoV2VlaztcbiAgICAgIHRoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY1dlZWtEYXkuZGF5ID0gZGF5O1xuXG4gICAgICBpZiAobW9udGguaW5kZXhPZignLycpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBbc3RhcnRNb250aCwgbW9udGhzXSA9IG1vbnRoLnNwbGl0KCcvJykubWFwKE51bWJlcik7XG4gICAgICAgIHRoaXMuc3RhdGUubW9udGhseS5zcGVjaWZpY1dlZWtEYXkubW9udGhzID0gbW9udGhzO1xuICAgICAgICB0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNXZWVrRGF5LnN0YXJ0TW9udGggPSBzdGFydE1vbnRoO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXJzZWRIb3VycyA9IE51bWJlcihob3Vycyk7XG4gICAgICB0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNXZWVrRGF5LmhvdXJzID0gdGhpcy5nZXRBbVBtSG91cihwYXJzZWRIb3Vycyk7XG4gICAgICB0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNXZWVrRGF5LmhvdXJUeXBlID0gdGhpcy5nZXRIb3VyVHlwZShwYXJzZWRIb3Vycyk7XG4gICAgICB0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNXZWVrRGF5Lm1pbnV0ZXMgPSBOdW1iZXIobWludXRlcyk7XG4gICAgICB0aGlzLnN0YXRlLm1vbnRobHkuc3BlY2lmaWNXZWVrRGF5LnNlY29uZHMgPSBOdW1iZXIoc2Vjb25kcyk7XG4gICAgfSBlbHNlIGlmIChjcm9uU2V2ZW4ubWF0Y2goL1xcZCsgXFxkKyBcXGQrIChcXGQrfEx8TFd8MVcpIFxcZCsgXFw/IFxcKi8pKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9ICd5ZWFybHknO1xuICAgICAgdGhpcy5zdGF0ZS55ZWFybHkuc3ViVGFiID0gJ3NwZWNpZmljTW9udGhEYXknO1xuICAgICAgdGhpcy5zdGF0ZS55ZWFybHkuc3BlY2lmaWNNb250aERheS5tb250aCA9IE51bWJlcihtb250aCk7XG5cbiAgICAgIGlmIChkYXlPZk1vbnRoLmluZGV4T2YoJ1cnKSAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5zdGF0ZS55ZWFybHkuc3BlY2lmaWNNb250aERheS5kYXkgPSBkYXlPZk1vbnRoLmNoYXJBdCgwKTtcbiAgICAgICAgdGhpcy5zdGF0ZS55ZWFybHkucnVuT25XZWVrZGF5ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhEYXkuZGF5ID0gZGF5T2ZNb250aDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFyc2VkSG91cnMgPSBOdW1iZXIoaG91cnMpO1xuICAgICAgdGhpcy5zdGF0ZS55ZWFybHkuc3BlY2lmaWNNb250aERheS5ob3VycyA9IHRoaXMuZ2V0QW1QbUhvdXIocGFyc2VkSG91cnMpO1xuICAgICAgdGhpcy5zdGF0ZS55ZWFybHkuc3BlY2lmaWNNb250aERheS5ob3VyVHlwZSA9IHRoaXMuZ2V0SG91clR5cGUocGFyc2VkSG91cnMpO1xuICAgICAgdGhpcy5zdGF0ZS55ZWFybHkuc3BlY2lmaWNNb250aERheS5taW51dGVzID0gTnVtYmVyKG1pbnV0ZXMpO1xuICAgICAgdGhpcy5zdGF0ZS55ZWFybHkuc3BlY2lmaWNNb250aERheS5zZWNvbmRzID0gTnVtYmVyKHNlY29uZHMpO1xuICAgIH0gZWxzZSBpZiAoY3JvblNldmVuLm1hdGNoKC9cXGQrIFxcZCsgXFxkKyBcXD8gXFxkKyAoTU9OfFRVRXxXRUR8VEhVfEZSSXxTQVR8U1VOKSgoI1sxLTVdKXxMKSBcXCovKSkge1xuICAgICAgY29uc3QgZGF5ID0gZGF5T2ZXZWVrLnN1YnN0cigwLCAzKTtcbiAgICAgIGNvbnN0IG1vbnRoV2VlayA9IGRheU9mV2Vlay5zdWJzdHIoMyk7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9ICd5ZWFybHknO1xuICAgICAgdGhpcy5zdGF0ZS55ZWFybHkuc3ViVGFiID0gJ3NwZWNpZmljTW9udGhXZWVrJztcbiAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhXZWVrLm1vbnRoV2VlayA9IG1vbnRoV2VlaztcbiAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhXZWVrLmRheSA9IGRheTtcbiAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhXZWVrLm1vbnRoID0gTnVtYmVyKG1vbnRoKTtcbiAgICAgIGNvbnN0IHBhcnNlZEhvdXJzID0gTnVtYmVyKGhvdXJzKTtcbiAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhXZWVrLmhvdXJzID0gdGhpcy5nZXRBbVBtSG91cihwYXJzZWRIb3Vycyk7XG4gICAgICB0aGlzLnN0YXRlLnllYXJseS5zcGVjaWZpY01vbnRoV2Vlay5ob3VyVHlwZSA9IHRoaXMuZ2V0SG91clR5cGUocGFyc2VkSG91cnMpO1xuICAgICAgdGhpcy5zdGF0ZS55ZWFybHkuc3BlY2lmaWNNb250aFdlZWsubWludXRlcyA9IE51bWJlcihtaW51dGVzKTtcbiAgICAgIHRoaXMuc3RhdGUueWVhcmx5LnNwZWNpZmljTW9udGhXZWVrLnNlY29uZHMgPSBOdW1iZXIoc2Vjb25kcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlVGFiID0gJ2FkdmFuY2VkJztcbiAgICAgIHRoaXMuc3RhdGUuYWR2YW5jZWQuZXhwcmVzc2lvbiA9IGNyb247XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZGF0ZShjcm9uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlLnZhbGlkYXRpb24uaXNWYWxpZCA9IGZhbHNlO1xuICAgIHRoaXMuc3RhdGUudmFsaWRhdGlvbi5lcnJvck1lc3NhZ2UgPSAnJztcblxuICAgIGlmICghY3Jvbikge1xuICAgICAgdGhpcy5zdGF0ZS52YWxpZGF0aW9uLmVycm9yTWVzc2FnZSA9ICdDcm9uIGV4cHJlc3Npb24gY2Fubm90IGJlIG51bGwnO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNyb25QYXJ0cyA9IGNyb24uc3BsaXQoJyAnKTtcblxuICAgIGxldCBleHBlY3RlZCA9IDU7XG5cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5yZW1vdmVTZWNvbmRzKSB7XG4gICAgICBleHBlY3RlZCsrO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vcHRpb25zLnJlbW92ZVllYXJzKSB7XG4gICAgICBleHBlY3RlZCsrO1xuICAgIH1cblxuICAgIGlmIChjcm9uUGFydHMubGVuZ3RoICE9PSBleHBlY3RlZCkge1xuICAgICAgdGhpcy5zdGF0ZS52YWxpZGF0aW9uLmVycm9yTWVzc2FnZSA9IGBJbnZhbGlkIGNyb24gZXhwcmVzc2lvbiwgdGhlcmUgbXVzdCBiZSAke2V4cGVjdGVkfSBzZWdtZW50c2A7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZS52YWxpZGF0aW9uLmlzVmFsaWQgPSB0cnVlO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGVmYXVsdEFkdmFuY2VkQ3JvbkV4cHJlc3Npb24oKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnJlbW92ZVNlY29uZHMgJiYgIXRoaXMub3B0aW9ucy5yZW1vdmVZZWFycykge1xuICAgICAgcmV0dXJuICcxNSAxMCBMLTIgKiA/IDIwMTknO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vcHRpb25zLnJlbW92ZVNlY29uZHMgJiYgdGhpcy5vcHRpb25zLnJlbW92ZVllYXJzKSB7XG4gICAgICByZXR1cm4gJzAgMTUgMTAgTC0yICogPyc7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZW1vdmVTZWNvbmRzICYmIHRoaXMub3B0aW9ucy5yZW1vdmVZZWFycykge1xuICAgICAgcmV0dXJuICcxNSAxMCBMLTIgKiA/JztcbiAgICB9XG5cbiAgICByZXR1cm4gJzAgMTUgMTAgTC0yICogPyAyMDE5JztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGVmYXVsdFN0YXRlKCkge1xuICAgIGNvbnN0IFtkZWZhdWx0SG91cnMsIGRlZmF1bHRNaW51dGVzLCBkZWZhdWx0U2Vjb25kc10gPSB0aGlzLm9wdGlvbnMuZGVmYXVsdFRpbWUuc3BsaXQoJzonKS5tYXAoTnVtYmVyKTtcblxuICAgIHJldHVybiB7XG4gICAgICBtaW51dGVzOiB7XG4gICAgICAgIG1pbnV0ZXM6IDEsXG4gICAgICAgIHNlY29uZHM6IDBcbiAgICAgIH0sXG4gICAgICBob3VybHk6IHtcbiAgICAgICAgaG91cnM6IDEsXG4gICAgICAgIG1pbnV0ZXM6IDAsXG4gICAgICAgIHNlY29uZHM6IDBcbiAgICAgIH0sXG4gICAgICBkYWlseToge1xuICAgICAgICBzdWJUYWI6ICdldmVyeURheXMnLFxuICAgICAgICBldmVyeURheXM6IHtcbiAgICAgICAgICBkYXlzOiAxLFxuICAgICAgICAgIGhvdXJzOiB0aGlzLmdldEFtUG1Ib3VyKGRlZmF1bHRIb3VycyksXG4gICAgICAgICAgbWludXRlczogZGVmYXVsdE1pbnV0ZXMsXG4gICAgICAgICAgc2Vjb25kczogZGVmYXVsdFNlY29uZHMsXG4gICAgICAgICAgaG91clR5cGU6IHRoaXMuZ2V0SG91clR5cGUoZGVmYXVsdEhvdXJzKVxuICAgICAgICB9LFxuICAgICAgICBldmVyeVdlZWtEYXk6IHtcbiAgICAgICAgICBob3VyczogdGhpcy5nZXRBbVBtSG91cihkZWZhdWx0SG91cnMpLFxuICAgICAgICAgIG1pbnV0ZXM6IGRlZmF1bHRNaW51dGVzLFxuICAgICAgICAgIHNlY29uZHM6IGRlZmF1bHRTZWNvbmRzLFxuICAgICAgICAgIGhvdXJUeXBlOiB0aGlzLmdldEhvdXJUeXBlKGRlZmF1bHRIb3VycylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHdlZWtseToge1xuICAgICAgICBNT046IHRydWUsXG4gICAgICAgIFRVRTogZmFsc2UsXG4gICAgICAgIFdFRDogZmFsc2UsXG4gICAgICAgIFRIVTogZmFsc2UsXG4gICAgICAgIEZSSTogZmFsc2UsXG4gICAgICAgIFNBVDogZmFsc2UsXG4gICAgICAgIFNVTjogZmFsc2UsXG4gICAgICAgIGhvdXJzOiB0aGlzLmdldEFtUG1Ib3VyKGRlZmF1bHRIb3VycyksXG4gICAgICAgIG1pbnV0ZXM6IGRlZmF1bHRNaW51dGVzLFxuICAgICAgICBzZWNvbmRzOiBkZWZhdWx0U2Vjb25kcyxcbiAgICAgICAgaG91clR5cGU6IHRoaXMuZ2V0SG91clR5cGUoZGVmYXVsdEhvdXJzKVxuICAgICAgfSxcbiAgICAgIG1vbnRobHk6IHtcbiAgICAgICAgc3ViVGFiOiAnc3BlY2lmaWNEYXknLFxuICAgICAgICBydW5PbldlZWtkYXk6IGZhbHNlLFxuICAgICAgICBzcGVjaWZpY0RheToge1xuICAgICAgICAgIGRheTogJzEnLFxuICAgICAgICAgIG1vbnRoczogMSxcbiAgICAgICAgICBob3VyczogdGhpcy5nZXRBbVBtSG91cihkZWZhdWx0SG91cnMpLFxuICAgICAgICAgIG1pbnV0ZXM6IGRlZmF1bHRNaW51dGVzLFxuICAgICAgICAgIHNlY29uZHM6IGRlZmF1bHRTZWNvbmRzLFxuICAgICAgICAgIGhvdXJUeXBlOiB0aGlzLmdldEhvdXJUeXBlKGRlZmF1bHRIb3VycylcbiAgICAgICAgfSxcbiAgICAgICAgc3BlY2lmaWNXZWVrRGF5OiB7XG4gICAgICAgICAgbW9udGhXZWVrOiAnIzEnLFxuICAgICAgICAgIGRheTogJ01PTicsXG4gICAgICAgICAgc3RhcnRNb250aDogMSxcbiAgICAgICAgICBtb250aHM6IDEsXG4gICAgICAgICAgaG91cnM6IHRoaXMuZ2V0QW1QbUhvdXIoZGVmYXVsdEhvdXJzKSxcbiAgICAgICAgICBtaW51dGVzOiBkZWZhdWx0TWludXRlcyxcbiAgICAgICAgICBzZWNvbmRzOiBkZWZhdWx0U2Vjb25kcyxcbiAgICAgICAgICBob3VyVHlwZTogdGhpcy5nZXRIb3VyVHlwZShkZWZhdWx0SG91cnMpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB5ZWFybHk6IHtcbiAgICAgICAgc3ViVGFiOiAnc3BlY2lmaWNNb250aERheScsXG4gICAgICAgIHJ1bk9uV2Vla2RheTogZmFsc2UsXG4gICAgICAgIHNwZWNpZmljTW9udGhEYXk6IHtcbiAgICAgICAgICBtb250aDogMSxcbiAgICAgICAgICBkYXk6ICcxJyxcbiAgICAgICAgICBob3VyczogdGhpcy5nZXRBbVBtSG91cihkZWZhdWx0SG91cnMpLFxuICAgICAgICAgIG1pbnV0ZXM6IGRlZmF1bHRNaW51dGVzLFxuICAgICAgICAgIHNlY29uZHM6IGRlZmF1bHRTZWNvbmRzLFxuICAgICAgICAgIGhvdXJUeXBlOiB0aGlzLmdldEhvdXJUeXBlKGRlZmF1bHRIb3VycylcbiAgICAgICAgfSxcbiAgICAgICAgc3BlY2lmaWNNb250aFdlZWs6IHtcbiAgICAgICAgICBtb250aFdlZWs6ICcjMScsXG4gICAgICAgICAgZGF5OiAnTU9OJyxcbiAgICAgICAgICBtb250aDogMSxcbiAgICAgICAgICBob3VyczogdGhpcy5nZXRBbVBtSG91cihkZWZhdWx0SG91cnMpLFxuICAgICAgICAgIG1pbnV0ZXM6IGRlZmF1bHRNaW51dGVzLFxuICAgICAgICAgIHNlY29uZHM6IGRlZmF1bHRTZWNvbmRzLFxuICAgICAgICAgIGhvdXJUeXBlOiB0aGlzLmdldEhvdXJUeXBlKGRlZmF1bHRIb3VycylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGFkdmFuY2VkOiB7XG4gICAgICAgIGV4cHJlc3Npb246IHRoaXMuZ2V0RGVmYXVsdEFkdmFuY2VkQ3JvbkV4cHJlc3Npb24oKVxuICAgICAgfSxcbiAgICAgIHZhbGlkYXRpb246IHtcbiAgICAgICAgaXNWYWxpZDogdHJ1ZSxcbiAgICAgICAgZXJyb3JNZXNzYWdlOiAnJ1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdldE9yZGluYWxTdWZmaXgodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh2YWx1ZS5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBzZWNvbmRUb0xhc3REaWdpdCA9IHZhbHVlLmNoYXJBdCh2YWx1ZS5sZW5ndGggLSAyKTtcbiAgICAgIGlmIChzZWNvbmRUb0xhc3REaWdpdCA9PT0gJzEnKSB7XG4gICAgICAgIHJldHVybiAndGgnO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGxhc3REaWdpdCA9IHZhbHVlLmNoYXJBdCh2YWx1ZS5sZW5ndGggLSAxKTtcbiAgICBzd2l0Y2ggKGxhc3REaWdpdCkge1xuICAgICAgY2FzZSAnMSc6XG4gICAgICAgIHJldHVybiAnc3QnO1xuICAgICAgY2FzZSAnMic6XG4gICAgICAgIHJldHVybiAnbmQnO1xuICAgICAgY2FzZSAnMyc6XG4gICAgICAgIHJldHVybiAncmQnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICd0aCc7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRTZWxlY3RPcHRpb25zKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtb250aHM6IFV0aWxzLmdldFJhbmdlKDEsIDEyKSxcbiAgICAgIG1vbnRoV2Vla3M6IFsnIzEnLCAnIzInLCAnIzMnLCAnIzQnLCAnIzUnLCAnTCddLFxuICAgICAgZGF5czogWydNT04nLCAnVFVFJywgJ1dFRCcsICdUSFUnLCAnRlJJJywgJ1NBVCcsICdTVU4nXSxcbiAgICAgIG1pbnV0ZXM6IFV0aWxzLmdldFJhbmdlKDAsIDU5KSxcbiAgICAgIGZ1bGxNaW51dGVzOiBVdGlscy5nZXRSYW5nZSgwLCA1OSksXG4gICAgICBzZWNvbmRzOiBVdGlscy5nZXRSYW5nZSgwLCA1OSksXG4gICAgICBob3VyczogVXRpbHMuZ2V0UmFuZ2UoMSwgMjMpLFxuICAgICAgbW9udGhEYXlzOiBVdGlscy5nZXRSYW5nZSgxLCAzMSksXG4gICAgICBtb250aERheXNXaXRoTGFzdHM6IFsuLi5VdGlscy5nZXRSYW5nZSgxLCAzMSkubWFwKFN0cmluZyksICdMJ10sXG4gICAgICBob3VyVHlwZXM6IFsnQU0nLCAnUE0nXVxuICAgIH07XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3Jvbi10aW1lLXBpY2tlcjInLFxuICB0ZW1wbGF0ZVVybDogJy4vdGltZS1waWNrZXIvdGltZS1waWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90aW1lLXBpY2tlci90aW1lLXBpY2tlci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVGltZVBpY2tlckNvbXBvbmVudDIgaW1wbGVtZW50cyBPbkluaXQge1xuICBAT3V0cHV0KCkgcHVibGljIGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQElucHV0KCkgcHVibGljIGRpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBwdWJsaWMgdGltZTogYW55O1xuICBASW5wdXQoKSBwdWJsaWMgc2VsZWN0Q2xhc3M6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIHVzZTI0SG91clRpbWU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHB1YmxpYyBoaWRlU2Vjb25kczogYm9vbGVhbjtcblxuICBwdWJsaWMgaG91cnM6IG51bWJlcltdO1xuICBwdWJsaWMgbWludXRlczogbnVtYmVyW107XG4gIHB1YmxpYyBzZWNvbmRzOiBudW1iZXJbXTtcbiAgcHVibGljIGhvdXJUeXBlczogc3RyaW5nW107XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaG91cnMgPSB0aGlzLnVzZTI0SG91clRpbWUgPyBVdGlscy5nZXRSYW5nZSgwLCAyMykgOiBVdGlscy5nZXRSYW5nZSgwLCAxMik7XG4gICAgdGhpcy5taW51dGVzID0gVXRpbHMuZ2V0UmFuZ2UoMCwgNTkpO1xuICAgIHRoaXMuc2Vjb25kcyA9IFV0aWxzLmdldFJhbmdlKDAsIDU5KTtcbiAgICB0aGlzLmhvdXJUeXBlcyA9IFsnQU0nLCAnUE0nXTtcbiAgfVxufVxuIl19