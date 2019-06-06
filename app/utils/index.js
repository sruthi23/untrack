// @flow
const electron = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const copyFile = require('fs-copy-file');
const mkdirp = require('mkdirp');
const fs = require('fs');

export const userDataPath = (electron.app || electron.remote.app).getPath(
  'userData'
);
export const desktopPath = (electron.app || electron.remote.app).getPath(
  'desktop'
);

export const defaultHosts = path.join(userDataPath, '/default.hosts');
export const usersHosts = path.join(userDataPath, '/user.remote.hosts');

export const initUntrack = async () => {
  if (fs.existsSync(`${desktopPath}/untrack/hosts`)) {
    console.log('already exist');
  } else {
    mkdirp(`${desktopPath}/untrack`, err => {
      if (err) console.error(err);
      else {
        copyFile(`/etc/hosts`, `${desktopPath}/untrack/hosts`, error => {
          if (error) throw error;
          copyFile(
            `${getScriptsPath}/restore.sh`,
            `${desktopPath}/untrack/restore.sh`,
            errors => {
              if (errors) throw errors;
            }
          );
        });
      }
    });
  }

  copyFile(`${desktopPath}/untrack/hosts`, `${defaultHosts}`, err => {
    console.log('copied', defaultHosts);
    if (err) throw err;
  });
};

export const copyScripts = async () => {
  console.log(`${getScriptsPath} ${userDataPath}`);
  copyFile(
    `${getScriptsPath}/functions.sh`,
    `${userDataPath}/functions.sh`,
    err => {
      if (err) throw err;
    }
  );
  copyFile(`${getScriptsPath}/toggle.sh`, `${userDataPath}/toggle.sh`, err => {
    if (err) throw err;
  });

  copyFile(
    `${getHostsPath}/unified.hosts`,
    `${userDataPath}/user.remote.hosts`,
    err => {
      if (err) throw err;
    }
  );

  // copyFile(
  //   `${getHostsPath}/unified.hosts`,
  //   `${userDataPath}/unified.hosts`,
  //   err => {
  //     if (err) throw err;
  //   }
  // );
};
export const getScriptsPath = isDev
  ? path.join(__dirname, '/scripts')
  : path.join(process.resourcesPath);

export const getHostsPath = isDev
  ? path.join(__dirname, '/assets/')
  : path.join(process.resourcesPath);
