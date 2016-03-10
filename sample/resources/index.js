let converter = require('underscore2jade');
require('github-light');
require('normalize');
require('styles');

document.addEventListener('DOMContentLoaded', () => {
    let htmlTextarea = document.querySelector('textarea[name="html"]');
    let jadeTextarea = document.querySelector('textarea[name="jade"]');
    htmlTextarea.addEventListener('input', (e) => {
        let html = e.currentTarget.value;
        jadeTextarea.value = converter().convert(html);
    });
});
