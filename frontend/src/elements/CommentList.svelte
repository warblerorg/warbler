<!--

-->

<script>
    import { Sanitizer } from '../communication/sanitize.ts';
    import { isMoreComment } from '../communication/schemas.ts';
    import Comment from './Comment.svelte';

    /** @type {CommentsArray} */
    export let comments;

    const sanitizer = new Sanitizer();
    const now = new Date();
</script>

{#each data.comments as com (com.comment_id)} {#if isMoreComment(com)}
<span>...more</span>
{:else}
<Comment
    avatar="{com.author.avatar_url}"
    author="{com.author.name}"
    authorHref="{com.author.website}"
    commentId="{com.comment_id}"
    reactions="{com.reactions}"
    content="{sanitizer.sanitize(com.content)}"
    createdAt="{com.created_at}"
    updatedAt="{com.updated_at}"
    {now}
>
    <svelte:self comments="{com.children}" {threadId} {server}></svelte:self>
</Comment>
{/if} {/each}
