process.stdin.resume()
process.stdin.setEncoding('utf8')

const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('memos.sqlite')

const lines = []
const reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log('----Please write a memo----')

reader.on('line', (line) => {
  lines.push(line)
})

reader.on('close', () => {
  console.log('----Saved the memo----')
  lines.forEach((line) => {
    console.log(line)
  })

  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS memos(id INTEGER PRIMARY KEY AUTOINCREMENT, first_line TEXT, all_line TEXT)')

    const stmt = db.prepare('INSERT INTO memos VALUES(NULL,?,?)')
    stmt.run([lines[0], lines.join('\n')])
    stmt.finalize()
  })
  db.close()
})
