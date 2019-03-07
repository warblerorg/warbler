import { h } from './dom';

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
                    | 'second',
            ): string;
        }
        var RelativeTimeFormat: {
            new (
                locales?: string | string[],
                options?: RelativeTimeFormatOptions,
            ): RelativeTimeFormat;
            (
                locales?: string | string[],
                options?: RelativeTimeFormatOptions,
            ): RelativeTimeFormat;
            supportedLocalesOf(
                locales: string | string[],
                options?: RelativeTimeFormatOptions,
            ): string[];
        };
    }
}

const ONE_MINUTE = 60000;
const ONE_HOUR = 3600000;
const ONE_DAY = 86400000;
const TWO_DAYS = 172800000;

const GET_DATE = {
    second: (date: Date) => date.getUTCSeconds(),
    minute: (date: Date) => date.getUTCMinutes(),
    hour: (date: Date) => date.getUTCHours(),
    day: (date: Date) => date.getUTCDate(),
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

export interface TimeProps {
    time: string | number | Date;
    now: Date;
}

/**
 * Avatar image showing a user's avatar.
 *
 * <time class="warbler-time">Today at 5:00pm</time>
 */
export function time(props: TimeProps) {
    const { now } = props;
    const date =
        typeof props.time === 'number' || typeof props.time === 'string'
            ? new Date(props.time)
            : props.time;
    // Store milliseconds between given time and current time
    const duration = now.getTime() - date.getTime();

    let timeString = '';
    if (Intl.RelativeTimeFormat && duration < TWO_DAYS) {
        // Within 2 days, show a relative time.
        const formatter = new Intl.RelativeTimeFormat(undefined, relative);
        function format(unit: keyof typeof GET_DATE) {
            return formatter.format(
                GET_DATE[unit](now) - GET_DATE[unit](date),
                unit,
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

    return h(
        'time',
        { dateTime: date.toISOString(), className: 'warbler-time' },
        timeString,
    );
}
