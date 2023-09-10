import dayjs from 'dayjs'
import provinces from '@/assets/china/provinces.json'
import cities from '@/assets/china/cities.json'
import areas from '@/assets/china/areas.json'
console.log(provinces)

/**
 * @desc  格式化时间
 * @param {(Object|string|number)} time
 * @param {string} format
 * @returns {string | null}
 */
export function formatDateTime(time = undefined, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(time).format(format)
}

export function formatDate(date = undefined, format = 'YYYY-MM-DD') {
  return formatDateTime(date, format)
}

/**
 * @desc  千分位格式化金额
 * @param {fee} 金额
 * @param {type} 类型 front、server
 * @returns {fee}
 */
export function formatFee(fee, type) {
  let feeStr = fee + ''
  if (feeStr === 'null' || feeStr === '') {
    return '--'
  }
  if (feeStr === '0') {
    return '0'
  }
  if (type === 'front') {
    if (feeStr.length < 3) {
      feeStr = '000'.slice(0, -feeStr.length) + feeStr
    }
    return feeStr.slice(0, -2) + '.' + feeStr.slice(-2)
  }
  if (type === 'server') {
    if (feeStr.includes('.')) {
      let arr = feeStr.split('.')
      return arr[0] + (arr[1] + '00').slice(0, 2)
    } else {
      return feeStr + '00'
    }
  }
}

/**
 * @desc  函数节流
 * @param {Function} fn
 * @param {Number} wait
 * @returns {Function}
 */
export function throttle(fn, wait) {
  var context, args
  var previous = 0

  return function () {
    var now = +new Date()
    context = this
    args = arguments
    if (now - previous > wait) {
      fn.apply(context, args)
      previous = now
    }
  }
}

/**
 * @desc  函数防抖
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(method, wait, immediate) {
  let timeout
  return function (...args) {
    let context = this
    if (timeout) {
      clearTimeout(timeout)
    }
    // 立即执行需要两个条件，一是immediate为true，二是timeout未被赋值或被置为null
    if (immediate) {
      /**
       * 如果定时器不存在，则立即执行，并设置一个定时器，wait毫秒后将定时器置为null
       * 这样确保立即执行后wait毫秒内不会被再次触发
       */
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) {
        method.apply(context, args)
      }
    } else {
      // 如果immediate为false，则函数wait毫秒后执行
      timeout = setTimeout(() => {
        /**
         * args是一个类数组对象，所以使用fn.apply
         * 也可写作method.call(context, ...args)
         */
        method.apply(context, args)
      }, wait)
    }
  }
}

/**
 * list to  tree
 * @desc 就是不停的获取当前节点的父节点，并把当前节点的加入到父节点的children中
 * @param array
 * @param id 主键名称
 * @param pid 对应node 的 parentId
 * @param rootValue array里根节点的 parentId value
 * @returns {[]}
 */
export function array2tree(array, id, pid, rootValue) {
  const newList = []
  for (let i = 0; i < array.length; i++) {
    if (array[i][pid] === rootValue) {
      newList.push(array[i]) // 把根节点放入新的list中
    } else {
      // Parent
      const parent = array.find((item) => item[id] === array[i][pid]) // 获取 当前节点的父节点
      if (parent) {
        // 如果当前节点的父节点不为空，就把当前节点放入父节点的 children 数组属性中
        if (parent.children) {
          // 更改原数组就相当于给新数组里面添加了children，因为新数组里面元素的地址和原数组是一个、
          parent.children.push(array[i])
        } else {
          parent.children = [array[i]]
        }
      }
    }
  }
  return newList
}

export function getChinaData() {
  return {
    provinces,
    cities,
    areas
  }
}
