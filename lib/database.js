import fs from 'fs'

const DB_FILE = './database.json'

export function loadDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({
      last_id: 0,
      data: []
    }, null, 2))
  }

  return JSON.parse(fs.readFileSync(DB_FILE))
}

export function saveDB(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))
}