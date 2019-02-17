const PROTOCOL_REGEX = /^(?:[a-z]+:)/;

const relative: unique symbol = Symbol(':relative');
const ANCHOR_SCHEMES = Object.freeze([
    'http',
    'https',
    'mailto',
    'xmpp',
    relative,
    'irc',
    'ircs',
]);
const ALLOWED_ATTRIBUTES = new Set([
    'abbr',
    'accept',
    'accept-charset',
    'accesskey',
    'action',
    'align',
    'alt',
    'aria-describedby',
    'aria-hidden',
    'aria-label',
    'aria-labelledby',
    'axis',
    'border',
    'cellpadding',
    'cellspacing',
    'char',
    'charoff',
    'charset',
    'checked',
    'clear',
    'cols',
    'colspan',
    'color',
    'compact',
    'coords',
    'datetime',
    'dir',
    'disabled',
    'enctype',
    'for',
    'frame',
    'headers',
    'height',
    'hreflang',
    'hspace',
    'ismap',
    'label',
    'lang',
    'maxlength',
    'media',
    'method',
    'multiple',
    'name',
    'nohref',
    'noshade',
    'nowrap',
    'open',
    'prompt',
    'readonly',
    'rel',
    'rev',
    'rows',
    'rowspan',
    'rules',
    'scope',
    'selected',
    'shape',
    'size',
    'span',
    'start',
    'summary',
    'tabindex',
    'target',
    'title',
    'type',
    'usemap',
    'valign',
    'value',
    'vspace',
    'width',
    'itemprop',
]);

const WHITELIST = Object.freeze({
    elements: new Set([
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'h7',
        'h8',
        'br',
        'b',
        'i',
        'strong',
        'em',
        'a',
        'pre',
        'code',
        'img',
        'tt',
        'div',
        'ins',
        'del',
        'sup',
        'sub',
        'p',
        'ol',
        'ul',
        'table',
        'thead',
        'tbody',
        'tfoot',
        'blockquote',
        'dl',
        'dt',
        'dd',
        'kbd',
        'q',
        'samp',
        'var',
        'hr',
        'ruby',
        'rt',
        'rp',
        'li',
        'tr',
        'td',
        'th',
        's',
        'strike',
        'summary',
        'details',
        'caption',
        'figure',
        'figcaption',
        'abbr',
        'bdo',
        'cite',
        'dfn',
        'mark',
        'small',
        'span',
        'time',
        'wbr',
    ]),
    attributes: Object.freeze({
        a: new Set(['href']),
        img: new Set(['src', 'longdesc']),
        div: new Set(['itemscope', 'i']),
        blockquote: new Set(['cite']),
        del: new Set(['cite']),
        ins: new Set(['cite']),
        q: new Set(['cite']),
        all: ALLOWED_ATTRIBUTES,
    }) as {
        readonly all: Set<string>;
        readonly [nodeName: string]: Set<string> | undefined;
    },
    protocols: Object.freeze({
        a: Object.freeze({ href: ANCHOR_SCHEMES }),
        blockquote: { cite: Object.freeze(['http', 'https', relative]) },
        del: { cite: Object.freeze(['http', 'https', relative]) },
        ins: { cite: Object.freeze(['http', 'https', relative]) },
        q: { cite: Object.freeze(['http', 'https', relative]) },
        img: Object.freeze({
            src: Object.freeze(['http', 'https', relative]),
            longdesc: Object.freeze(['http', 'https', relative]),
        }),
    }) as {
        readonly [nodeName: string]: {
            [attr: string]: ReadonlyArray<string | typeof relative>;
        };
    },
});

/**
 * Sanitize HTML to only allow a subset of tags and attributes.
 * @example
 * const sanitized = new Sanitizer().sanitize(userInput);
 * document.body.appendChild(sanitized);
 */
export class Sanitizer {
    private doc: Document;

    constructor() {
        this.doc = document.implementation.createHTMLDocument();
    }

    sanitize(input: string): DocumentFragment {
        const container = this.doc.createElement('div');
        container.innerHTML = input;
        const sanitized = this.sanitizeNode(container);

        const result = document.createDocumentFragment();
        while (sanitized.firstChild) {
            result.appendChild(document.adoptNode(sanitized.firstChild));
        }
        return result;
    }

    private sanitizeNode(node: Node): Node {
        const nodeName = node.nodeName.toLowerCase();
        if (nodeName === '#text') {
            return node; // Text is always safe
        } else if (nodeName === '#comment') {
            return this.doc.createTextNode(''); // Strip comments
        }
        // Stringify unwanted elements
        const element = node as Element;
        if (!WHITELIST.elements.has(nodeName)) {
            return this.doc.createTextNode(element.outerHTML);
        }

        // Duplicate the element and copy attributes
        const copy = this.doc.createElement(nodeName);
        const allowedAttrs = WHITELIST.attributes[nodeName];
        Array.from(element.attributes, attr => {
            if (
                WHITELIST.attributes.all.has(attr.name) ||
                (allowedAttrs && allowedAttrs.has(attr.name))
            ) {
                copy.setAttribute(attr.name, this.sanitizeAttr(attr, nodeName));
            }
        });

        while (element.firstChild) {
            const child = element.removeChild(element.firstChild);
            copy.appendChild(this.sanitizeNode(child));
        }
        return copy;
    }

    private sanitizeAttr(attr: Attr, nodeName: string) {
        if (!attr.value) return '';
        const allowedProtocols =
            WHITELIST.protocols[nodeName] &&
            WHITELIST.protocols[nodeName][attr.name];
        if (allowedProtocols == null) return attr.value;
        for (const protocol of allowedProtocols) {
            if (protocol === relative) {
                if (!PROTOCOL_REGEX.test(attr.value)) return attr.value;
            } else if (attr.value.startsWith(`${protocol}:`)) {
                return attr.value;
            }
        }
        return '';
    }
}
