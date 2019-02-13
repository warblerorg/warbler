import { ChildType } from '../elements/dom';
import { reply } from '../elements/reply';

export interface HandleReplyClickOptions {
    action: string;
    avatar?: string;
    authorHref?: string;
    submit(): ChildType;
}

export function handleReplyClick({
    action,
    avatar,
    authorHref,
    submit,
}: HandleReplyClickOptions) {
    return (evt: MouseEvent) => {
        // Find the button that was clicked
        const actionButton = (evt.target as Element).closest(
            '.yacs-action[data-type="reply"]',
        );
        if (actionButton == null) return;
        const main = actionButton.closest('.yacs-comment__main');
        if (main == null) return;
        const comment = main.parentElement;
        if (comment == null) return;

        const maybeReplyForm = main.nextElementSibling;
        // If form is open...
        if (maybeReplyForm && maybeReplyForm.matches('.yacs-reply')) {
            // Close the form.
            const replyForm = maybeReplyForm;
            comment.removeChild(replyForm);
            actionButton.classList.remove('yacs-action--open');
        } else {
            // Open a form.
            const siblingComment = maybeReplyForm;
            comment.insertBefore(
                reply({
                    action,
                    avatar,
                    authorHref,
                    children: submit(),
                }),
                siblingComment,
            );
            actionButton.classList.add('yacs-action--open');
        }
    };
}
