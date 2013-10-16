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
  (args...) => this (stored_args.concat args)...

###
  Object.prototype.create
------------------------------------------------------------------------- 
  Create a new Object with given prototype, or from the Object itself.

  @param {Object} new Object's prototype
  @return {Object}
###
Object.method 'beget', (obj)->
  F = ->
  F.prototype = obj or this
  new F()

###
  Object.prototype.map
-------------------------------------------------------------------------
  Allows for translating one Object into a schema-like Object by mapping
  keys. Useful for dealing with JSON-based services that return data in
  a format that is not suitable to your application. This can also be used
  as a lightweight ORM.

  @param {Object} schema to be mapped to
  @return {Object} the mapped Object
###
Object.method 'map', (schema)->
  if not schema then throw new Error "Object.map: You must pass in a schema Object to map to."

  mappedObj =
    _map: schema
    _reverseMap: {}

  for own prop of this
    mappedObj[schema[prop]] = this[prop]
    mappedObj._reverseMap[schema[prop]] = prop

  mappedObj

###
  Object.prototype.reverseMap
------------------------------------------------------------------------- 
  Performs a map of the Object's _reverseMap, created when you call 
  Object.map. This translates the object back to its original state.

  @return {Object}  
###
Object.method 'reverseMap', ->
  if not this._reverseMap then throw new Error "Object.reverseMap: You must first call Object.map in order to reverse a mapping."
  this.map(this._reverseMap)

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
String.method 'trim', -> this.replace(/^\s+|\s+$/g, '')

###
  String.prototype.reverse
-------------------------------------------------------------------------
  Reverses the character order in a String.
   
  Usage: "foobar".reverse() => "raboof"
	
  @return {String}
###
String.method 'reverse', -> this.split('').reverse().join('')

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
Array.method 'forEach', (fn, context)->
  context = context or null
  fn.call context, item for item in this
  this
