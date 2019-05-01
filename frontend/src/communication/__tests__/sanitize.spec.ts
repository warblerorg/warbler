import { Sanitizer } from '../sanitize';

describe('Sanitize', () => {
    let sanitizer = new Sanitizer();

    test('should convert string to node', () => {
        const fragment = sanitizer.sanitize('Hello world!');
        expect(fragment.textContent).toBe('Hello world!');
        expect(fragment.childNodes).toHaveLength(1);
        expect(fragment.childNodes[0]).toHaveProperty('nodeName', '#text');
    });

    test('should ignore comments', () => {
        const fragment = sanitizer.sanitize('Hello <!--invisible-->world!');
        expect(fragment.textContent).toBe('Hello world!');

        fragment.childNodes.forEach(node =>
            expect(node).not.toHaveProperty('nodeName', '#comment')
        );
    });

    test('should turn blocked elements into text', () => {
        const fragment = sanitizer.sanitize(
            '<script>alert("Destroy all webpages")</script>'
        );
        expect(fragment.textContent).toBe(
            '<script>alert("Destroy all webpages")</script>'
        );
        expect(fragment.children).toHaveLength(0);
    });

    test('should keep allowed elements', () => {
        const fragment = sanitizer.sanitize('<div></div>');
        expect(fragment.textContent).toBe('');
        expect(fragment.children).toHaveLength(1);
        expect(fragment.children[0]).toHaveProperty('tagName', 'DIV');
    });

    test('should remove blocked attributes', () => {
        const fragment = sanitizer.sanitize(
            `<img alt="Safety" onload="alert('Break things')">`
        );
        expect(fragment.children).toHaveLength(1);
        expect(fragment.children[0]).toHaveProperty('tagName', 'IMG');

        const attrs = fragment.children[0].attributes;
        expect(attrs).toHaveLength(1);
        expect(attrs.getNamedItem('alt')).toHaveProperty('value', 'Safety');
        expect(attrs.getNamedItem('onload')).toBeNull();
    });

    test('should allow links', () => {
        const fragment = sanitizer.sanitize(
            '<a href="https://example.com">Hi</a>'
        );
        expect(fragment.childNodes).toHaveLength(1);
        expect(fragment.childNodes[0]).toHaveProperty('tagName', 'A');
        expect(fragment.childNodes[0]).toHaveProperty(
            'href',
            'https://example.com/'
        );
        expect(fragment.childNodes[0]).toHaveProperty('textContent', 'Hi');
    });

    describe('should allow various link hosts', () => {
        const links = [
            'http://example.com/',
            'https://example.org/',
            'mailto:doctor@tardis.net',
            'xmpp:romeo@montague.net?message',
            'irc://irc.rizon.net',
            'ircs://irc.freenode.net:6697/linux',
        ];
        for (const link of links) {
            test(`allow ${link}`, () => {
                const fragment = sanitizer.sanitize(`<a href="${link}"></a>`);
                expect(fragment.children[0]).toHaveProperty('href', link);
            });
        }
    });

    test('should block javascript links', () => {
        const fragment = sanitizer.sanitize(
            `<a href="javascript:void(0)"></a>`
        );
        expect(fragment.children[0]).not.toHaveProperty(
            'href',
            'javascript:void(0)'
        );
    });

    test('should allow relative links', () => {
        expect(
            sanitizer.sanitize('<a href="/root/page"></a>').children[0]
        ).toHaveProperty('href', 'http://localhost/root/page');
        expect(
            sanitizer.sanitize('<a href="relative/link"></a>').children[0]
        ).toHaveProperty('href', 'http://localhost/relative/link');
        expect(
            sanitizer.sanitize('<a href="#id-on-page"></a>').children[0]
        ).toHaveProperty('href', 'http://localhost/#id-on-page');
    });
});
