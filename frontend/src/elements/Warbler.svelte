<script>
    import CommentList from './CommentList.svelte';
    import Reply from './Reply.svelte';

    /** type {Promise<{ total: number, comments: CommentsArray }>} */
    export let commentsPromise;
    /** type {string} */
    export let threadId;
    /** type {string} */
    export let server;
</script>

<section class="warbler" data-thread-id="{threadId}">
    <div class="warbler-all-comments">
        {#await commentsPromise}
        <h6
            class="warbler-all-comments__title warbler-all-comments__title--loading"
        >
            Loading...
        </h6>
        {:then data}
        <h6 class="warbler-all-comments__title">
            <span class="warbler-all-comments__count">
                {data.total}
            </span>
            Comments
        </h6>
        {:catch error}
        <h6
            class="warbler-all-comments__title warbler-all-comments__title--error"
        >
            Could not load comments. {error.message}
        </h6>
        {/await}
        <Reply {threadId} {server}></Reply>
        {#await commentsPromise then data}
        <CommentList
            comments="{data.comments}"
            {threadId}
            {server}
        ></CommentList>
        {/await}
    </div>
</section>
