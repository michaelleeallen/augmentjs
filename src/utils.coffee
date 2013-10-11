equals = (x)-> (y)-> y is x

isString = (x)-> equals('string')(typeof x)

isObject = (x)-> equals('object')(typeof x)

isNumber = (x)-> equals('number')(typeof x)

isBoolean = (x)-> equals('boolean')(typeof x)
