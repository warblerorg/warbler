import { Sanitizer } from '../communication/sanitize';
import {
    Comment,
    CommentsArray,
    isMoreComment,
    MoreComment,
} from '../communication/schemas';
import { allComments, comment } from '../elements';

export function renderComments(
    threadId: string,
    total: number,
    data: CommentsArray,
) {
    const sanitizer = new Sanitizer();
    const container = allComments({
        threadId,
        count: total,
        children: data.map(function renderComment(
            com: Comment | MoreComment,
        ): HTMLElement | null {
            return isMoreComment(com)
                ? null
                : comment({
                      avatar: com.author.avatar_url,
                      author: com.author.name,
                      authorHref: com.author.website,
                      commentId: com.comment_id,
                      text: sanitizer.sanitize(com.content),
                      children: com.children.map(renderComment),
                  });
        }),
    });
    return container;
}
