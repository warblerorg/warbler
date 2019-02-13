import { h, ChildType } from './dom';

export interface AllCommentsProps {
    count: number;
    children?: ChildType;
}

/**
 * Wrapper for all comments.
 *
 * <section class="yacs-all-comments">
 *   <h6 class="yacs-all-comments__title">
 *     <span class="yacs-all-comments__count">{{count}}</span> Comments
 *   </h6>
 *   {{children}}
 * </section>
 */
export function allComments(props: AllCommentsProps) {
    return h(
        'section',
        { className: 'yacs-all-comments' },
        h(
            'h6',
            { className: 'yacs-all-comments__title' },
            h(
                'span',
                { className: 'yacs-all-comments__count' },
                props.count.toString(),
            ),
            ' comments',
        ),
        props.children,
    );
}
