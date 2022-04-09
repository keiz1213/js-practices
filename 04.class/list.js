const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('memos.sqlite')

let allmemos

function getAllMemos () {
  return new Promise(
    function (resolve) {
      db.serialize(() => {
        db.all('SELECT * FROM memos', (err, rows) => {
          if (err) {
            return console.error(err.message)
          }
          resolve(allmemos = rows)
          db.close()
        })
      })
    })
}

getAllMemos().then(
  function () {
    const firstLines = allmemos.map(memo => memo.first_line)
    firstLines.forEach(firstline => {
      console.log(firstline)
    })
  }
)
