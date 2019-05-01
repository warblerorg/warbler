import { Sanitizer } from '../communication/sanitize';
import { CommentsArray, isMoreComment } from '../communication/schemas';
import { allComments, comment, reply, submitButton } from '../elements';
import { renderActions } from './render-actions';
import { renderMetadata } from './render-metadata';

export function renderComments(
    server: string,
    threadId: string,
    total: number,
    data: CommentsArray
) {
    const sanitizer = new Sanitizer();
    const childComments = data.map(function renderComment(
        com
    ): HTMLElement | null {
        return isMoreComment(com)
            ? null
            : comment({
                  avatar: com.author.avatar_url,
                  author: com.author.name,
                  authorHref: com.author.website || undefined,
                  commentId: com.comment_id,
                  text: sanitizer.sanitize(com.content),
                  metadata: renderMetadata(com),
                  actions: renderActions(com),
                  children: com.children.map(renderComment),
              });
    });
    const replyField = reply({
        server,
        children: submitButton(),
        threadId,
    });
    childComments.unshift(replyField);

    const container = allComments({
        count: total,
        children: childComments,
    });
    return container;
}
