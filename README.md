# underscore2jade
underscore to jade converter
[![Build Status](https://travis-ci.org/onkin/underscore2jade.svg?branch=master)](https://travis-ci.org/onkin/underscore2jade)
[![Coverage Status](https://coveralls.io/repos/github/onkin/underscore2jade/badge.svg?branch=master)](https://coveralls.io/github/onkin/underscore2jade?branch=master)

```js
let converter = require('./converter');
let jadeTemplate = converter(/* options */).convert(underscoreTemplate);
```

## Underscore template
```html
<span class="test" data-id="1" id="test" data-name="<%= name + 12 %>"><%= value %></span>

<table class="table" data-id="<%= id %>" data-number="5" <% if (true) { %>data-alias="table"<% } %>>
<tr>
	<td>
		td1
	</td>
	<% if (false) { %>
	<td id="main" class="main1 main2">
		td2
	</td>
	<% } %>
</tr>
</table>
```

## Jade template
```jade
span#test.test(data-id='1', data-name=name + 12)
	| !{value}
table.table(data-id=id, data-number='5')
	//
		conflict!
		{{ if (true) { }}data-alias="table"{{ } }}
	tr
		td
			| td1
		- if (false) {
		td#main.main1.main2
			| td2
		- }
```
