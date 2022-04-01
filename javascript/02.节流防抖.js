
/**
 * debounce
 */

const debounce = function (fn, wait = 300) {
  let timer = null

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    timer = setTimeout((...args) => {
      fn.apply(this, args)
    }, wait)
  }
}

/**
 * 防抖立即执行
 */

const debounce2 = function (fn, wait = 300, immediate) {
  let timer = null

  return function (...args) {
    if (timer) clearTimeout(timer)

    if (immediate) {
      let nowTime = !timer

      timer = setTimeout(() => {
        timer = null
      }, wait)
      
      if (nowTime) {
        an.apply(this, args)
      }
    } else {
      timer = setTimeout (() => {
        fn.apply(this, args)
      }, wait)
    }
  }
}

/**
 * 时间戳时间节流
 * 缺点，最后一次不执行
 */

const throttle = function (fn, wait = 500) {
  let prevTime = 0

  return function (...args) {
    let nowTime = +new Date()
    if (nowTime - prevTime >= wait) {
      prevTime = nowTime

      fn.apply(this, args)
    }
  }
}

/**
 * 定时器实现节流
 * 缺点：第一次不会立即执行
 */

const throttle2 = function (fn, wait = 500) {
  let timer = null

  return function (...args) {
    if (timer) return

    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, wait)
  }
}

const throttle3 = function (fn, wait = 500) {
  let timer = null, prevTime = 0

  return function (...args) {
    let nowTime = +new Date()
    if (timer) clearTimeout(timer)

    if (nowTime - prevTime >= wait) {
      fn.apply(this, args)
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, wait)
    }
  }
}