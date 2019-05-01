export type ChildType = ChildArray | Node | string | null | undefined;
interface ChildArray extends Array<ChildType> {}

/**
 * Like `parent.appendChild()`, but for multiple children.
 * @param parent Element to append children to.
 * @param children Iterable of child elements.
 */
export function appendChildren(parent: Node, children: Iterable<ChildType>) {
    for (const child of children) {
        if (Array.isArray(child)) {
            appendChildren(parent, child);
        } else if (child != null) {
            parent.appendChild(
                typeof child === 'string'
                    ? document.createTextNode(child)
                    : child
            );
        }
    }
}

/**
 * Helper function that emulates `React.createElement`.
 * Creates and returns a new HTML element.
 * @param tagName HTML tag, such as 'div' or 'header'.
 * @param attributes Attributes to set on the tag.
 * @param children Child elements to append to the new element.
 * Strings are automatically converted to text nodes,
 * and null or undefined items are skipped.
 */
export function h<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    attributes: Partial<HTMLElementTagNameMap[K]>,
    ...children: ChildType[]
): HTMLElementTagNameMap[K] {
    const element = Object.assign(document.createElement(tagName), attributes);
    appendChildren(element, children);
    return element;
}
