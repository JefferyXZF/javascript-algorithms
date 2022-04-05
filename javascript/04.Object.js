
// Object.create

Object.create = Object.create || function (target) {
  if (typeof target === 'object' || typeof target === 'function') {
    function foo () {}
    foo.prototype = target
    return new foo()
  } else {
    console.error('Object prototype may only be an Object or null')
  }
}

function myNew () {
  let constructor = Array.prototype.slice.call(arguments)

  if (typeof constructor !== 'function') {
    console.error('type error')
    return
  }
  let newObject = Object.create(constructor.prototype)
  let result = constructor.apply(newObject, arguments)

  return result instanceof Object ? result : newObject
}