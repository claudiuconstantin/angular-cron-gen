export interface CronOptions {
    formInputClass?: string;
    formSelectClass?: string;
    formRadioClass?: string;
    formCheckboxClass?: string;

    defaultTime?: string;
    use24HourTime?: boolean;

    hideMinutesTab?: boolean;
    hideHourlyTab?: boolean;
    hideDailyTab?: boolean;
    hideWeeklyTab?: boolean;
    hideMonthlyTab?: boolean;
    hideYearlyTab?: boolean;
    hideAdvancedTab?: boolean;
    format?: CronFormat;

    /** hides the Seconds UI form element */
    hideSeconds?: boolean;

    /** removes Seconds from the Cron expression */
    removeSeconds?: boolean;

    /** removes Years from the Cron expression */
    removeYears?: boolean;

    /** Set values to change localizations **/
    localizations?: Localization;
}

export enum CronFormat {
  Quartz,
  NCronTab
}

export interface Localization {
  minutely?: string;
  hourly?: string;
  daily?: string;
  weekly?: string;
  monthly?: string;
  yearly?: string;
  advanced?: string;

  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;

  every?: string;
  minutes?: string;
  hours?: string;
  days?: string;
  weeks?: string;
  months?: string;
  years?: string;
  onSecond?: string;
  onMinute?: string;
  hoursOnMinute?: string;
  andSecond?: string;
  daysAt?: string;
  everyWorkingDayAt?: string;
  at?: string;
  onThe?: string;
  ofEvery?: string;
  monthsAt?: string;
  duringTheNearestWeekday?: string;
  monthsStartingIn?: string;
  of?: string;
  cronExpression?: string;

  lastDay?: string;
  lastWeekday?: string;
  firstWeekday?: string;
  day?: string;

  january?: string;
  february?: string;
  march?: string;
  april?: string;
  may?: string;
  june?: string;
  july?: string;
  august?: string;
  september?: string;
  october?: string;
  november?: string;
  december?: string;

  first?: string;
  second?: string;
  third?: string;
  fourth?: string;
  fifth?: string;
  last?: string;

  cronExpressionCannotBeNull?: string;
  invalidCronExpression?: string;
  couldNotParseExpression?: string;

  ordinalSuffix?(value: string): string;
}
