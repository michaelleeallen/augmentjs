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
  var __slice = [].slice;

  if (!Function.prototype.method) {
    Function.prototype.method = function(name, fn) {
      if (!this.prototype[name]) {
        this.prototype[name] = fn;
      }
      return this;
    };
  }

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
    Array.prototype.forEach
  -------------------------------------------------------------------------
    Provides a shim to older environments that do not support Array.forEach.
  	
    Usage: [1,2,3].forEach(function(num){ log(num); });
  	
    @param {Function}
      @param {Object} current item
      @parma {Number} iterator
    @param {Object} context
  */


  Array.method('each', function(fn, context) {
    var item, _i, _len;
    context = context || null;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      item = this[_i];
      fn.call(context, item);
    }
    return this;
  });

}).call(this);
