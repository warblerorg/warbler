import { Comment } from '../communication/schemas';
import { time } from '../elements/time';
import { ChildType, h } from '../elements/dom';

const ONE_MINUTE = 60000;

export function renderMetadata(
    { created_at, updated_at }: Comment,
    now = new Date(),
): ChildType {
    const timeElement = time({ time: created_at, now });
    const isEdited =
        new Date(updated_at).getTime() - new Date(created_at).getTime() >
        ONE_MINUTE;
    if (isEdited) {
        return [timeElement, h('span', { title: 'Edited' }, '*')];
    } else {
        return timeElement;
    }
}
