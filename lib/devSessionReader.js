import fs from 'fs';
import path from 'path';
import log from 'loglevel';

let SESSION_CONTENT = null;
let ERROR = false;

const trim = str => str.replace(/^\s+|\s+$/g, '');

const readSessionFile = fileName => {
  if (ERROR) {
    return { };
  }

  if (!SESSION_CONTENT && !ERROR) {
    try {
      SESSION_CONTENT = fs.readFileSync(fileName, 'utf8').replace(/\n/g, ' ');
    } catch (e) {
      log.error('Could not read session file: ', e);
      ERROR = true;
      return { };
    }
  }

  let [auth, activity] = SESSION_CONTENT.split(/\s+/)
    .map(trim);

  if (auth.length > activity.length) {
    [auth, activity] = [activity, auth];
  }

  const id = auth.split('%')[0];
  return { activity, auth, id };
};

export const sessionVariables = (fileName = path.join(process.env.PROJECT_ROOT, 'session.dev')) =>
  readSessionFile(fileName);
