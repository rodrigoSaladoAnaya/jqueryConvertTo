# jqueryConvertTo
Transform any jQuery element into another element, i.e: convert a div tag to input tag.

[Demo](http://rodrigosaladoanaya.github.io/jqueryConvertTo/index.html)

[Examples](https://github.com/rodrigoSaladoAnaya/jqueryConvertTo/blob/master/index.html):
```javascript
$("body").on('click', 'div', function() {
	$(this).convertTo('<input type="text">');
});
//<body>...
<div>Hello world</div>
```
By default the plugin attach the functions: 
```javascript
$(INPUT_ELEM)
  .val(DIV_HTML)
  .focus()
  .keyup(function(event) {
    //INTRO_KEY assigns the new value.
    //ESC_KEY lleaves the value as it was before.
  }).
  focusout(function() {
   //As the ESC_KEY, leaves the value as it was before.
  });
```
If you want to hold the value after press the INTRO_KEY, do something like:
```javascript
var inputHtml = '<input type="text">';
$(this).convertTo(inputHtml, function(inputVal) {
	console.log(inputVal);
});
```
If you want to append ```select()``` function do something like the next snippet. Set as ```undefined``` when you want to apply something like ```oneFunction()```:
```javascript
$(this).convertTo(inputHtml, function(inputVal) {
		console.log(inputVal);
	}, {
		select: undefined
	}
);
```
If you want to remove one default function, do something like the next snippet. Set as null the default function:
```javascript
$(this).convertTo(inputHtml, function(inputVal) {
		console.log(inputVal);
	}, {
		select: undefined,
		focusout: null
	}
);
```
If you want to overwrite a function or add a new one, just add the function name and the necessary function. To get the the ```div``` element use ```this.$element```, to get the input element use ```this.$html``` and to get the function that is executed after INTRO_KEY use ```this.fnc```, to more info take a look to ```$.convertTo.defaults.keyup```:
```javascript
$(this).convertTo(inputHtml, function(inputVal) {
		console.log(inputVal);
	}, {
		select: undefined,
		focusout: null,
		dblclick: function() {
			var newVal = this.$html.val();
			alert(newVal);					
		}
	}
);
```
