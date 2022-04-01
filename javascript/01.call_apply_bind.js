/**
 * 实现 call
 */

Function.prototype.call = Function.prototype.call || function (context, ...args) {
  if (context == undefined) {
    context = window
  } else {
    context = Object(context)
  }
  let fn = Symbol()
  context[fn] = this
  
  const result = context[fn](...args)
  delete context[fn]
  return result
}


/**
 * 实现 apply
 */
Function.prototype.apply = Function.prototype.apply || function (context, args) {
  if (context == undefined) {
    context = window
  } else {
    context = Object(context)
  }
  let fn = Symbol()
  context[fn] = this
  
  const result = context[fn](...args)
  delete context[fn]
  return result
}

/**
 * 实现 bind
 */
Function.prototype.bind = Function.prototype.bind || function (context, ...args) {
  let self = this

  return function Fn (...args1) {
    return self.apply(this instanceof Fn ? this : context, args1.concat(args))
  }
}