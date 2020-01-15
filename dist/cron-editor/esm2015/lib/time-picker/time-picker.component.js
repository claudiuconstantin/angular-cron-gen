/**
 * @fileoverview added by tsickle
 * Generated from: lib/time-picker/time-picker.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input } from '@angular/core';
import Utils from '../Utils';
export class TimePickerComponent {
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
TimePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'cron-time-picker',
                template: "<!-- hour -->\n<select class=\"timeFormControl\" (change)=\"change.emit()\" [(ngModel)]=\"time.hours\" [disabled]=\"disabled\" [ngClass]=\"selectClass\">\n  <option *ngFor=\"let hour of hours\" [ngValue]=\"hour\">{{hour}}</option>\n</select>\n\n<!-- minute -->\n<select class=\"timeFormControl\" (change)=\"change.emit()\" [(ngModel)]=\"time.minutes\" [disabled]=\"disabled\" [ngClass]=\"selectClass\">\n  <option *ngFor=\"let minute of minutes\" [ngValue]=\"minute\">{{minute}}</option>\n</select>\n\n<!-- second -->\n<select class=\"timeFormControl\" (change)=\"change.emit()\" [(ngModel)]=\"time.seconds\" [disabled]=\"disabled\" *ngIf=\"!hideSeconds\"\n  [ngClass]=\"selectClass\">\n  <option *ngFor=\"let second of seconds\" [ngValue]=\"second\">{{second}}</option>\n</select>\n\n<!-- am/pm -->\n<select class=\"timeFormControl\" (change)=\"change.emit()\" [(ngModel)]=\"time.hourTypes\" [disabled]=\"disabled\" *ngIf=\"!use24HourTime\"\n  [ngClass]=\"selectClass\">\n  <option *ngFor=\"let hourType of hourTypes\" [ngValue]=\"hourType\">{{hourType}}</option>\n</select>\n",
                styles: [".timeFormControl{width:70px;display:inline}"]
            }] }
];
TimePickerComponent.propDecorators = {
    change: [{ type: Output }],
    disabled: [{ type: Input }],
    time: [{ type: Input }],
    selectClass: [{ type: Input }],
    use24HourTime: [{ type: Input }],
    hideSeconds: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    TimePickerComponent.prototype.change;
    /** @type {?} */
    TimePickerComponent.prototype.disabled;
    /** @type {?} */
    TimePickerComponent.prototype.time;
    /** @type {?} */
    TimePickerComponent.prototype.selectClass;
    /** @type {?} */
    TimePickerComponent.prototype.use24HourTime;
    /** @type {?} */
    TimePickerComponent.prototype.hideSeconds;
    /** @type {?} */
    TimePickerComponent.prototype.hours;
    /** @type {?} */
    TimePickerComponent.prototype.minutes;
    /** @type {?} */
    TimePickerComponent.prototype.seconds;
    /** @type {?} */
    TimePickerComponent.prototype.hourTypes;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vY3Jvbi1lZGl0b3IvIiwic291cmNlcyI6WyJsaWIvdGltZS1waWNrZXIvdGltZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUvRSxPQUFPLEtBQUssTUFBTSxVQUFVLENBQUM7QUFPN0IsTUFBTSxPQUFPLG1CQUFtQjtJQUxoQztRQU1tQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQWtCL0MsQ0FBQzs7OztJQU5RLFFBQVE7UUFDYixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7WUF2QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLGlrQ0FBMkM7O2FBRTVDOzs7cUJBRUUsTUFBTTt1QkFDTixLQUFLO21CQUNMLEtBQUs7MEJBQ0wsS0FBSzs0QkFDTCxLQUFLOzBCQUNMLEtBQUs7Ozs7SUFMTixxQ0FBNkM7O0lBQzdDLHVDQUFrQzs7SUFDbEMsbUNBQTBCOztJQUMxQiwwQ0FBb0M7O0lBQ3BDLDRDQUF1Qzs7SUFDdkMsMENBQXFDOztJQUVyQyxvQ0FBdUI7O0lBQ3ZCLHNDQUF5Qjs7SUFDekIsc0NBQXlCOztJQUN6Qix3Q0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCBVdGlscyBmcm9tICcuLi9VdGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nyb24tdGltZS1waWNrZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vdGltZS1waWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90aW1lLXBpY2tlci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVGltZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBPdXRwdXQoKSBwdWJsaWMgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoKSBwdWJsaWMgZGlzYWJsZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHB1YmxpYyB0aW1lOiBhbnk7XG4gIEBJbnB1dCgpIHB1YmxpYyBzZWxlY3RDbGFzczogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgdXNlMjRIb3VyVGltZTogYm9vbGVhbjtcbiAgQElucHV0KCkgcHVibGljIGhpZGVTZWNvbmRzOiBib29sZWFuO1xuXG4gIHB1YmxpYyBob3VyczogbnVtYmVyW107XG4gIHB1YmxpYyBtaW51dGVzOiBudW1iZXJbXTtcbiAgcHVibGljIHNlY29uZHM6IG51bWJlcltdO1xuICBwdWJsaWMgaG91clR5cGVzOiBzdHJpbmdbXTtcblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5ob3VycyA9IHRoaXMudXNlMjRIb3VyVGltZSA/IFV0aWxzLmdldFJhbmdlKDAsIDIzKSA6IFV0aWxzLmdldFJhbmdlKDAsIDEyKTtcbiAgICB0aGlzLm1pbnV0ZXMgPSBVdGlscy5nZXRSYW5nZSgwLCA1OSk7XG4gICAgdGhpcy5zZWNvbmRzID0gVXRpbHMuZ2V0UmFuZ2UoMCwgNTkpO1xuICAgIHRoaXMuaG91clR5cGVzID0gWydBTScsICdQTSddO1xuICB9XG59XG4iXX0=