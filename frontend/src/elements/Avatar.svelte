<!--
    Avatar image showing a user's avatar.
-->

<script>
    /** @type {string | undefined} */
    export let avatar;
    /** @type {string | undefined} */
    export let authorHref;
</script>

<a class="warbler-avatar" href="{authorHref}">
    {#if avatar}
    <img
        class="warbler-avatar__img"
        src="{avatar}"
        alt=""
        height="35"
        width="35"
    />
    {:else}
    <div class="warbler-avatar__img warbler-avatar__img--blank"></div>
    {/if}
</a>
