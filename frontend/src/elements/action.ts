import { h, ChildType } from './dom';

export interface ActionProps {
    children?: ChildType;
}

function action(props: ActionProps & { type: string }) {
    const element = h('button', { className: 'yacs-action' }, props.children);
    element.dataset.type = props.type;
    return element;
}

/**
 * Button to reply to a form.
 *
 * <a class="yacs-avatar">
 *   <img class="yacs-avatar__img" src={avatar} alt="" height="35" width="35">
 * </a>
 */
export function replyAction({ children = 'Reply' }: ActionProps) {
    return action({ children, type: 'reply' });
}
