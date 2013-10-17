augmentjs  [![Build Status](https://travis-ci.org/michaelleeallen/augmentjs.png)](https://travis-ci.org/michaelleeallen/augmentjs)
========

*Please fork this repo and provide your own methods. Help this library grow!*

A library for augmenting primitive JavaScript data types with non-destructive convenience methods. This library
is largely inspired by Douglas Crockford's book "JavaScript: The Good Parts". There are other libraries that tackle this
same problem but use a very different philosophy to extending primitive types. Libraries like Underscore.js provide nice 
convenience methods for Strings, Objects and Arrays, but do not actually modify the underlying primitive type, which results
in code that is more Functional and looks like this:

	var foo = _.escape("foo & bar");  // "foo &amp; bar"
  
Which is fine, but I prefer the following more fluent syntax:

	var foo = "foo & bar".escape();  // "foo &amp; bar"

Chaining is made much more simple if we modify the primitive type:

	var foo = "  foo & ".escape().join("bar  ").trim();  // "foo &amp; bar"
	
	
## Installation
To install with node:
	
	npm install augmentjs
	
To install with bower:

	bower install augmentjs
	
To use in the browser just include the library like a normal script:

	<script src="path/to/augment.js"></script>
	
## Usage
For node: 

	require('augmentjs')
	...
	var foo = "foo ".join("bar");
	...
	var add = function(x,y){ return x + y; };
	var add10 = add.curry(10);
	add10(5) // produces: 15

For browser environments just include script and start using the methods like normal.

See comments in src/augment.coffee for available methods. 

*Please fork this repo and provide your own methods. Help this 
library grow!*
