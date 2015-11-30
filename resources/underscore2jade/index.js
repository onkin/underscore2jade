let converter = require('./converter');
require('./styles');

document.addEventListener('DOMContentLoaded', () => {
	let htmlTextarea = document.querySelector('textarea[name="html"]'),
		jadeTextarea = document.querySelector('textarea[name="jade"]');
	htmlTextarea.addEventListener('input', (e) => {
		let html = e.currentTarget.value;
		jadeTextarea.value = converter().convert(html);
	});
});
