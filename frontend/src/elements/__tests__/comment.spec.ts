import { comment } from '../comment';

describe('comment element', () => {
    test('should return article', () => {
        const element = comment({});
        expect(element.tagName).toBe('ARTICLE');
        expect(element.className).toBe('warbler-comment');

        expect(element.children).toHaveLength(1);
        expect(element.children[0].tagName).toBe('DIV');
        expect(element.children[0].className).toBe('warbler-comment__main');
        expect(element.children[0].children).toHaveLength(2);
    });

    test('should include avatar', () => {
        const element = comment({});
        const main = element.children[0];

        expect(main.children[0]).toHaveProperty('className', 'warbler-avatar');
    });
});
