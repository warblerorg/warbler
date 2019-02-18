import { allComments } from '../all-comments';

describe('all-comments element', () => {
    test('should return a section with header', () => {
        const element = allComments({ count: 0 });
        expect(element.tagName).toBe('SECTION');
        expect(element.className).toBe('yacs-all-comments');

        expect(element.children).toHaveLength(1);
        expect(element.children[0].tagName).toBe('H6');
        expect(element.children[0].className).toBe('yacs-all-comments__title');
    });

    test('should have span with count in header', () => {
        const element = allComments({ count: 10 });
        const header = element.children[0];
        expect(header.textContent).toBe('10 comments');
        expect(header.childNodes).toHaveLength(2);

        expect(header.childNodes[0]).toHaveProperty('nodeName', 'SPAN');
        expect(header.childNodes[0]).toHaveProperty(
            'className',
            'yacs-all-comments__count',
        );
        expect(header.childNodes[0].textContent).toBe('10');

        expect(header.childNodes[1]).toHaveProperty('nodeName', '#text');
        expect(header.childNodes[1].textContent).toBe(' comments');
    });

    test('should append children', () => {
        const element = allComments({
            count: 0,
            children: allComments({ count: 1 }),
        });

        expect(element.children).toHaveLength(2);
        expect(element.children[1]).toHaveProperty('tagName', 'SECTION');
    });
});
