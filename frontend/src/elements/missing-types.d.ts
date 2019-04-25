declare module '*.svelte' {
    export default class Svelte<P = any> {
        constructor(options: { target: Node; props: P });

        $set(props: P): void;
        $on(event: string, callback: (event: Event) => void);
        $destory(): void;
    }
}
