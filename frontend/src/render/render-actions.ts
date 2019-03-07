import { ChildType } from '../elements/dom';
import { Comment } from '../communication/schemas';
import { replyAction, reactionAction } from '../elements';

export function renderActions({
    comment_id: commentId,
    reactions,
}: Comment): ChildType {
    const actions = reactions.map(({ emoji, count }) =>
        reactionAction({ commentId, emoji, count }),
    );
    actions.unshift(replyAction({ commentId }));
    return actions;
}
