/*
  -------------------------------------------------------------------------
    AUGMENT
  -------------------------------------------------------------------------
    The idea for this little library came from Douglas Crockford's book, 
    "JavaScript: The good parts.". The idea is to provide enhancements to
    the primitive JavaScript data types in a non-destructive way.
*/


/* 
  Function.prototype.method
-------------------------------------------------------------------------
  Allows user to create new methods on primitive types without
  overriding default implementations if present.
	
	@param {String} name
	@param {Function} fn
	@return {Function}
*/


(function() {
  var __slice = [].slice,
    __hasProp = {}.hasOwnProperty;

  if (!Function.prototype.method) {
    Function.prototype.method = function(name, fn) {
      if (!this.prototype[name]) {
        this.prototype[name] = fn;
      }
      return this;
    };
  }

  /*
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
  */


  Function.method('curry', function() {
    var stored_args,
      _this = this;
    stored_args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return _this.apply(null, stored_args.concat(args));
    };
  });

  /*
    Object.prototype.create
  ------------------------------------------------------------------------- 
    Create a new Object with given prototype, or from the Object itself.
  
    @param {Object} new Object's prototype
    @return {Object}
  */


  Object.method('beget', function(obj) {
    var F;
    F = function() {};
    F.prototype = obj || this;
    return new F();
  });

  /*
    Object.prototype.map
  -------------------------------------------------------------------------
    Allows for translating one Object into a schema-like Object by mapping
    keys. Useful for dealing with JSON-based services that return data in
    a format that is not suitable to your application. This can also be used
    as a lightweight ORM.
  
    @param {Object} schema to be mapped to
    @return {Object} the mapped Object
  */


  Object.method('map', function(schema) {
    var mappedObj, prop;
    if (!schema) {
      throw new Error("Object.map: You must pass in a schema Object to map to.");
    }
    mappedObj = {
      _map: schema,
      _reverseMap: {}
    };
    for (prop in this) {
      if (!__hasProp.call(this, prop)) continue;
      mappedObj[schema[prop]] = this[prop];
      mappedObj._reverseMap[schema[prop]] = prop;
    }
    return mappedObj;
  });

  /*
    Object.prototype.reverseMap
  ------------------------------------------------------------------------- 
    Performs a map of the Object's _reverseMap, created when you call 
    Object.map. This translates the object back to its original state.
  
    @return {Object}
  */


  Object.method('reverseMap', function() {
    if (!this._reverseMap) {
      throw new Error("Object.reverseMap: You must first call Object.map in order to reverse a mapping.");
    }
    return this.map(this._reverseMap);
  });

  /*
    String.prototype.join
  -------------------------------------------------------------------------	
    Join n number of Strings to a String. Accepts any number
    of arguments. More memory efficient that "+" String concatenation.
     
    Usage: "one".join("two", "three"); => "onetwothree"
  	
    @param {String[]...}
    @return {String}
  */


  String.method('join', function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return [this].concat(args).join('');
  });

  /*
    String.prototype.trim
  -------------------------------------------------------------------------	
    Removes the leading and trailing whitespace from a String.
     
    Usage: " foobar  ".trim() => "foobar"
  	
    @return {String}
  */


  String.method('trim', function() {
    return this.replace(/^\s+|\s+$/g, '');
  });

  /*
    String.prototype.reverse
  -------------------------------------------------------------------------
    Reverses the character order in a String.
     
    Usage: "foobar".reverse() => "raboof"
  	
    @return {String}
  */


  String.method('reverse', function() {
    return this.split('').reverse().join('');
  });

  /*
    Array.prototype.forEach
  -------------------------------------------------------------------------
    Provides a shim to older environments that do not support Array.forEach.
  	
    Usage: [1,2,3].forEach(function(num){ log(num); });
  	
    @param {Function}
      @param {Object} current item
      @parma {Number} iterator
    @param {Object} context
  */


  Array.method('forEach', function(fn, context) {
    var item, _i, _len;
    context = context || null;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      item = this[_i];
      fn.call(context, item);
    }
    return this;
  });

}).call(this);
