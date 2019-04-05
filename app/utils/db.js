const electron = require('electron');
const low = require('lowdb');
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');

const userDataPath = (electron.app || electron.remote.app).getPath('userData');

const adapter = new FileSync(path.join(userDataPath, '/db.json'));
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
  whitelist: [],
  lastUpdate: new Date()
}).write();

db._.mixin({
  pushUnique(array, key, newEl) {
    if (array.findIndex(el => el[key] === newEl[key]) === -1) {
      array.push(newEl);
    }
    return array;
  }
});

export default db;
