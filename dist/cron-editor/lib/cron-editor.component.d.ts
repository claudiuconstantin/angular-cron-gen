import { OnInit, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { CronOptions } from './CronOptions';
export declare class CronEditorComponent implements OnInit, OnChanges {
    disabled: boolean;
    options: CronOptions;
    cron: string;
    cronChange: EventEmitter<{}>;
    activeTab: string;
    selectOptions: {
        months: number[];
        monthWeeks: string[];
        days: string[];
        minutes: number[];
        fullMinutes: number[];
        seconds: number[];
        hours: number[];
        monthDays: number[];
        monthDaysWithLasts: string[];
        hourTypes: string[];
    };
    state: any;
    private localCron;
    private isDirty;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    setActiveTab(tab: string): void;
    dayDisplay(day: string): string;
    monthWeekDisplay(monthWeekNumber: number): string;
    monthDisplay(month: number): string;
    monthDayDisplay(month: string): string;
    regenerateCron(): void;
    private getAmPmHour;
    private getHourType;
    private hourToCron;
    private handleModelChange;
    private validate;
    private getDefaultAdvancedCronExpression;
    private getDefaultState;
    private getOrdinalSuffix;
    private getSelectOptions;
}
export declare class TimePickerComponent2 implements OnInit {
    change: EventEmitter<{}>;
    disabled: boolean;
    time: any;
    selectClass: string;
    use24HourTime: boolean;
    hideSeconds: boolean;
    hours: number[];
    minutes: number[];
    seconds: number[];
    hourTypes: string[];
    ngOnInit(): void;
}
