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

function getIndex (firstLines, answer) {
  for (const line of firstLines) {
    if (line.value === answer) {
      return firstLines.indexOf(line)
    }
  }
}

getAllMemos().then(
  function () {
    const firstLines = allmemos.map(memo => memo.first_line)
    const allLines = allmemos.map(memo => memo.all_line)
    const { Select } = require('enquirer')

    const prompt = new Select({
      name: 'memo',
      message: 'Pick a memo',
      choices: firstLines
    })
    prompt.run()
      .then(answer => console.log(allLines[getIndex(firstLines, answer)]))
      .catch(console.error)
  }
)
