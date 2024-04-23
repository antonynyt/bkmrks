<script setup>
import { computed, ref, watch } from 'vue'
import TheHeader from './components/TheHeader.vue'
import BaseInput from './components/BaseSearchInput.vue'
import { isValidUrl, addProtocol } from './utils/url'
import { setItem } from './utils/jsonStorage'
import BaseListElement from './components/AppBookmarkElement.vue'
import { bookmarks } from './stores/bookmarks'

const bookmarkInput = ref('')

//update the title of a specific bookmark
const updateTitle = (bookmark) => {
    if (bookmark.url) {
        const fetchPromise = fetch(`https://api.dub.co/metatags?url=${encodeURIComponent(bookmark.url)}`)
        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('Timeout'))
            }, 5000) // 5 seconds timeout
        })
        Promise.race([fetchPromise, timeoutPromise])
            .then(response => {
                return response.json().then(data => data.title)
            })
            .catch(e => new URL(bookmark.url).hostname)
            .then(title => {
                bookmark.title = title
            })
    }
}

const handleSubmit = async (event) => {
    event.preventDefault()
    if (bookmarks.value.every(bookmark => bookmark.title.toLowerCase() != bookmarkInput.value.toLowerCase())
        && bookmarkInput.value !== ''
        && bookmarks.value.every(bookmark => bookmark.url != addProtocol(bookmarkInput.value.toLowerCase()))) {

        let title = bookmarkInput.value;
        let urlValue = null;

        if (isValidUrl(bookmarkInput.value)) {
            urlValue = bookmarkInput.value.toLowerCase()
            urlValue = addProtocol(urlValue)
            title = "..."; // get the hostname for now. Later get the title of the page
        }

        bookmarks.value.push({
            created_at: Date.now(),
            title: title,
            url: urlValue,
            isColor: (bookmarkInput.value.startsWith('#') && bookmarkInput.value.length <= 7),
        })

        //updatetitle just pushed bookmark
        updateTitle(bookmarks.value[bookmarks.value.length - 1])
        bookmarkInput.value = ''
    }
}

const bookmarksSortedByDate = computed(() => {
    return bookmarks.value.sort((a, b) => b.created_at - a.created_at)
})

const searchBookmark = (bookmark) => {
    const pattern = new RegExp(bookmarkInput.value, 'i')
    return pattern.test(bookmark.title) || pattern.test(bookmark.url)
}

const BookmarksBySearch = computed(() => {
    return bookmarksSortedByDate.value.filter(searchBookmark)
})

// watch for changes in bookmarks
watch(bookmarks, () => {
    setItem('bookmarks', bookmarks.value)
}, { deep: true })

</script>

<template>
    <TheHeader />
    <main>
        <form action="#" @submit="handleSubmit">
            <BaseInput v-model.trim="bookmarkInput" placeholder="Enter url, hexcolor, or text..." name="newBookmark"
                autocomplete="off" autofocus />
        </form>

        <section>
            <div class="bookmarks__container">
                <div class="header">
                    <h2>Bookmarks</h2>
                    <p>{{ BookmarksBySearch.length }} results</p>
                </div>
    
                <ul>
                    <BaseListElement 
                        v-for="bookmark in BookmarksBySearch" 
                        :key="`bookmark-${bookmark.created_at}`"
                        :bookmark 
                    />
                </ul>
            </div>
        </section>
    </main>
</template>

<style scoped>
main {
    max-width: 800px;
    margin: 0 auto;
    margin-top: 5rem;
}

form {
    width: calc(100% - 2rem);
    margin: 0 auto;
}

.bookmarks__container {
    margin-top: 20px;
    width: 100%;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 1rem;
    border-bottom: 1px solid #ccc;
}

.header h2,
.header p {
    font-size: 1rem;
    margin: 0.5rem 0;
    font-weight: 500;
    color: #666;
}

.bookmarks__container ul {
    list-style: none;
    padding: 0;
    max-height: 35rem;
    overflow-y: scroll;
}
</style>
