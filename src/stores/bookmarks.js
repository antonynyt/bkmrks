import { ref } from "vue";
import { getItem } from "../utils/jsonStorage";

export const bookmarks = ref(getItem('bookmarks') ?? [])