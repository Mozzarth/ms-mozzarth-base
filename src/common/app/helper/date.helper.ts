import * as moment from 'moment-timezone';

const default_format = 'YYYY-MM-DD';
export const ISO_FORMAT_DATE_TIME = 'YYYY-MM-DDTHH:mm:ss';

export interface IHelperDateOptions {
  timezone?: string;
}

export interface IHelperDateOptionsCreate extends IHelperDateOptions {
  format?: string;
  currentDate?: string;
  date?: string | number | Date;
}

export class DateHelper {
  public static timestamp(options?: IHelperDateOptionsCreate): number {
    return moment.tz(options && options.date ? options.date : undefined, options ? options.timezone : undefined).valueOf();
  }

  public static dateTime(options?: IHelperDateOptionsCreate) {
    return moment.tz(options && options.date ? options.date : undefined, options && options.timezone);
  }

  public static getDurationInMinutes(options?: IHelperDateOptionsCreate) {
    const nowDatetime = moment.tz(options ? options.timezone : undefined);
    return moment.duration(nowDatetime.diff(options && options.date ? options.date : nowDatetime)).asMinutes();
  }

  public static subtractMonthsFromCurrentDate(months: number, options?: IHelperDateOptionsCreate) {
    return moment
      .tz(options?.timezone ?? undefined)
      .subtract(months, 'months')
      .format(options && options?.format ? options?.format : default_format);
  }

  public static dateToString(options?: IHelperDateOptionsCreate) {
    return moment(options?.date ?? undefined).format(options?.format ?? default_format);
  }

  public static format(options: IHelperDateOptionsCreate): string {
    return moment(options?.date ?? undefined).format(options?.format ?? default_format);
  }

  public static currentDate(options: IHelperDateOptionsCreate): string {
    return moment(options?.currentDate ?? undefined).format(options.format ?? default_format);
  }

  public static setDate(options: IHelperDateOptionsCreate): string {
    return moment(options?.currentDate ?? undefined).format(options.format ?? default_format);
  }

  public static nowMoment(options?: IHelperDateOptionsCreate): moment.Moment {
    return moment.tz(options && options.date ? options.date : undefined, options?.timezone);
  }

  static daysToGoBack(daysToSubtract: number, options?: IHelperDateOptionsCreate) {
    return DateHelper.nowMoment(options).utc().startOf('d').subtract(daysToSubtract, 'd');
  }

  public static diffDays(input: { to: Date; from: Date; timeZone?: string }) {
    const { to, from } = input;
    const timeZone = input.timeZone || process.env.TIME_ZONE;

    const diffMoth = moment.tz(to, timeZone).diff(from, 'months');
    let arrayYearsMonths = Array.from({ length: diffMoth + 1 }, (v, i) => {
      const date = moment.tz(from, timeZone).add(i, 'months');
      return {
        year: date.year(),
        month: date.month()
      };
    });

    let dayInit = moment(from).get('date');
    let days = 0;

    if (arrayYearsMonths.length == 1) {
      arrayYearsMonths = [];
      days = moment(to).diff(from, 'days');
    }
    arrayYearsMonths.forEach((yearMonth) => {
      const daysMonth = moment.tz(`${yearMonth.year}-${yearMonth.month + 1}`, 'YYYY-MM', timeZone).daysInMonth();
      if (to.getFullYear() == yearMonth.year && to.getMonth() == yearMonth.month) return (days += to.getDate());
      days += daysMonth - dayInit;
      dayInit = 0;
    });
    return days;
  }

  public static toDate(input: Date) {
    return input.toISOString().slice(0, 10);
  }
}
