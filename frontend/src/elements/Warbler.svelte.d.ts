import { CommentsArray } from '../communication/schemas';

interface Props {
    promise: Promise<{ total: number; comments: CommentsArray }>;
    threadId: string;
    server: string;
}

export default class Warbler {
    constructor(options: { target: Node; props: Props });

    $set(props: Props): void;
    $on(event: string, callback: (event: Event) => void);
    $destory(): void;
}
