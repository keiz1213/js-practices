const Controller = require('./controller')

class Command {
  constructor (argv) {
    this.argv = argv
  }

  run () {
    const controller = new Controller()
    if (this.argv === '-l') {
      controller.listMemo()
    } else if (this.argv === '-r') {
      controller.showMemo()
    } else if (this.argv === '-d') {
      controller.deleteMemo()
    } else {
      controller.createMemo()
    }
  }
}

const command = new Command(process.argv[2])
command.run()
