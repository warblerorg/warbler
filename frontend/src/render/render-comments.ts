import { Sanitizer } from '../communication/sanitize';
import { CommentsArray, isMoreComment } from '../communication/schemas';
import { allComments, comment } from '../elements';
import { renderActions } from './render-actions';
import { renderMetadata } from './render-metadata';

export function renderComments(total: number, data: CommentsArray) {
    const sanitizer = new Sanitizer();
    const container = allComments({
        count: total,
        children: data.map(function renderComment(com): HTMLElement | null {
            const commentId = com.comment_id;
            return isMoreComment(com)
                ? null
                : comment({
                      avatar: com.author.avatar_url,
                      author: com.author.name,
                      authorHref: com.author.website,
                      commentId,
                      text: sanitizer.sanitize(com.content),
                      metadata: renderMetadata(com),
                      actions: renderActions(com),
                      children: com.children.map(renderComment),
                  });
        }),
    });
    return container;
}
