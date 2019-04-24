import Avatar from '../Avatar.svelte';

describe('Avatar element', () => {
    test('should return a link', () => {
        const container = document.createElement('div');
        const avatar = new Avatar({ target: container, props: {} });
        const element = container.children[0];

        expect(element.tagName).toBe('A');
        expect(element.className).toBe('warbler-avatar');
    });

    test('should set href if provided', () => {
        const container = document.createElement('div');
        const avatar = new Avatar({
            target: container,
            props: { authorHref: 'https://example.com' },
        });
        const element = container.children[0];

        expect(element).toHaveProperty('href', 'https://example.com/');
    });

    test('should return a div when no image is specified', () => {
        const container = document.createElement('div');
        const avatar = new Avatar({ target: container, props: {} });
        const element = container.children[0];

        expect(element.childNodes).toHaveLength(1);
        expect(element.childNodes[0]).toMatchObject(
            expect.objectContaining({
                tagName: 'DIV',
                className: 'warbler-avatar__img warbler-avatar__img--blank',
            })
        );
    });

    test('should return an img when an image is specified', () => {
        const container = document.createElement('div');
        const avatar = new Avatar({
            target: container,
            props: { avatar: 'https://example.com/profile.jpg' },
        });
        const element = container.children[0];

        expect(element.childNodes).toHaveLength(1);
        expect(element.childNodes[0]).toMatchObject(
            expect.objectContaining({
                tagName: 'IMG',
                className: 'warbler-avatar__img',
                src: 'https://example.com/profile.jpg',
                alt: '',
                height: 35,
                width: 35,
            })
        );
    });
});
