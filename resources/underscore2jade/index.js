let converter = require('./converter');
require('common/github-light');
require('common/normalize');
require('common/styles');

document.addEventListener('DOMContentLoaded', () => {
    let htmlTextarea = document.querySelector('textarea[name="html"]');
    let jadeTextarea = document.querySelector('textarea[name="jade"]');
    htmlTextarea.addEventListener('input', (e) => {
        let html = e.currentTarget.value;
        jadeTextarea.value = converter().convert(html);
    });
});
