const Command = require('../lib/command')

const command = new Command(process.argv[2])
command.run()
