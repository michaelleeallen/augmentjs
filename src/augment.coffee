###
  -------------------------------------------------------------------------
    AUGMENT
  -------------------------------------------------------------------------
    The idea for this little library came from Douglas Crockford's book, 
    "JavaScript: The good parts.". The idea is to provide enhancements to
    the primitive JavaScript data types in a non-destructive way.
###

### 
  Function.prototype.method
-------------------------------------------------------------------------
  Allows user to create new methods on primitive types without
  overriding default implementations if present.
	
	@param {String} name
	@param {Function} fn
	@return {Function}
###
if not Function.prototype.method
  Function.prototype.method = (name, fn) ->
    if not @prototype[name]
      @prototype[name] = fn
    this

###
  Function.prototype.curry
-------------------------------------------------------------------------
  Provides a curried method for the given Function. Idea from 
  Stoyan Stefanov's book "JavaScript Patterns".
   
  Usage: 
    var add = function(x, y){ return x + y; }; 
    var add10 = add.curry(10);
    add10(5) => 15
  
  @param {Function} fn
  @return {Function}
###
Function.method 'curry', (stored_args...) ->
  (args...) => @ (stored_args.concat args)...

###
  Function.prototype.compose
-------------------------------------------------------------------------
  Compose the current function with the given function.

  Usage:
    var plus5 = function(x){ return x + 5; };
    var times2 = function(x){ return x * 2; };
    var plus5times2 = plus5.compose(times2);
    plus5times2(5) => 20
  
  @param {Function}
  @return {Function}
###
Function.method 'compose', (f) ->
    (args...) => f this args...

###
  Object.prototype.beget
------------------------------------------------------------------------- 
  Create a new Object with given prototype, or from the Object itself.

  @param {Object} new Object's prototype
  @return {Object}
###
Object.method 'beget', (obj) ->
  F = ->
  F.prototype = obj or this
  new F()

###
  Object.prototype.fromPairs
------------------------------------------------------------------------- 
  Create new object from list of 'pairs' (2 item arrays)

  @param {Array} list of key/val pairs to populate new object with
  @return {Object}
###
Object.method 'fromPairs', (pairs) ->
  object = {}
  object[key] = val for [key, val] in pairs
  object

###
  Object.prototype.toPairs
------------------------------------------------------------------------- 
  Array of key/val pairs from object

  @return {Array}
###
Object.method 'toPairs', ->
  [key, val] for own key, val of this

###
  Object.prototype.map
------------------------------------------------------------------------- 
  'map' for objects.

  @param {Function} a function that takes a pair [key, value] and returns
    a new pair to replace the old in the new object
  @return {Object}
###
Object.method 'map', (f) ->
  Object.fromPairs (@toPairs().map f)

###
  Object.prototype.flip
------------------------------------------------------------------------- 
  Make an object's keys its values and its values its keys

  @return {Object}
###
Object.method 'flip', ->
    @map ([a, b]) -> [b, a]

###
  Object.prototype.keys
------------------------------------------------------------------------- 
  Return an array of an object's keys

  @return {Array}
###
Object.method 'keys', -> key for own key of this

###
  Object.prototype.values
------------------------------------------------------------------------- 
  Return an array of an object's values

  @return {Array}
###
Object.method 'values', -> value for own key, value of this

###
  Object.prototype.translate
-------------------------------------------------------------------------
  Allows for translating one Object into a schema-like Object by mapping
  keys. Useful for dealing with JSON-based services that return data in
  a format that is not suitable to your application. This can also be used
  as a lightweight ORM.

  @param {Object} schema to be translated to
  @return {Object} the translated Object
###
Object.method 'translate', (schema)->
  if not schema then throw new Error "Object.translate: You must pass in a schema Object to map to."
  @map ([key, value]) -> [schema[key], value]

###
  Object.prototype.reverseTranslation
------------------------------------------------------------------------- 
  Performs the opposite of translate, flipping the given translation rules.

  @param {Object} schema to reverse translation with
  @return {Object}  
###
Object.method 'reverseTranslation', (schema) ->
  if not schema then throw new Error "Object.reverseTranslation: You must pass in a schema Object to map from."
  @translate schema.flip()

###
  String.prototype.join
-------------------------------------------------------------------------	
  Join n number of Strings to a String. Accepts any number
  of arguments. More memory efficient that "+" String concatenation.
   
  Usage: "one".join("two", "three"); => "onetwothree"
	
  @param {String[]...}
  @return {String}
###
String.method 'join', (args...) -> [this].concat(args).join('')

###
  String.prototype.trim
-------------------------------------------------------------------------	
  Removes the leading and trailing whitespace from a String.
   
  Usage: " foobar  ".trim() => "foobar"
	
  @return {String}
###
String.method 'trim', -> @replace(/^\s+|\s+$/g, '')

###
  String.prototype.reverse
-------------------------------------------------------------------------
  Reverses the character order in a String.
   
  Usage: "foobar".reverse() => "raboof"
	
  @return {String}
###
String.method 'reverse', -> @split('').reverse().join('')

###
  Array.prototype.forEach
-------------------------------------------------------------------------
  Provides a shim to older environments that do not support Array.forEach.
	
  Usage: [1,2,3].forEach(function(num){ log(num); });
	
  @param {Function}
    @param {Object} current item
    @parma {Number} iterator
  @param {Object} context
###
Array.method 'forEach', (fn, context) ->
  context = context or null
  fn.call context, item for item in this
  this
