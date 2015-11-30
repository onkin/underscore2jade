# underscore2jade
underscore to jade converter

```js
let converter = require('./converter');
converter.convert(underscoreTemplate);
```

##Underscore template
```html
<span class="test" data-id="1" id="test" data-name="<%= name + 12 %>"><%= value %></span>
```

##Jade template
```jade
span#test.test(data-id='1', data-name=name + 12)
  | !{value}
```