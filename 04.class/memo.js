const Command = require('./command')

const command = new Command(process.argv[2])
command.run()
