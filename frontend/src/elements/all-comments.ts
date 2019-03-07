import { h, ChildType } from './dom';

export interface AllCommentsProps {
    count: number | null;
    children?: ChildType;
}

/**
 * Wrapper for all comments.
 *
 * <div class="warbler-all-comments">
 *   <h6 class="warbler-all-comments__title">
 *     <span class="warbler-all-comments__count">{{count}}</span> Comments
 *   </h6>
 *   {{children}}
 * </div>
 */
export function allComments(props: AllCommentsProps) {
    return h(
        'div',
        { className: 'warbler-all-comments' },
        h(
            'h6',
            { className: 'warbler-all-comments__title' },
            h(
                'span',
                { className: 'warbler-all-comments__count' },
                props.count != null ? props.count.toString() : 'Loading',
            ),
            ' comments',
        ),
        props.children,
    );
}
