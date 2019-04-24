<!--
    Let the user input their reply as a new comment.
-->

<script>
    import { threadUrl } from '../communication/urls.ts';
    import { addComment } from '../communication/index.ts';
    import Avatar from './Avatar.svelte';
    import SubmitButton from './SubmitButton.svelte';

    /** @type {string} */
    export let server;
    /** @type {string | undefined} */
    export let avatar;
    /** @type {string | undefined} */
    export let authorHref;
    /** @type {string | undefined} */
    export let label = 'Reply';
    /** @type {string | undefined} */
    export let parentId;
    /** @type {string} */
    export let threadId;

    $: action = server + threadUrl(threadId);
    let content = '';

    /**
     * @param {Event} evt
     */
    function handleReplySubmit(evt) {
        const form = /** @type {HTMLFormElement} */ (evt.currentTarget);
        evt.preventDefault();

        return addComment(
            server,
            threadId,
            content,
            parentId != null ? parseInt(parentId.value, 10) : undefined
        );
    }
</script>

<form class="warbler-comment warbler-reply" {action} method="post">
    {#if parentId}
    <input type="hidden" name="parent_id" value="{parentId}" />
    {/if}
    <input type="hidden" name="thread_id" value="{threadId}" />
    <div class="warbler-comment__main warbler-reply__main">
        <Avatar {avatar} {authorHref}></Avatar>
        <div class="warbler-comment__content warbler-reply__content">
            <textarea
                class="warbler-reply__input"
                name="content"
                required
                aria-label="{label}"
                bind:value="{content}"
            ></textarea>
            <SubmitButton></SubmitButton>
        </div>
    </div>
</form>
