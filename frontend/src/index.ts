import { allComments } from './all-comments';
import { comment } from './comment';
import { h } from './dom';

document.body.appendChild(
    allComments({
        count: 3,
        children: [
            comment({
                author: 'Daphne Liu',
                metadata: 'Today at 4:30pm',
                actions: h('button', { className: 'yacs-action' }, 'Reply'),
                text: 'Hello World!',
                children: comment({
                    author: 'Tiger Oakes',
                    metadata: 'Today at 5:30pm',
                    actions: h('button', { className: 'yacs-action' }, 'Reply'),
                    text: 'Hello gal!',
                }),
            }),
            comment({
                author: 'Em',
                text: 'Welcome to YACS.',
                metadata: 'Today at 5:00pm',
                actions: h('button', { className: 'yacs-action' }, 'Reply'),
            }),
        ],
    }),
);
