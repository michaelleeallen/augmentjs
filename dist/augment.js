/*
  -------------------------------------------------------------------------
    AUGMENTR
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
    var fn, stored_args;
    stored_args = Array.prototype.slice.call(arguments, 0);
    fn = this;
    return function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return fn.apply(null, stored_args.concat(args));
    };
  });

  /*
    Object.prototyp.create
  ------------------------------------------------------------------------- 
    Create a new Object with given prototype, or from the Object itsetlf.
  
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
    Object.prototype.fromPairs
  ------------------------------------------------------------------------- 
    Create new object from list of 'pairs' (2 item arrays)
  
    @param {Array} list of key/val pairs to populate new object with
    @return {Object}
  */


  Object.method('fromPairs', function(pairs) {
    var key, object, val, _i, _len, _ref;
    object = {};
    for (_i = 0, _len = pairs.length; _i < _len; _i++) {
      _ref = pairs[_i], key = _ref[0], val = _ref[1];
      object[key] = val;
    }
    return object;
  });

  /*
    Object.prototype.toPairs
  ------------------------------------------------------------------------- 
    Array of key/val pairs from object
  
    @return {Array}
  */


  Object.method('toPairs', function() {
    var key, val, _results;
    _results = [];
    for (key in this) {
      if (!__hasProp.call(this, key)) continue;
      val = this[key];
      _results.push([key, val]);
    }
    return _results;
  });

  /*
    Object.prototype.map
  ------------------------------------------------------------------------- 
    'map' for objects.
  
    @param {Function} a function that takes a pair [key, value] and returns
      a new pair to replace the old in the new object
    @return {Object}
  */


  Object.method('map', function(f) {
    return Object.fromPairs(this.toPairs().map(f));
  });

  /*
    Object.prototype.flip
  ------------------------------------------------------------------------- 
    Make an object's keys its values and its values its keys
  
    @return {Object}
  */


  Object.method('flip', function() {
    return this.map(function(_arg) {
      var a, b;
      a = _arg[0], b = _arg[1];
      return [b, a];
    });
  });

  /*
    Object.prototype.translate
  -------------------------------------------------------------------------
    Allows for translating one Object into a schema-like Object by mapping
    keys. Useful for dealing with JSON-based services that return data in
    a format that is not suitable to your application. This can also be used
    as a lightweight ORM.
  
    @param {Object} schema to be translated to
    @return {Object} the translated Object
  */


  Object.method('translate', function(schema) {
    if (!schema) {
      throw new Error("Object.translate: You must pass in a schema Object to map to.");
    }
    return this.map(function(_arg) {
      var key, value;
      key = _arg[0], value = _arg[1];
      return [schema[key], value];
    });
  });

  /*
    Object.prototpye.reverseTranslation
  ------------------------------------------------------------------------- 
    Performs the opposite of translate, flipping the given translation rules.
  
    @param {Object} schema to reverse translation with
    @return {Object}
  */


  Object.method('reverseTranslation', function(schema) {
    if (!schema) {
      throw new Error("Object.reverseTranslation: You must pass in a schema Object to map from.");
    }
    return this.translate(schema.flip());
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
