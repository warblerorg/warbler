/**
 * `callback` is called each time a line of JSON is streamed in.
 * @param response Readable stream to read, such as a fetch Response body.
 * @param callback Callback function called with each entry.
 */
export function newlineDelimitedJsonStream<T = unknown>(
    response: ReadableStream,
    callback: (line: T) => void,
) {
    const reader = response.getReader();
    const decoder = new TextDecoder();
    const options = { stream: true };
    let textBuffer = '';

    return reader
        .read()
        .then(function processResult({ done, value }): Promise<void> {
            if (done) {
                textBuffer = textBuffer.trim();
                if (textBuffer.length > 0) {
                    const line = JSON.parse(textBuffer);
                    callback(line);
                }

                return Promise.resolve();
            } else {
                textBuffer += decoder.decode(value, options);
                textBuffer = newlineDelimitedJson(
                    textBuffer,
                    callback,
                    options,
                )!;

                return reader.read().then(processResult);
            }
        });
}

/**
 * `callback` is called each time for each line of JSON in the text.
 * @param data Text with JSON separated by newlines.
 * @param callback Callback function called with each entry.
 * @returns Leftover data
 */
export function newlineDelimitedJson<T = unknown>(
    data: string,
    callback: (line: T) => void,
): void;
export function newlineDelimitedJson<T = unknown>(
    data: string,
    callback: (line: T) => void,
    options?: { stream?: boolean },
): string | undefined;
export function newlineDelimitedJson<T = unknown>(
    data: string,
    callback: (line: T) => void,
    options: { stream?: boolean } = {},
) {
    const lines = data.split('\n');
    let leftover: string | undefined;
    if (options.stream) leftover = lines.pop();

    for (const line of lines) {
        callback(JSON.parse(line));
    }

    return leftover;
}
