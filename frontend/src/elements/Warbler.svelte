<!--

-->

<script>
    import AllCommentsContainer from './AllCommentsContainer.svelte';
    import CommentList from './CommentList.svelte';
    import Reply from './Reply.svelte';

    /** @type {Promise<{ total: number, comments: CommentsArray }>} */
    export let promise;
    /** @type {string} */
    export let threadId;
    /** @type {string} */
    export let server;
</script>

<section class="warbler" data-thread-id="{threadId}">
    {#await promise then data}
    <AllCommentsContainer count="{data.total}">
        <Reply {threadId} {server} on:submit="{replyHandler}"></Reply>
        <CommentList comments="{data.comments}"></CommentList>
    </AllCommentsContainer>
    {/await}
</section>
