export const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key) => {
    let data;
    try {
        data = JSON.parse(localStorage.getItem(key));
    } catch (e) {
        data = null;
    }

    return data;
};
