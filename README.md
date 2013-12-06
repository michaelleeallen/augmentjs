augmentjs  [![Build Status](https://travis-ci.org/michaelleeallen/augmentjs.png)](https://travis-ci.org/michaelleeallen/augmentjs)
========

A library for augmenting primitive JavaScript data types with non-destructive convenience methods. This library
is largely inspired by Douglas Crockford's book "JavaScript: The Good Parts". I do not recommend actually using this library in production as it is not a good idea to modify the primitive types, but it is nice to play around with.
	
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
