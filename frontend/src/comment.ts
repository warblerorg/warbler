export interface CommentProps {
    avatar: string;
    author: string;
    authorHref: string;
    metadata: Node;
    text: Node;
    actions: Node;
    children: Node;
}

export function h<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    attributes: Partial<HTMLElementTagNameMap[K]>,
    ...children: (Node | string)[]
): HTMLElementTagNameMap[K] {
    const element = Object.assign(document.createElement(tagName), attributes);
    for (const child of children) {
        element.appendChild(
            typeof child === 'string' ? document.createTextNode(child) : child,
        );
    }
    return element;
}

/**
 * <article class="yacs-comment">
 *   <a class="yacs-avatar">
 *     <img class="yacs-avatar__img" src="">
 *   </a>
 *   <div class="yacs-comment__content">
 *     <a class="yacs-comment__author">{{author}}</a>
 *     <div class="yacs-comment__metadata">{{metadata}}</div>
 *     <div class="yacs-comment__text">{{text}}</div>
 *     <div class="yacs-comment__actions">{{actions}}</div>
 *   </div>
 *   {{children}}
 * </article>
 */
export function comment(props: CommentProps) {
    return h(
        'article',
        { className: 'yacs-comment' },
        h(
            'a',
            { className: 'yacs-avatar', href: props.authorHref },
            h('img', { className: 'yacs-avatar__img', src: props.avatar }),
        ),
        h(
            'div',
            { className: 'yacs-comment__content' },
            h(
                'a',
                { className: 'yacs-comment__author', href: props.authorHref },
                props.author,
            ),
            h('div', { className: 'yacs-comment__metadata' }, props.metadata),
            h('div', { className: 'yacs-comment__text' }, props.text),
            h('div', { className: 'yacs-comment__actions' }, props.actions),
        ),
        props.children,
    );
}
