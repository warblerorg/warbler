import { streamComments } from '../communication/get-comments';
import { Tree } from './comment-tree';

export interface FetchCommentListOptions {
    server: string;
    threadId: string;
}

export function fetchCommentList(options: FetchCommentListOptions) {
    const tree = new Tree();
    return streamComments(options.server, options.threadId, comment =>
        tree.add(comment),
    ).then(() => tree);
}
