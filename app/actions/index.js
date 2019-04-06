import download from '../utils/Downloader';
import db from '../utils/db';
import { userDataPath, defaultHosts, usersHosts } from '../utils';

const getHostRequest = (category, dispatch) => {
  const catsJoined = category.join('-').replace('unified-', '');
  const repoUrl =
    catsJoined === 'unified'
      ? 'https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts'
      : `https://raw.githubusercontent.com/StevenBlack/hosts/master/alternates/${catsJoined}/hosts`;
  return download(repoUrl, usersHosts, (bytes, percent) => {
    const progress = isNaN(bytes) ? '' : `Downloading ${bytes} bytes`;
    dispatch({
      type: 'DOWNLOAD_PROGRESS',
      progress
    });
  });
};

const updateTime = updateOn => db.set('lastUpdate', updateOn).write();

export function getHost(category) {
  return (dispatch, getState) => {
    const returnPromise = getHostRequest(category, dispatch);
    returnPromise.then(() => {
      const updateOn = Date.now();
      updateTime(updateOn);

      return dispatch({
        type: 'DOWNLOAD_COMPLETE',
        updateTime: updateOn
      });
    });
  };
}
