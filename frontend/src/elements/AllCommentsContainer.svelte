<!--
    Wrapper for all comments.
-->

<script>
    /** @type {number | undefined} */
    export let count;
</script>

<div class="warbler-all-comments">
    <h6 class="warbler-all-comments__title">
        <span class="warbler-all-comments__count">
            {count != undefined ? count : 'Loading'}
        </span>
        Comments
    </h6>
    <slot></slot>
</div>
