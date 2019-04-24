declare module '*.svelte' {
    export default class Svelte<P = any> {
        constructor(options: { target: Node; props: P });

        $set(props: P): void;
        $on(event: string, callback: (event: Event) => void);
        $destory(): void;
    }
}

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
