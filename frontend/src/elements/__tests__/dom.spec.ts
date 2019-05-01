import { appendChildren, h } from '../dom';

describe('appendChildren', () => {
    test('should append child elements', () => {
        const parent = document.createElement('div');
        expect(parent.children).toHaveLength(0);

        appendChildren(parent, [document.createElement('span')]);
        expect(parent.children).toHaveLength(1);
        expect(parent.children[0]).toHaveProperty('tagName', 'SPAN');
    });

    test('should not replace existing children', () => {
        const parent = document.createElement('div');
        parent.appendChild(document.createElement('strong'));
        expect(parent.children).toHaveLength(1);

        appendChildren(parent, [document.createElement('span')]);
        expect(parent.children).toHaveLength(2);
        expect(parent.children[0]).toHaveProperty('tagName', 'STRONG');
        expect(parent.children[1]).toHaveProperty('tagName', 'SPAN');
    });

    test('should accept any iterable', () => {
        const parent = document.createElement('div');
        appendChildren(parent, new Set([document.createElement('span')]));
        expect(parent.children).toHaveLength(1);
        expect(parent.children[0]).toHaveProperty('tagName', 'SPAN');
    });

    test('should accept nested arrays', () => {
        const parent = document.createElement('div');
        appendChildren(parent, [
            document.createElement('span'),
            [document.createElement('strong'), document.createElement('b')],
            document.createElement('em'),
        ]);
        expect(parent.children).toHaveLength(4);
        expect(parent.children[0]).toHaveProperty('tagName', 'SPAN');
        expect(parent.children[1]).toHaveProperty('tagName', 'STRONG');
        expect(parent.children[2]).toHaveProperty('tagName', 'B');
        expect(parent.children[3]).toHaveProperty('tagName', 'EM');
    });

    test('should convert strings to text nodes', () => {
        const parent = document.createElement('div');
        appendChildren(parent, ['Hello World']);
        expect(parent.children).toHaveLength(0);
        expect(parent.childNodes).toHaveLength(1);
        expect(parent.childNodes[0]).toHaveProperty('nodeName', '#text');
        expect(parent.textContent).toBe('Hello World');
    });

    test('should skip null and undefined nodes', () => {
        const parent = document.createElement('div');
        appendChildren(parent, [
            'Hello',
            null,
            'World',
            document.createElement('span'),
            undefined,
            document.createElement('strong'),
            null,
        ]);
        expect(parent.children).toHaveLength(2);
        expect(parent.childNodes).toHaveLength(4);
        expect(parent.textContent).toBe('HelloWorld');
        expect(parent.childNodes[0]).toHaveProperty('nodeName', '#text');
        expect(parent.childNodes[1]).toHaveProperty('nodeName', '#text');
        expect(parent.childNodes[2]).toHaveProperty('nodeName', 'SPAN');
        expect(parent.childNodes[3]).toHaveProperty('nodeName', 'STRONG');
    });
});

describe('h', () => {
    test('should create an element', () => {
        expect(h('div', {})).toEqual(document.createElement('div'));
    });

    test('should assign properties to new element', () => {
        const element = h('span', {
            className: 'hello world',
            dir: 'ltr',
            hidden: false,
        });
        expect(element.dir).toBe('ltr');
        expect(element.hidden).toBe(false);
        expect(element.classList).toHaveLength(2);
        expect(Array.from(element.classList)).toEqual(['hello', 'world']);
    });

    test('should add children to new element', () => {
        const element = h(
            'div',
            { title: 'Hi World' },
            'Hello',
            null,
            'World',
            document.createElement('span'),
            undefined,
            [document.createElement('strong'), document.createElement('b')],
            document.createElement('em')
        );

        expect(element.title).toBe('Hi World');
        expect(element.textContent).toBe('HelloWorld');
        expect(element.children).toHaveLength(4);
        expect(element.children[0]).toHaveProperty('tagName', 'SPAN');
        expect(element.children[1]).toHaveProperty('tagName', 'STRONG');
        expect(element.children[2]).toHaveProperty('tagName', 'B');
        expect(element.children[3]).toHaveProperty('tagName', 'EM');
    });
});
