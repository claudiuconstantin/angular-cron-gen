import { OnInit, EventEmitter } from '@angular/core';
export declare class TimePickerComponent implements OnInit {
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
