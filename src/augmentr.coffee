if not Function.prototype.method
	Function.prototype.method = (name, func) ->
		if not this.prototype[name]
			this.prototype[name] = func;
		this

String.method('join', (args...) -> [this].concat(args).join(''))

String.method('trim', -> this.replace(/^\s+|\s+$/g, ''))

String.method('reverse', -> this.split().reverse().join('') )

Function.method('curry', (fn)-> 
	stored_args = Array.prototype.slice.call(arguments, 1)
	(args...)-> fn.apply(null, stored_args.concat(args)))