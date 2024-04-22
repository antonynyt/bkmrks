<script setup>
import { computed } from 'vue';
import BaseButton from './BaseButton.vue';
import { bookmarks } from '../stores/bookmarks';


const props = defineProps({
 bookmark: Object,
});

const getUrlHost = computed((url) => {
    return (url) => {
        return new URL(url).hostname;
    }
})

const getFavicon = (url) => `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=64`

const deleteBookmark = (bookmark) => {
    bookmarks.value = bookmarks.value.filter((item) => item !== bookmark)
}

</script>

<template>
    <li class="bookmark__list" role="tab" tabindex="0">
        <div class="bookmark__header">
            <div v-if="bookmark.url" class="bookmark__icon">
                <img :src="getFavicon(bookmark.url)" alt="">
            </div>
            <div v-else-if="bookmark.isColor" class="bookmark__icon" :style="{ backgroundColor: bookmark.title }"></div>
            <div v-else class="bookmark__icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>
            </div>
            <input type="text" v-model="bookmark.title" class="bookmark__title" :id="`bookmark-${bookmark.created_at}`" tabindex="-1" placeholder="Enter title..."
        </div>
        <div class="bookmark__infos">
            <a v-if="bookmark.url" :href="bookmark.url" class="bookmark__url" target="_blank" rel="noopener" tabindex="-1">{{ getUrlHost(bookmark.url) }}</a>
            <BaseButton @click="deleteBookmark(bookmark)" class="bookmark__delete" tabindex="-1">Delete</BaseButton>
        </div>
    </li>
</template>

<style scoped>
.bookmark__list {
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.bookmark__list:hover, .bookmark__list:focus {
    background-color: #f0f0f0;
    outline: none;
}

.bookmark__header {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-grow: 1;
}

.bookmark__infos {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
}

.bookmark__infos p {
    margin: 0;
    line-height: 100%;
}

.bookmark__icon {
    width: 20px;
    height: 20px;
    border-radius: 50px;
    flex-shrink: 0;
}

.bookmark__icon svg {
    width: 100%;
    height: 100%;
    fill: #333;
}

.bookmark__icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
}

.bookmark__title {
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    border: none;
    background-color: transparent;
    outline: none;
    display: block;
    padding: 0;
    margin: 0;
    line-height: 100%;
    width: 100%;
}

.bookmark__url {
    font-size: 0.8rem;
    text-decoration: none;
    color: #666;
    text-wrap: nowrap;
}

.bookmark__url::after {
    content: '🔗';
    margin-left: 0.5rem;
    font-size: 1em;
}

.bookmark__delete:hover {
    background-color: #ff3535;
    color: #fff;
    outline-color: #da2828;
}
</style>