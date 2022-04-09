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
        })
      })
    })
}

function deleteMemo (id) {
  return new Promise(
    function (resolve) {
      db.serialize(() => {
        db.run(`DELETE FROM memos WHERE id = ${id}`, (err) => {
          if (err) {
            return console.error(err.message)
          }
          resolve()
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
    const { Select } = require('enquirer')

    const prompt = new Select({
      name: 'memo',
      message: 'Please select the memo you want to delete',
      choices: firstLines
    })
    prompt.run()
      .then(answer => {
        const id = allmemos[getIndex(firstLines, answer)].id
        deleteMemo(id)
      })
      .then(() => {
        console.log('It has been deleted')
      })
      .catch(console.error)
  }
)
