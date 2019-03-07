import { Comment } from '../communication/types';

export interface Node {
    data: Comment | null;
    children: Node[];
}

const DELETED_COMMENT: Partial<Comment> = {
    author: {
        username: '[deleted]',
        name: '[deleted]',
        website: '',
        avatar_url: '',
    },
    content: '[deleted]',
};

export class Tree {
    private readonly nodes = new Map<string, Node>();
    readonly root: Node = { data: null, children: [] };

    add(comment: Comment) {
        const node = { data: comment, children: [] };
        this.nodes.set(comment.comment_id, node);

        const parentNode = comment.parent_id
            ? this.nodes.get(comment.parent_id)
            : this.root;
        if (parentNode) {
            parentNode.children.push(node);
        }
    }

    edit(comment: Comment) {
        const node = this.nodes.get(comment.comment_id);
        if (!node) throw new TypeError(`Invalid comment ${comment.comment_id}`);

        node.data = comment;
    }

    delete(comment: Comment) {
        const node = this.nodes.get(comment.comment_id);
        if (!node) throw new TypeError(`Invalid comment ${comment.comment_id}`);

        if (node.children.length > 0) {
            node.data = Object.assign({}, node.data, DELETED_COMMENT);
        } else {
            const parentNode = comment.parent_id
                ? this.nodes.get(comment.parent_id)
                : this.root;
            if (!parentNode) {
                throw new TypeError(
                    `Invalid parent comment ${comment.parent_id}`,
                );
            }

            parentNode.children = parentNode.children.filter(n => n !== node);
        }
    }
}
