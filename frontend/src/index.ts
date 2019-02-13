import { allComments } from './all-comments';
import { comment } from './comment';

document.body.appendChild(
    allComments({
        count: 3,
        children: [
            comment({
                text: 'Hello World!',
                children: comment({ text: 'Hello gal!' }),
            }),
            comment({ text: 'Welcome to YACS.' }),
        ],
    }),
);
