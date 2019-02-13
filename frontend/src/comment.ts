import { h, ChildType } from './dom';

export interface CommentProps {
    avatar?: string;
    author?: string;
    authorHref?: string;
    metadata?: ChildType;
    text?: ChildType;
    actions?: ChildType;
    children?: ChildType;
}

/**
 * <article class="yacs-comment">
 *   <div class="yacs-comment__main">
 *     <a class="yacs-avatar">
 *       <img class="yacs-avatar__img" src="">
 *     </a>
 *     <div class="yacs-comment__content">
 *       <a class="yacs-comment__author">{{author}}</a>
 *       <small class="yacs-comment__metadata">{{metadata}}</small>
 *       <div class="yacs-comment__text">{{text}}</div>
 *       <small class="yacs-comment__actions">{{actions}}</small>
 *     </div>
 *   </div>
 *   {{children}}
 * </article>
 */
export function comment(props: CommentProps) {
    return h(
        'article',
        { className: 'yacs-comment' },
        h(
            'div',
            { className: 'yacs-comment__main' },
            h(
                'a',
                { className: 'yacs-avatar', href: props.authorHref },
                props.avatar
                    ? h('img', {
                          className: 'yacs-avatar__img',
                          src: props.avatar,
                          alt: '',
                          height: 35,
                          width: 35,
                      })
                    : h('div', { className: 'yacs-avatar__img' }),
            ),
            h(
                'div',
                { className: 'yacs-comment__content' },
                h(
                    'a',
                    {
                        className: 'yacs-comment__author',
                        href: props.authorHref,
                    },
                    props.author,
                ),
                h(
                    'small',
                    { className: 'yacs-comment__metadata' },
                    props.metadata,
                ),
                h('div', { className: 'yacs-comment__text' }, props.text),
                h(
                    'small',
                    { className: 'yacs-comment__actions' },
                    props.actions,
                ),
            ),
        ),
        props.children,
    );
}
