augmentjs
========

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
TODO
