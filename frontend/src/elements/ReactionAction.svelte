<!--
    Button to react to a comment.
-->

<script>
    /** @type {number} */
    export let commentId = -1;
    /** @type {Reaction[]} */
    export let reactions;
</script>

{#each reactions as r (r.emoji)}
<button
    class="warbler-action"
    type="button"
    data-type="react"
    data-comment-id="{commentId}"
>
    {r.emoji} {r.count}
</button>
{/each}
