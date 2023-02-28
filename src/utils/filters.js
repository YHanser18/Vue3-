const dayjs = require('dayjs')

// 时间戳转换
const filterTimes = (val, format = 'YYYY-MM-DD') => {
  if (!isNull(val)) {
    val = parseInt(val) * 1000
    return dayjs(val).format(format)
  } else {
    return '--'
  }
}

// 判断是否为空
export const isNull = (date) => {
  if (!date) return true
  if (JSON.stringify(date) === '{}') return true
  if (JSON.stringify(date) === '[]') return true
}

export default (app) => {
  app.config.globalProperties.$filters = {
    filterTimes
  }
}
