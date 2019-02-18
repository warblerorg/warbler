import { h, ChildType } from './dom';

export interface AllCommentsProps {
    count: number;
    children?: ChildType;
}

/**
 * Wrapper for all comments.
 *
 * <section class="warbler-all-comments">
 *   <h6 class="warbler-all-comments__title">
 *     <span class="warbler-all-comments__count">{{count}}</span> Comments
 *   </h6>
 *   {{children}}
 * </section>
 */
export function allComments(props: AllCommentsProps) {
    return h(
        'section',
        { className: 'warbler-all-comments' },
        h(
            'h6',
            { className: 'warbler-all-comments__title' },
            h(
                'span',
                { className: 'warbler-all-comments__count' },
                props.count.toString(),
            ),
            ' comments',
        ),
        props.children,
    );
}
