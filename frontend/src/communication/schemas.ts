export interface Comment {
    thread_id: string;
    comment_id: number;
    parent_id: number;
    author: Author;
    author_association: 'none' | 'author';
    content: string;
    created_at: string;
    updated_at: string;
    reactions: Reaction[];
    children: CommentsArray;
}

export interface MoreComment {
    comment_id: number;
    count: number;
}

export type CommentsArray = Array<Comment | MoreComment>;

export interface NewComment {
    parent_id?: string;
    content: string;
}

export interface Reaction {
    emoji: string;
    count: number;
    viewer_has_reacted: boolean;
}

export interface Author {
    username: string;
    name: string;
    website: string | null;
    avatar_url: string;
}

export function isMoreComment(
    comment: Comment | MoreComment
): comment is MoreComment {
    return 'count' in comment;
}
