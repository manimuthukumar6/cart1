import { ABOF_DOMAIN, CUSTOMER_HELP_DOMAIN } from '../../lib/api';
import * as AppPaths from '../constants/AppPaths';

const ABOF_WEB_BASE = `//${ABOF_DOMAIN}`;

const trim = str => str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

export const productNameToURLFragment = str => trim(str).replace(/&/g, 'and').replace(/ /g, '-')
.replace(/[^a-zA-Z0-9-]/g, ''); // Replace & with and, space with -, remove all special chars

export const productUrl = (name, partNumber) => `${ABOF_WEB_BASE}/product/${partNumber}-${productNameToURLFragment(name)}`;// eslint-disable-line max-len


