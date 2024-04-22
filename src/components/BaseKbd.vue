<script setup>

defineProps(['keys'])

</script>

<template>
    <span class="keys">
        <kbd v-for="key in keys" :key>{{ key }}</kbd>
    </span>
</template>

<style scoped>
.keys {
        display: flex;
        gap: 0.2rem;
        padding: 0 0.5rem;
        background-color: #f0f0f0;
        border-radius: 5px;
        color: #666;
}

kbd {
    font-size: 0.9em;
    font-family: inherit;
}


</style>