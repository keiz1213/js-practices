const Database = require('./database')

class Controller {
  constructor () {
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
    reader.on('close', async () => {
      try {
        await self.db.save(lines)
        console.log('----Saved the memo----')
        self.db.closeDb()
      } catch (e) {
        console.error(e.message)
      }
    })
  }

  async listMemo () {
    try {
      const allmemos = await this.db.all()
      if (allmemos.length === 0) {
        return console.log('There is no memo yet')
      }
      const firstLines = allmemos.map(memo => memo.first_line)
      firstLines.forEach(firstLine => {
        console.log(firstLine)
      })
      this.db.closeDb()
    } catch (e) {
      console.error(e.message)
    }
  }

  async showMemo () {
    try {
      const allmemos = await this.db.all()
      if (allmemos.length === 0) {
        return console.log('There is no memo yet')
      }
      const firstLines = allmemos.map(memo => memo.first_line)
      const prompt = this.createPrompt(firstLines, 'Please select the memo you want to see')
      const answer = await prompt.run()
      console.log(allmemos.find(memo => memo.first_line === answer).all_line)
      this.db.closeDb()
    } catch (e) {
      console.error(e.message)
    }
  }

  async deleteMemo () {
    try {
      const allmemos = await this.db.all()
      if (allmemos.length === 0) {
        return console.log('There is no memo yet')
      }
      const firstLines = allmemos.map(memo => memo.first_line)
      const prompt = this.createPrompt(firstLines, 'Please select the memo you want to delete')
      const answer = await prompt.run()
      const id = allmemos.find(memo => memo.first_line === answer).id
      await this.db.delete(id)
      console.log(`'${answer}' has been deleted`)
    } catch (e) {
      console.error(e.message)
    }
  }

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
}

module.exports = Controller
