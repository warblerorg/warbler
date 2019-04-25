import { getComments } from './communication/mock';
import WarblerElement from './elements/Warbler.svelte';

export interface WarblerOptions {
    /** Element where the warbler view will be added. */
    target: Node;
    /** ID of the thread to display. */
    threadId: string;
    /** URL of the server. */
    server: string;
}

export interface Warbler {
    /** Resolves once the comments have loaded from the server. */
    done: Promise<void>;
    /** Call to remove the warbler view from the page. */
    destory(): void;
}

export function warbler({ target, server, threadId }: WarblerOptions): Warbler {
    const commentsPromise = getComments(server, threadId);

    const main = new WarblerElement({
        target,
        props: {
            commentsPromise,
            threadId,
            server,
        },
    });

    return {
        done: commentsPromise.then(() => {}),
        destory() {
            main.$destory();
        },
    };
}
