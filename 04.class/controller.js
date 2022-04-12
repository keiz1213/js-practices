const Database = require('./database')

class Controller {
  constructor (argv) {
    this.argv = argv
    this.db = new Database()
    this.db.createTable()
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
      self.db.save(lines).then(
        function () {
          console.log('----Saved the memo----')
          self.db.closeDb()
        }
      )
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
        const prompt = self.createPrompt(firstLines, 'Please select the memo you want to see')
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
        const prompt = self.createPrompt(firstLines, 'Please select the memo you want to delete')
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

  // private----------------------------------------------------------------------------------

  createReader () {
    process.stdin.resume()
    process.stdin.setEncoding('utf8')

    return require('readline').createInterface({
      input: process.stdin
    })
  }

  createPrompt (firstLines, message) {
    const { Select } = require('enquirer')

    const prompt = new Select({
      name: 'memo',
      message: message,
      choices: firstLines
    })
    return prompt
  }

  getIndex (firstLines, answer) {
    for (const line of firstLines) {
      if (line.value === answer) {
        return firstLines.indexOf(line)
      }
    }
  }
}
