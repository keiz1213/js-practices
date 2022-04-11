const Database = require('./database')

class Controller {
  constructor (argv) {
    this.argv = argv
    this.db = new Database()
  }

  createMemo () {
    const self = this
    console.log('----Please write a memo----')
    const reader = this.createReader()
    const lines = []
    reader.on('line', (line) => {
      lines.push(line)
    })

    reader.on('close', () => {
      self.db.save(lines)
      console.log('----Saved the memo----')
      lines.forEach((line) => {
        console.log(line)
      })
      self.db.closeDb()
    })
  }

  listMemo () {
    const self = this
    self.db.all().then(
      function (allmemos) {
        const firstLines = allmemos.map(memo => memo.first_line)
        if (firstLines.length === 0) {
          return console.log('There is no memo yet')
        }
        firstLines.forEach(firstline => {
          console.log(firstline)
        })
        self.db.closeDb()
      }
    )
  }

  showMemo () {
    const self = this
    self.db.all().then(
      function (allmemos) {
        const firstLines = allmemos.map(memo => memo.first_line)
        if (firstLines.length === 0) {
          return console.log('There is no memo yet')
        }
        const allLines = allmemos.map(memo => memo.all_line)
        const { Select } = require('enquirer')

        const prompt = new Select({
          name: 'memo',
          message: 'Please select the memo you want to see',
          choices: firstLines
        })
        prompt.run()
          .then(answer => {
            console.log(allLines[self.getIndex(firstLines, answer)])
          })
          .catch(console.error)
      })
  }

  deleteMemo () {
    const self = this
    self.db.all().then(
      function (allmemos) {
        const firstLines = allmemos.map(memo => memo.first_line)
        if (firstLines.length === 0) {
          return console.log('There is no memo yet')
        }
        const { Select } = require('enquirer')

        const prompt = new Select({
          name: 'memo',
          message: 'Please select the memo you want to delete',
          choices: firstLines
        })
        prompt.run()
          .then(answer => {
            const id = allmemos[self.getIndex(firstLines, answer)].id
            self.db.delete(id)
            self.db.closeDb()
          })
          .then(() => {
            console.log('It has been deleted')
          })
          .catch(console.error)
      }
    )
  }

  createReader () {
    process.stdin.resume()
    process.stdin.setEncoding('utf8')

    return require('readline').createInterface({
      input: process.stdin
    })
  }

  getIndex (firstLines, answer) {
    for (const line of firstLines) {
      if (line.value === answer) {
        return firstLines.indexOf(line)
      }
    }
  }
}
