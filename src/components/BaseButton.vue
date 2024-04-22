<script setup>


</script>

<template>
    <button>
        <slot></slot>
    </button>
</template>

<style scoped>
button {
    background-color: #ddd;
    color: #666;
    font-weight: 500;
    border: none;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    box-shadow: inset 0 9px 2px -7px rgba(255, 255, 255, 0.7), inset 0px -4px 6px -6px black;
    outline: 1px solid #ccc;
}

button:active {
    box-shadow: none;
}
</style>