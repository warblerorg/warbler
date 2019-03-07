export interface Comment {
    thread_id: string;
    comment_id: string;
    parent_id: string;
    author: Author;
    author_association: 'none' | 'author';
    content: string;
    created_at: string;
    updated_at: string;
    reactions: Reaction[];
    children: CommentsArray;
}

export interface MoreComment {
    comment_id: string;
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
    website: string;
    avatar_url: string;
}
