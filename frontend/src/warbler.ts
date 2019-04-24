import { getComments } from './communication/mock';
import WarblerElement from './elements/Warbler.svelte';

export interface WarblerOptions {
    target: Node;
    threadId: string;
    server: string;
}

export interface Warbler {
    done: Promise<void>;
    destory(): void;
}

export function warbler({ target, server, threadId }: WarblerOptions): Warbler {
    const promise = getComments(server, threadId);

    const main = new WarblerElement({
        target,
        props: {
            promise,
            threadId,
            server,
        },
    });

    return {
        done: promise.then(() => {}),
        destory() {
            main.$destory();
        },
    };
}
