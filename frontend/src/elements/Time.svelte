<!--
    Button to react to a comment.
-->

<script>
    import { timeProps } from './time-props.ts';

    /** @type {string | number | Date} */
    export let time;
    /** @type {Date} */
    export let now = new Date();

    $: props = timeProps(time, now);
</script>

<time datetime="{props.datetime}">{props.formatted}</time>
