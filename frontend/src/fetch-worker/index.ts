import { handleMessage } from './router';

export declare var self: DedicatedWorkerGlobalScope;

self.addEventListener('message', evt => handleMessage(evt.data, postMessage));
