// @flow
const electron = require('electron');
const path = require('path');
const fs = require('fs');
const isDev = require('electron-is-dev');
const copyFile = require('fs-copy-file');
const mkdirp = require('mkdirp');

export const userDataPath = process.resourcesPath;
// (electron.app || electron.remote.app).getPath(
//   'userData'
// );
export const desktopPath = (electron.app || electron.remote.app).getPath(
  'desktop'
);

export const defaultHosts = path.join(userDataPath, '/default.hosts');
export const usersHosts = path.join(userDataPath, '/user.remote.hosts');

export const initUntrack = async () => {
  const data = `
# This hosts file is a default not-blocking-anything
# template for Untrack
#
# Web: https://untrack.online
# Date: ${new Date()}
# ==================================================

127.0.0.1 localhost
127.0.0.1 localhost.localdomain
127.0.0.1 local
255.255.255.255 broadcasthost
::1 localhost
::1 ip6-localhost
::1 ip6-loopback
fe80::1%lo0 localhost
ff00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
ff02::3 ip6-allhosts
0.0.0.0 0.0.0.0
`;

  // return new Promise((resolve, reject) => {
  //   fs.writeFile(defaultHosts, data, err => {
  //     if (err) reject(err);
  //     else resolve();
  //   });
  // });
  mkdirp(`${desktopPath}/untrack`, function(err, data) {
    if (err) console.error(err);
  });

  copyFile(`/etc/hosts`, `${desktopPath}/untrack/hosts`, err => {
    if (err) throw err;
    copyFile(
      `${getScriptsPath}/restore.sh`,
      `${desktopPath}/untrack/restore.sh`,
      err => {
        if (err) throw err;
      }
    );
  });

  copyFile(`/etc/hosts`, `${defaultHosts}`, err => {
    if (err) throw err;
  });
};

export const copyScripts = async () => {
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
