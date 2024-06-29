export function throttle(fn, delay) {
  // 节流
  var timer
  return function () {
    var _this = this
    var args = arguments
    if (timer) {
      return
    }
    timer = setTimeout(function () {
      fn.apply(_this, args)
      timer = null // 在delay后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器
    }, delay)
  }
}
/**
 * 非立即执行防抖函数
 * @param {Function} func
 * @param {number} delay
 * @returns
 */
export function debounce(func, delay) {
  let timeout
  return function () {
    const _this = this
    const args = [...arguments]
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func.apply(_this, args)
    }, delay)
  }
}
