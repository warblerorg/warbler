import { reply, submitButton } from '../reply';

describe('reply element', () => {
    test('should return form', () => {
        const element = reply({
            action: 'https://example.com',
            children: submitButton({}),
        });
        expect(element.tagName).toBe('FORM');
        expect(element.className).toBe('warbler-comment warbler-reply');
        expect(element.action).toBe('https://example.com/');
        expect(element.method).toBe('post');

        expect(element.children).toHaveLength(1);
        expect(element.children[0].tagName).toBe('DIV');
        expect(element.children[0].className).toBe(
            'warbler-comment__main warbler-reply__main',
        );
        expect(element.children[0].children).toHaveLength(2);
    });

    test('should include avatar', () => {
        const element = reply({
            action: 'https://example.com',
        });
        const main = element.children[0];

        expect(main.children[0]).toHaveProperty('className', 'warbler-avatar');
    });

    test('should include textarea', () => {
        const element = reply({
            action: 'https://example.com',
        });
        const main = element.children[0];
        const content = main.children[1];

        expect(content.children).toHaveLength(1);
        expect(content.children[0].tagName).toBe('TEXTAREA');
        expect(content.children[0].className).toBe('warbler-reply__input');
        expect(content.children[0].getAttribute('aria-label')).toBe('Reply');
        expect(content.children[0]).toHaveProperty('name', 'reply');
        expect(content.children[0]).toHaveProperty('required', true);
    });

    test('should append children after textarea', () => {
        const element = reply({
            action: 'https://example.com',
            children: submitButton({}),
        });
        const main = element.children[0];
        const content = main.children[1];

        expect(content.children).toHaveLength(2);
        expect(content.children[0].tagName).toBe('TEXTAREA');
        expect(content.children[1].tagName).toBe('BUTTON');

        const button = content.children[1];
        expect(button).toMatchObject(
            expect.objectContaining({
                className: 'warbler-reply__submit',
                type: 'submit',
                textContent: 'Add reply',
            }),
        );
    });
});
