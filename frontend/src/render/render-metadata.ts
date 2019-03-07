import { Comment } from '../communication/schemas';
import { time } from '../elements/time';
import { ChildType } from '../elements/dom';

const ONE_MINUTE = 60000;

export function renderMetadata(
    { created_at, updated_at }: Comment,
    now = new Date(),
): ChildType {
    const edited =
        new Date(updated_at).getTime() - new Date(created_at).getTime() >
        ONE_MINUTE
            ? '*'
            : null;
    return [time({ time: created_at, now }), edited];
}
