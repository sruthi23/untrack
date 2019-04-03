const low = require('lowdb');
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(path.join(__dirname, 'db/db.json'));
const db = low(adapter);

db.defaults({
  config: {
    unified: true,
    fakenews: false,
    gambling: false,
    porn: false,
    social: false
  },
  initial: true,
  isRunning: false,
  lastUpdate: new Date()
}).write();

export default db;
