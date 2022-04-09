const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('memos.sqlite')

db.serialize(() => {
  db.run('DROP TABLE memos')
})
db.close()
