<!--
    Button to reply to a comment.
-->

<script>
    /** @type {number} */
    export let commentId = -1;
    /** @type {boolean} */
    export let open = false;
</script>

<button
    class="warbler-action"
    class:warbler-action--open="{open}"
    type="button"
    data-type="reply"
    data-comment-id="{commentId}"
    on:click
>
    <slot>Reply</slot>
</button>
