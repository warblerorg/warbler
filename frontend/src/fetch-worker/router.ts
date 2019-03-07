import {
    FetchCommentListOptions,
    fetchCommentList,
} from './fetch-comment-list';
import { Tree } from './comment-tree';
import { NewComment } from '../communication/schemas';

interface FetchCommentListAction {
    type: 'fetch-comment-list';
    payload: FetchCommentListOptions;
}

interface NewCommentAction {
    type: 'new-comment';
    payload: NewComment;
}

interface EditCommentAction {
    type: 'edit-comment';
    payload: NewComment;
}

export type FetchWorkerAction =
    | FetchCommentListAction
    | NewCommentAction
    | EditCommentAction;
type UiAction = any; // TODO

let commentTree: Tree;

export function handleMessage(
    action: FetchWorkerAction,
    postMessage: (action: UiAction) => void,
) {
    Promise.resolve()
        .then(() => {
            switch (action.type) {
                case 'fetch-comment-list':
                    return fetchCommentList(action.payload).then(tree => {
                        commentTree = tree;
                        postMessage({
                            type: 'display-comments',
                            payload: tree.root.children,
                        });
                    });
            }
        })
        .catch(err => postMessage({ type: 'error', payload: String(err) }));
}
