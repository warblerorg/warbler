import { addComment } from '../communication';

export function handleReplySubmit(server: string) {
    return (evt: Event) => {
        const form = evt.currentTarget as HTMLFormElement;
        evt.preventDefault();

        const threadId = form.elements.namedItem(
            'thread_id',
        ) as HTMLInputElement;
        const parentId = form.elements.namedItem(
            'parent_id',
        ) as HTMLInputElement | null;
        const content = form.elements.namedItem('content') as HTMLInputElement;

        return addComment(
            server,
            threadId.value,
            content.value,
            parentId != null ? parseInt(parentId.value, 10) : undefined,
        );
    };
}
