import { h, ChildType } from './dom';

interface ActionProps {
    children?: ChildType;
    dataset: Record<string, string>;
}

function action(props: ActionProps) {
    const element = h(
        'button',
        { className: 'warbler-action' },
        props.children
    );
    Object.assign(element.dataset, props.dataset);
    return element;
}

export interface ReplyActionProps {
    children?: ChildType;
    commentId?: number;
}

/**
 * Button to reply to a comment.
 */
export function replyAction({
    commentId = -1,
    children = 'Reply',
}: ReplyActionProps) {
    return action({
        children,
        dataset: { type: 'action', commentId: commentId.toString() },
    });
}

export interface ReactionActionProps {
    emoji: string;
    count: number;
    commentId: number;
}

/**
 * Button to react to a comment.
 */
export function reactionAction({
    commentId,
    emoji,
    count,
}: ReactionActionProps) {
    return action({
        children: `${emoji} ${count}`,
        dataset: { type: 'react', commentId: commentId.toString() },
    });
}
