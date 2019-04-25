declare global {
    namespace Intl {
        interface RelativeTimeFormatOptions {
            localeMatcher?: 'lookup' | 'best fit';
            numeric?: 'always' | 'auto';
            style?: 'long' | 'short' | 'narrow';
        }

        interface RelativeTimeFormat {
            format(
                value: number,
                unit:
                    | 'year'
                    | 'quarter'
                    | 'month'
                    | 'week'
                    | 'day'
                    | 'hour'
                    | 'minute'
                    | 'second'
            ): string;
        }
        var RelativeTimeFormat: {
            new (
                locales?: string | string[],
                options?: RelativeTimeFormatOptions
            ): RelativeTimeFormat;
            (
                locales?: string | string[],
                options?: RelativeTimeFormatOptions
            ): RelativeTimeFormat;
            supportedLocalesOf(
                locales: string | string[],
                options?: RelativeTimeFormatOptions
            ): string[];
        };
    }
}

const ONE_MINUTE = 60000;
const ONE_HOUR = 3600000;
const ONE_DAY = 86400000;
const TWO_DAYS = 172800000;

type DateKeys = 'second' | 'minute' | 'hour' | 'day';

const GET_DATE: Record<DateKeys, (date: Date) => number> = {
    second: date => date.getUTCSeconds(),
    minute: date => date.getUTCMinutes(),
    hour: date => date.getUTCHours(),
    day: date => date.getUTCDate(),
};

const relative: Intl.RelativeTimeFormatOptions = {
    numeric: 'auto',
    style: 'long',
};
const detailedDate: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
};

export function timeProps(time: string | number | Date, now: Date) {
    const date =
        typeof time === 'number' || typeof time === 'string'
            ? new Date(time)
            : time;
    // Store milliseconds between given time and current time
    const duration = now.getTime() - date.getTime();

    let timeString = '';
    if (Intl.RelativeTimeFormat && duration < TWO_DAYS) {
        // Within 2 days, show a relative time.
        const formatter = new Intl.RelativeTimeFormat(undefined, relative);
        function format(unit: DateKeys) {
            return formatter.format(
                GET_DATE[unit](now) - GET_DATE[unit](date),
                unit
            );
        }
        if (duration < ONE_MINUTE) {
            timeString = format('second');
        } else if (duration < ONE_HOUR) {
            timeString = format('minute');
        } else if (duration < ONE_DAY) {
            timeString = format('hour');
        } else {
            timeString = format('day');
        }
    } else if (date.getUTCFullYear() == now.getUTCFullYear()) {
        // After 2 days, show the whole date.
        timeString = date.toLocaleString(undefined, detailedDate);
    } else {
        // After a year, don't show the time.
        timeString = date.toLocaleDateString();
    }

    return {
        datetime: date.toISOString(),
        formatted: timeString,
    };
}
