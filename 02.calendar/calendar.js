const arg = require('minimist')(process.argv.slice(2))
const today = new Date()
let year = today.getFullYear()
let month = today.getMonth() + 1
if (arg.y) {
  year = arg.y
}
if (arg.m) {
  month = arg.m
}
const dateLast = new Date(year, month, 0).getDate()
const days = [...Array(dateLast).keys()].map(i => new Date(year, month - 1, i + 1))
const firstSpace = (days[0].getDay() * 3) - 1

const change = (date) => {
  if (date < 10) {
    return ` ${date} `
  } else {
    return `${date} `
  }
}

console.log(`${month}月 ${year}`.padStart(13, ' '))
console.log('日' + ' ' + '月' + ' ' + '火' + ' ' + '水' + ' ' + '木' + ' ' + '金' + ' ' + '土')
for (let i = 0; i <= firstSpace; i++) {
  process.stdout.write(' ')
}
for (const day of days) {
  const date = day.getDate()
  const wday = day.getDay()
  if (wday === 6 || date === dateLast) {
    process.stdout.write(change(date))
    console.log('')
  } else {
    process.stdout.write(change(date))
  }
}
