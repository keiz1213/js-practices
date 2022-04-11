class Database {
  constructor () {
    const sqlite = require('sqlite3').verbose()
    this.db = new sqlite.Database('memos.sqlite')
  }

  save (lines) {
    this.db.serialize(() => {
      this.db.run('CREATE TABLE IF NOT EXISTS memos(id INTEGER PRIMARY KEY AUTOINCREMENT, first_line TEXT, all_line TEXT)')

      const stmt = this.db.prepare('INSERT INTO memos VALUES(NULL,?,?)')
      stmt.run([lines[0], lines.join('\n')])
      stmt.finalize()
    })
  }

  delete (id) {
    const self = this
    return new Promise(
      function (resolve) {
        self.db.serialize(() => {
          self.db.run(`DELETE FROM memos WHERE id = ${id}`, (err) => {
            if (err) {
              return console.error(err.message)
            }
            resolve()
          })
        })
      })
  }

  all () {
    const self = this
    return new Promise(
      function (resolve) {
        self.db.serialize(() => {
          self.db.all('SELECT * FROM memos', (err, rows) => {
            if (err) {
              return console.error(err.message)
            }
            resolve(rows)
          })
        })
      })
  }

  closeDb () {
    this.db.close()
  }
}
module.exports = Database
