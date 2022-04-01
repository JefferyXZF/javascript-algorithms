
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise (executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = value => {
        if (value instanceof Promise) {
            return value.then(resolve, reject)
        }
        setTimeout(() => {
            if (this.status === 'pending') {
                this.status = FULFILLED
                this.value = value
                this.onResolvedCallbacks.forEach(func => func())
            }

        })
    }

    const reject = reason => {
        setTimeout(() => {
            if (this.status === 'pending') {
                this.status = REJECTED
                this.reason = reason
                this.onRejectedCallbacks.forEach(func => func())
            }
        })
    }

    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

Promise.prototype.then = function(onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onRejected : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err}

    let promise2

    if (this.status === FULFILLED) {
        return promise2 = new Promise(function (resolve, reject) {
            setTimeout(() => {
                try {
                    const result = onResolved(this.value)
                    resolvePromise(promise2, result, resolve, reject)
                } catch (reason) {
                    reject(reason)
                }
            })
        })
    }

    if (this.status === REJECTED) {
        return promise2 = new Promise(function (resolve, reject) {
            setTimeout(() => {
                try {
                    const result = onRejected(this.reason)
                    resolvePromise(promise2, result, resolve, reject)
                } catch (reason) {
                    reject(reason)
                }
            })
        })
    }

    if (this.status === PENDING) {
        return promise2 = new Promise(function (resolve, reject) {
            this.onResolvedCallbacks.push(() => {
                try {
                    const result = onResolved(this.value)
                    resolvePromise(promise2, result, resolve, reject)
                } catch (reason) {
                    reject(reason)
                }
            })

            this.onRejectedCallbacks.push(() => {
                try {
                    const result = onRejected(this.reason)
                    resolvePromise(promise2, result, resolve, reject)
                } catch (reason) {
                    reject(reason)
                }
            })
        })
    }
}

function resolvePromise(promise2, result, resolve, reject) {
    if (promise2 === result) {
        return reject(new TypeError('Error'))
    }

    if (result instanceof Promise) {
        if (this.status === PENDING) {
            // 再次调用该函数是为了确认 x resolve 的
            // 参数是什么类型，如果是基本类型就再次 resolve
            // 把值传给下个 then
            result.then(value => resolvePromise(promise2, value, resolve, reject), reject)
        } else {
            result.then(resolve, reject)
        }
        return
    }

    const called = false

    if (result instanceof Object) {
        try {
            let then = result.then

            if (typeof then === 'function') {
                then.call(y
                , value => {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                },
                e => {
                    if (called) return
                    called = true
                    resolvePromise(promise2, e, resolve, reject)
                })
            } else {
                resolve(result)
            }
        } catch (reason) {
            if (called) return
            called = true
            reject(reason)
        }
    } else {
        // result 基本类型
        resolve(result)
    }
}