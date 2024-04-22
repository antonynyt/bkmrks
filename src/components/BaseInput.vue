<script setup>
import BaseKbd from './BaseKbd.vue';


defineProps(['name'])

const model = defineModel({
    prop: 'model',
    event: 'input'
})

</script>

<template>
    <label :for="name">
        <input v-model="model" :id="name" v-bind="$attrs"/>
        <BaseKbd :keys="['⌘', 'K']"/>
    </label>
</template>

<style scoped>
    label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0 1rem;
        font-size: 1rem;
        border: 1px solid #ddd;
        border-radius: 10px;
        outline: 2px solid #ccc;
        outline-offset: 2px;
        box-sizing: border-box;
    }

    input {
        border: none;
        outline: none;
        font-size: 1rem;
        flex-grow: 1;
        padding: 10px 0;
    }
    
    label:has(input:focus) {
        outline-color: #2f7fd4;
        box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
    }

</style>