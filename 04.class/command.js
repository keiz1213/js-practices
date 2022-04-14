const Controller = require('./controller')

class Command {
  constructor (option) {
    this.option = option
  }

  run () {
    const controller = new Controller()
    if (this.option === '-l') {
      controller.listMemo()
    } else if (this.option === '-r') {
      controller.showMemo()
    } else if (this.option === '-d') {
      controller.deleteMemo()
    } else {
      controller.createMemo()
    }
  }
}

module.exports = Command
