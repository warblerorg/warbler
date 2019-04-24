<!--
    Button to react to a comment.
-->

<script>
    /** @type {number} */
    export let commentId = -1;
    /** @type {string} */
    export let emoji;
    /** @type {number} */
    export let count;
</script>

<button
    class="warbler-action"
    type="button"
    data-type="react"
    data-comment-id="{commentId}"
>
    {emoji} {count}
</button>
