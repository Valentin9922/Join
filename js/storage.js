/* Declare variables and arrays */
const STORAGE_TOKEN = 'YSYNEVWPYOJNL7PRPVB9NQXDYYPEC6OSLOKLPMG2';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * Set items to backend
 * @param {string} key Name of the value storage
 * @param {value} value Value of the storage
 * @returns 
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) }).then(res => res.json());
}

/**
 * Get values out of backend
 * @param {*} key Name of the value storage
 * @returns Returns value from backend
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json().then(res => res.data.value));
}