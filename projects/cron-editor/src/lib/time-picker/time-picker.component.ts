import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import Utils from '../Utils';

@Component({
    selector: 'cron-time-picker',
    templateUrl: './time-picker.component.html',
    styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnInit {
    @Output() public change = new EventEmitter();
    @Input() public disabled: boolean;
    @Input() public time: any;
    @Input() public selectClass: string;
    @Input() public use24HourTime: boolean;
    @Input() public hideSeconds: boolean;

    public hours: number[];
    public minutes: number[];
    public seconds: number[];
    public hourTypes: string[];

    public ngOnInit() {
        this.hours = this.use24HourTime ? Utils.getRange(0, 23) : Utils.getRange(0, 12);
        this.minutes = Utils.getRange(0, 59);
        this.seconds = Utils.getRange(0, 59);
        this.hourTypes = ['AM', 'PM'];
    }
}
