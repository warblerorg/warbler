<!--
    Display a Node.
-->

<script>
    import { onMount } from 'svelte';

    /** @type {string} */
    export let className;
    /** @type {Node} */
    export let content;

    let node;

    onMount(() => {
        node.appendChild(content);
    });
</script>

<div class="{className}" bind:this="{node}"></div>
