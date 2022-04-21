const Command = require('../lib/command')
const Controller = require('../lib/controller')

const command = new Command(process.argv[2])
command.run(new Controller())
