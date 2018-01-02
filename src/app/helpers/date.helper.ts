import * as moment from 'moment-timezone';
import {SESSION, TIME_ZONE, MOMENT_DATE_FORMAT} from '../modules/constants';
export class DateHelper {
    constructor() {

    }

    /**
     *
     * @param date
     * @param format
     * @returns {string}
     */
    public static toDbDate(date: any) {
        return moment.tz(date, this.getTimezone()).format(MOMENT_DATE_FORMAT.YYYY_MM_DD);
    }

    /**
     *
     * @param date
     * @param format
     * @returns {string}
     */
    public static toFormat(date: any, format: string) {
      let date2 = DateHelper.toISOString(date);
      return moment.tz(date2, this.getTimezone()).format(format);
    }

    /**
     * format date use at slot time
     * @param date
     * @param format
     * @returns {any|string}
     */
    public static toFormatDate(date: any, format: string) {
        let date2 = DateHelper.toISOString(date);
        return moment(date2).format(format);
    }

    public static getTimezone() {
      //let data = SESSION.get(SESSION.PROFILE_KEYWORD);
      let data = null;
      if(sessionStorage.length) {
        let session = sessionStorage;
        if(session[SESSION.TOKEN_KEYWORD]) {
          let data = session[SESSION.PROFILE_KEYWORD];
        }
      }
      let timezone = TIME_ZONE.TIME_ZONE_DEFAULT;
      if(data) {
        let dataJson = JSON.parse(data);
        if (dataJson.condoManager && dataJson.condoManager != null) {
          if (dataJson.condoManager.timezone) {
            timezone = dataJson.condoManager.timezone;
          }
        }
      }
      return timezone;
    }

    public static getDayOfWeek(date: any) {
        return new Date(date).getDay();
    }

    public static getTime(date: any) {
        let hour = new Date(date).getHours();
        let minute = new Date(date).getMinutes();
        let r = '';

        if (hour == 0) {
            r = '12 AM';
        } else if (hour > 12) {
            r = (hour - 12) + ' : ' + minute + ' PM';
        } else {
            r = (hour) + ' : ' + minute + ' AM';
        }

        return r;
    }

    /**
     *
     * @param date1
     * @param date2
     * @returns {boolean}
     */
    public static compareDate(date1, date2) {
        var newDate1 = moment(this.parseDate(date1));
        var newDate2 = moment(this.parseDate(date2));

        if (newDate1.isSameOrAfter(newDate2)) {
            return true;
        }
        return false;
    }

    /**
     *
     * @param date
     * @returns {boolean}
     */
    static isValidDate(date: string) {
        if (this.parseDate(date)) {
            return true;
        }
        return false;
    }

    /**
     *
     * @param date
     * @returns {string}
     */
    static toISOString(date: string) {

        return moment(date).toISOString();
    }

    /**
     *
     */
    static addDays(date: string, additionalDays: number) {
        let dateResult = moment(date).add(additionalDays, 'd').toISOString();
        return dateResult;
    }

    /**
     *
     * @param date
     * @returns {number}
     */
    public static parseDate(date: string) {
        let parsed = Date.parse(date);

        if (!isNaN(parsed)) {
            return parsed;
        }
        return Date.parse(date.replace(/-/g, '/').replace(/[a-z]+/gi, ' '));
    }

    /**
     *
     * @param date1
     * @param date2
     * @returns {boolean}
     */
    static compare2Date(date1, date2) {
        var newDate1 = moment(date1);
        var newDate2 = moment(date2);

        if (newDate1.isSameOrAfter(newDate2)) {
            return true;
        }
        return false;
    }

    /**
     *
     * @param date (DD-MM-YYYY)
     * @returns timestamp
     */
    public static date2Timestamp(date, next) {
      let myDate = date;
      myDate = myDate.split('-');
      let newDate = (myDate[1]) + '/' + myDate[0] + '/' + myDate[2];
      let month = new Date(newDate).getMonth();
      if (next === true) {
        if (month === 10) {
          myDate[2] = parseInt(myDate[2]) + 1;
          month = 1;
        }
        else if (month === 11) {
          myDate[2] = parseInt(myDate[2]) + 1;
          month = 2;
        } else {
          month = month + 2;
        }
        newDate = (month) + '/' + myDate[0] + '/' + myDate[2];
      } else {
        if (month === 11) {
          myDate[2] = parseInt(myDate[2]) + 1;
          month = 1;
        } else {
          month = month + 1;
        }
        newDate = (month) + '/' + myDate[0] + '/' + myDate[2];
      }
      return (new Date(newDate).getTime());
    }

    public static getCurrentTime(format) {
      return moment.tz(new Date(), this.getTimezone()).format(format);
    }

  public static gePreviousTimeByMonth(format, month) {
    let date = new moment().subtract(month, 'months').date(1);
    return moment.tz(date, this.getTimezone()).format(format);
  }

  public static convertToTimestamp(date) {
    return (new Date().getTime());
  }

  public static getStartYear() {
    return (new Date(moment().startOf('year')).getTime());
  }

  public static getEndYear() {
    return (new Date(moment().endOf('year')).getTime());
  }
}
