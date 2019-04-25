<!--
    Display a tree of comments.
-->

<script>
    import { Sanitizer } from '../communication/sanitize.js';
    import { isMoreComment } from '../communication/schemas.js';
    import Comment from './Comment.svelte';

    /**
     * @type {CommentsArray}
     * Comment tree to display.
     */
    export let comments;
    /** @type {string} */
    export let threadId;
    /** @type {string} */
    export let server;
    /**
     * @type {Date | undefined}
     * The current time.
     */
    export let now = undefined;

    const sanitizer = new Sanitizer();
</script>

{#each comments as comment (comment.comment_id)} {#if isMoreComment(comment)}
<span>...more</span>
{:else}
<Comment {server} {comment} content="{sanitizer.sanitize(comment.content)}">
    <svelte:self
        comments="{comment.children}"
        {threadId}
        {server}
        {now}
    ></svelte:self>
</Comment>
{/if} {/each}
