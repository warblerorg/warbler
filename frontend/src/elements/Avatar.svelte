<!--
    Avatar image showing a user's avatar.
-->

<script>
    /**
     * @type {Author | undefined}
     * This user's avatar will be displayed.
     */
    export let author;
</script>

<a class="warbler-avatar" href="{author && author.website}">
    {#if author && author.avatar_url}
    <img
        class="warbler-avatar__img"
        src="{author.avatar_url}"
        alt="{author.username}"
        height="35"
        width="35"
    />
    {:else}
    <div class="warbler-avatar__img warbler-avatar__img--blank"></div>
    {/if}
</a>
