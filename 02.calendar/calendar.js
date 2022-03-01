const arg = require('minimist')(process.argv.slice(2))
const today = new Date()
let year = today.getFullYear()
let month = today.getMonth()
if (arg.y && arg.m) {
  [year, month] = [arg.y, arg.m]
} else if (arg.y) {
  year = arg.y
} else if (arg.m) {
  month = arg.m
}
const dateLast = new Date(year, month, 0).getDate()
const days = [...Array(dateLast).keys()].map(i => new Date(year, month - 1, i + 1))
const firstSpace = days[0].getDay() + (days[0].getDay() * 2) + 2

const setFirstDate = (date) => {
  process.stdout.write(date.toString().padStart(firstSpace, ' '))
}
const setDate = (date) => {
  process.stdout.write(date.toString().padStart(3, ' '))
}
const setSunday = (date) => {
  process.stdout.write(date.toString().padStart(2, ' '))
}
const setNewline = () => {
  console.log(' ')
}

console.log(`${month}月 ${year}`.padStart(13, ' '))
console.log('日' + ' ' + '月' + ' ' + '火' + ' ' + '水' + ' ' + '木' + ' ' + '金' + ' ' + '土')
for (const day of days) {
  const date = day.getDate()
  const wday = day.getDay()
  if (date === 1) {
    if (wday === 6) {
      setFirstDate(date)
      setNewline()
    } else {
      setFirstDate(date)
    }
  } else if (wday === 6) {
    setDate(date)
    setNewline()
  } else if (wday === 0) {
    if (date === dateLast) {
      setSunday(date)
      setNewline()
    } else {
      setSunday(date)
    }
  } else if (date === dateLast) {
    setDate(date)
    setNewline()
  } else {
    setDate(date)
  }
}
