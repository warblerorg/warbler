import { ChildType } from '../elements/dom';
import { reply } from '../elements/reply';

export interface HandleReplyClickOptions {
    server: string;
    avatar?: string;
    authorHref?: string;
    submit(): ChildType;
    threadId: string;
}

export function handleReplyClick({
    server,
    avatar,
    authorHref,
    submit,
    threadId,
}: HandleReplyClickOptions) {
    return (evt: MouseEvent) => {
        // Find the button that was clicked
        const actionButton = (evt.target as Element).closest(
            '.warbler-action[data-type="reply"]',
        ) as HTMLButtonElement | null;
        if (actionButton == null) return;
        const main = actionButton.closest('.warbler-comment__main');
        const parentId = actionButton.dataset.commentId;
        if (main == null) return;
        const comment = main.parentElement;
        if (comment == null) return;

        const maybeReplyForm = main.nextElementSibling;
        // If form is open...
        if (maybeReplyForm && maybeReplyForm.matches('.warbler-reply')) {
            // Close the form.
            const replyForm = maybeReplyForm;
            comment.removeChild(replyForm);
            actionButton.classList.remove('warbler-action--open');
        } else {
            // Open a form.
            const siblingComment = maybeReplyForm;
            comment.insertBefore(
                reply({
                    server,
                    avatar,
                    authorHref,
                    threadId,
                    parentId,
                    children: submit(),
                }),
                siblingComment,
            );
            actionButton.classList.add('warbler-action--open');
        }
    };
}
