class Controller {
  constructor (database) {
    this.db = database
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
      const allmemos = await this.getAllMemos(this.db)
      const firstLines = this.makeFirstLines(allmemos)
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
      const allmemos = await this.getAllMemos(this.db)
      const firstLines = this.makeFirstLines(allmemos)
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
      const allmemos = await this.getAllMemos(this.db)
      const firstLines = this.makeFirstLines(allmemos)
      const prompt = this.createPrompt(firstLines, 'Please select the memo you want to delete')
      const answer = await prompt.run()
      const id = allmemos.find(memo => memo.first_line === answer).id
      await this.db.delete(id)
      console.log(`'${answer}' has been deleted`)
      this.db.closeDb()
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

  async getAllMemos (db) {
    const allmemos = await db.all()
    if (allmemos.length === 0) {
      throw new Error('There is no memo yet')
    }
    return allmemos
  }

  makeFirstLines (allmemos) {
    return allmemos.map(memo => memo.first_line)
  }
}

module.exports = Controller
