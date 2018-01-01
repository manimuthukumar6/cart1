import * as AppPaths from '../app/constants/AppPaths';
import { getDocumentTitle } from '../app/constants/DocumentTitles.js';

const getPageType = url => {
  if (!url) {
    return AppPaths.BASE;
  }
  if (url.indexOf(`${AppPaths.BASE}/${AppPaths.BAG}`) > -1) {
    return AppPaths.BAG;
  }
  return AppPaths.BASE;
};

const basePageMeta = url => ({
  title: 'abof.com',
  description: 'Shoes, Clothes & Accessories from Top Brands at best prices with COD, Easy Returns and Sunday Delivery ', // eslint-disable-line max-len
  url: `https://www.abof.com${url}`,
  images: ['//img.abofcdn.com/images/abof-logo.png']
});

export const getMetaData = url => {
  const pageType = getPageType(url);
  switch (pageType) {
    case AppPaths.REFERRAL_MAP:
      return Object.assign(basePageMeta(url), getReferralPageMeta());
    case AppPaths.SIGN_IN:
      return Object.assign(basePageMeta(url), signPageMeta());
    default:
      return basePageMeta(url);
  }
}
