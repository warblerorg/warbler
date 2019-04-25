<!--
    Displays metadata for a comment.
-->

<script>
    import { timeProps } from './time-props';

    /**
     * @type {Comment}
     * Comment to display metadata for.
     */
    export let comment;
    /**
     * @type {Date}
     * The current time.
     */
    export let now = new Date();

    const ONE_MINUTE = 60000;

    $: createdDate = new Date(comment.created_at).getTime();
    $: updatedDate = new Date(comment.updated_at).getTime();
    // If true, show an indicator that this comment was edited.
    $: isEdited = updatedDate - createdDate > ONE_MINUTE;

    // Use `timeProps` to get an ISO string and formatted time to display.
    $: props = timeProps(createdDate, now);
</script>

<time datetime="{props.datetime}">{props.formatted}</time>
{#if isEdited}
<span title="Edited">*</span>
{/if}
