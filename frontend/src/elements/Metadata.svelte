<script>
    import Time from './Time.svelte';

    /** @type {string} */
    export let createdAt;
    /** @type {string} */
    export let updatedAt;
    /** @type {Date} */
    export let now = new Date();

    const ONE_MINUTE = 60000;

    $: createdDate = new Date(createdAt).getTime();
    $: updatedDate = new Date(updatedAt).getTime();
    $: isEdited = updatedDate - createdDate > ONE_MINUTE;
</script>

<Time time="{createdAt}" {now}></Time>
{#if isEdited}
<span title="Edited">*</span>
{/if}
