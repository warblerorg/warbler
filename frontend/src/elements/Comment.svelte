<!--
    Display a comment which can contain other nested comments.
-->

<script>
    import Avatar from './Avatar.svelte';
    import Reply from './Reply.svelte';
    import ReplyAction from './ReplyAction.svelte';
    import ReactionAction from './ReactionAction.svelte';

    /** @type {string | undefined} */
    export let avatar;
    /** @type {string | undefined} */
    export let author;
    /** @type {string | undefined} */
    export let authorHref;
    /** @type {string} */
    export let commentId;
    /** @type {string} */
    export let content;
    /** @type {Reaction[]} */
    export let reactions;

    let open = false;
</script>

<article class="warbler-comment" id="comment-{commentId}">
    <div class="warbler-comment__main">
        <Avatar {avatar} {authorHref}></Avatar>
        <div class="warbler-comment__content">
            <a class="warbler-comment__author" href="{authorHref}">{author}</a>
            <small class="warbler-comment__metadata">
                <Metadata {commentId} {createdAt} {updatedAt} {now}></Metadata>
            </small>
            <div class="warbler-comment__text">
                {@html content}
            </div>
            <small class="warbler-comment__actions">
                <ReplyAction
                    {commentId}
                    {open}
                    on:click="{evt => open = !open}"
                ></ReplyAction>
                {#each reactions as r (r.emoji)}
                <ReactionAction
                    {commentId}
                    emoji="{r.emoji}"
                    count="{r.count}"
                ></ReactionAction>
                {/each}
            </small>
        </div>
    </div>
    {#if open}
    <Reply {avatar} {authorHref} parentId="{commentId}"></Reply>
    {/if}
    <slot></slot>
</article>
