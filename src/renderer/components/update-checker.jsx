import React, { useEffect, useState } from 'react';
import { CONFIG, sqlectron } from '../api';

const repo = CONFIG.repository.url.replace('https://github.com/', '');
const LATEST_RELEASE_URL = `https://github.com/${repo}/releases/latest`;

const UpdateChecker = () => {
  const [isVisible, setIsVisible] = useState(false);
  //const [currentVersion, setCurrentVersion] = useState('');
  const [latestVersion, setLatestVersion] = useState('');

  const updateAvailable = (/*currentVersion,*/ latestVersion) => {
    //setCurrentVersion(currentVersion);
    setLatestVersion(latestVersion);
    setIsVisible(true);
  };

  const onClick = (event) => {
    event.preventDefault();
    sqlectron.shell.openExternal(LATEST_RELEASE_URL);
  };

  useEffect(() => {
    const unsub = sqlectron.update.onUpdateAvailable(updateAvailable);
    sqlectron.update.checkUpdateAvailable();

    return unsub;
  }, []);

  return (
    <>
      {isVisible && (
        <a className="ui green label" onClick={onClick}>
          <i className="cloud download icon" />
          Update available: {latestVersion}
        </a>
      )}
    </>
  );
};

UpdateChecker.displayName = 'UpdateChecker';

export default UpdateChecker;
