// @dynamic
import { Localization } from './CronOptions';

export class Localizations {
  static English: Localization = {
    minutely: 'Minutes',
    hourly: 'Hourly',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
    advanced: 'Advanced',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
    every: 'Every',
    minutes: 'minute(s)',
    onSecond: 'on second',
    onMinute: 'on minute',
    hoursOnMinute: 'hour(s) on minute',
    andSecond: 'and second',
    daysAt: 'day(s) at',
    everyWorkingDayAt: 'Every working day at',
    at: 'at',
    onThe: 'on the',
    ofEvery: 'of every',
    monthsAt: 'month(s) at',
    duringTheNearestWeekday: 'during the nearest weekday',
    monthsStartingIn: 'month(s) starting in',
    of: 'of',
    cronExpression: 'Cron expression',
    cronExpressionCannotBeNull: 'Cron expression cannot be null',
    invalidCronExpression: 'Invalid cron expression, there must be {expected} segments',
    couldNotParseExpression: 'Could not parse cron expression',
    lastDay: 'last day',
    lastWeekday: 'last weekday',
    firstWeekday: 'first weekday',
    day: 'day',
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',
    first: 'first',
    second: 'second',
    third: 'third',
    fourth: 'fourth',
    fifth: 'fifth',
    last: 'last',
    ordinalSuffix(value: string) {
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
  };

  static Swedish: Localization = {
    minutely: 'Minuter',
    hourly: 'Timvis',
    daily: 'Dagligen',
    weekly: 'Veckovis',
    monthly: 'Månadsvis',
    yearly: 'Årligen',
    advanced: 'Avancerat',
    monday: 'Måndag',
    tuesday: 'Tisdag',
    wednesday: 'Onsdag',
    thursday: 'Torsdag',
    friday: 'Fredag',
    saturday: 'Lördag',
    sunday: 'Söndag',
    every: 'Varje',
    minutes: 'minut',
    onSecond: 'på sekund',
    onMinute: 'på minut',
    hoursOnMinute: 'timmar på minut',
    andSecond: 'och sekund',
    daysAt: 'dagar på',
    everyWorkingDayAt: 'Varje arbetsdag kl',
    at: 'kl',
    onThe: 'på den',
    ofEvery: 'varje',
    monthsAt: 'månader på',
    duringTheNearestWeekday: 'på närmaste veckodag',
    monthsStartingIn: 'månader med början i',
    of: 'i',
    cronExpression: 'Cron-uttryck',
    cronExpressionCannotBeNull: 'Cron-uttryck kan inte vara tomt',
    invalidCronExpression: 'Ogiltigt cron-uttryck, det måste innehålla {expected} segment',
    couldNotParseExpression: 'Lyckades inte tolka cron-uttryck',
    lastDay: 'sista dagen',
    lastWeekday: 'sista arbetsdagen',
    firstWeekday: 'första arbetsdagen',
    day: 'dagen',
    january: 'Januari',
    february: 'Februari',
    march: 'Mars',
    april: 'April',
    may: 'Maj',
    june: 'Juni',
    july: 'Juli',
    august: 'Augusti',
    september: 'September',
    october: 'Oktober',
    november: 'November',
    december: 'December',
    first: 'första',
    second: 'andra',
    third: 'tredje',
    fourth: 'fjärde',
    fifth: 'femte',
    last: 'sista',
    ordinalSuffix(value: string) {
      switch (value) {
        case '1':
          return 'a';
        case '2':
          return 'a';
        default:
          return 'e';
      }
    }
  };
}
