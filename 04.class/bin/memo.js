const Command = require('../lib/command')
const Controller = require('../lib/controller')
const Database = require('../lib/database')

const database = new Database()
const controller = new Controller(database)
const command = new Command(process.argv[2])
command.run(controller)
