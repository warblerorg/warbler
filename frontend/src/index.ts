import { warbler } from './warbler';

const warble = warbler({ threadId: 'zoo-house', server: 'http://localhost' });

document.body.appendChild(warble.element);
