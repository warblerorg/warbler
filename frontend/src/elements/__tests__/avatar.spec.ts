import { avatar } from '../avatar';

describe('avatar element', () => {
    test('should return a link', () => {
        const element = avatar({});
        expect(element.tagName).toBe('A');
        expect(element.className).toBe('yacs-avatar');
    });

    test('should set href if provided', () => {
        expect(avatar({ authorHref: 'https://example.com' })).toHaveProperty(
            'href',
            'https://example.com/',
        );
    });

    test('should return a div when no image is specified', () => {
        const element = avatar({});
        expect(element.childNodes).toHaveLength(1);
        expect(element.childNodes[0]).toMatchObject(
            expect.objectContaining({
                tagName: 'DIV',
                className: 'yacs-avatar__img yacs-avatar__img--blank',
            }),
        );
    });

    test('should return an img when an image is specified', () => {
        const element = avatar({ avatar: 'https://example.com/profile.jpg' });
        expect(element.childNodes).toHaveLength(1);
        expect(element.childNodes[0]).toMatchObject(
            expect.objectContaining({
                tagName: 'IMG',
                className: 'yacs-avatar__img',
                src: 'https://example.com/profile.jpg',
                alt: '',
                height: 35,
                width: 35,
            }),
        );
    });
});
