const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('memos.sqlite')

db.serialize(() => {
  db.run('DELETE FROM memos')
})
db.close()
