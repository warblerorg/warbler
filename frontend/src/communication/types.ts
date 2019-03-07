export interface Author {
    username: string;
    name: string;
    website: string;
    avatar_url: string;
}

export interface Comment {
    thread_id: string;
    comment_id: string;
    parent_id: string;
    author: Author;
    content: string;
}

export interface NewComment {
    thread_id: string;
    comment_id?: string;
    parent_id?: string;
    content: string;
}
