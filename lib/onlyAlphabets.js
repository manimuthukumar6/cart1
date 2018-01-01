import { notAlphabetsWithDotAndSpace, multipleSpaces } from '../app/constants/RegexpConstants.js';

export default s =>
  s && s
    .replace(notAlphabetsWithDotAndSpace, ' ')
    .replace(multipleSpaces, ' ');
