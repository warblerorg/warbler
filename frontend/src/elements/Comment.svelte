<!--
    Display a comment.
    Additional elements can be displayed below the comment using its slot.
-->

<script>
    import { onMount } from 'svelte';
    import Avatar from './Avatar.svelte';
    import Reply from './Reply.svelte';
    import ReplyAction from './ReplyAction.svelte';
    import ReactionAction from './ReactionAction.svelte';
    import Metadata from './Metadata.svelte';
    import Node from './Node.svelte';

    /** @type {string} */
    export let server;
    /**
     * @type {Comment}
     * Comment to display.
     */
    export let comment;
    /**
     * @type {DocumentFragment}
     * Santilized element containing the content of the comment.
     */
    export let content;
    /**
     * @type {Date | undefined}
     * The current time.
     */
    export let now = undefined;

    let open = false;
</script>

<article class="warbler-comment" id="comment-{comment.comment_id}">
    <div class="warbler-comment__main">
        <Avatar author="{comment.author}"></Avatar>
        <div class="warbler-comment__content">
            <a class="warbler-comment__author" href="{comment.author.website}"
                >{comment.author.name}</a
            >
            <small class="warbler-comment__metadata">
                <Metadata {comment} {now}></Metadata>
            </small>
            <Node className="warbler-comment__text" {content}></Node>
            <small class="warbler-comment__actions">
                <ReplyAction
                    commentId="{comment.comment_id}"
                    {open}
                    on:click="{evt => open = !open}"
                ></ReplyAction>
                <ReactionAction
                    commentId="{comment.comment_id}"
                    reactions="{comment.reactions}"
                ></ReactionAction>
            </small>
        </div>
    </div>
    {#if open}
    <Reply
        {server}
        parentId="{comment.comment_id}"
        threadId="{comment.thread_id}"
    ></Reply>
    {/if}
    <slot></slot>
</article>
