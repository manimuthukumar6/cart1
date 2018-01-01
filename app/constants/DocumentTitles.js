import * as appPaths from './AppPaths';

const titles = {};

titles[`${appPaths.BASE}`] = 'abof.com';
titles[`${appPaths.BAG}`] = 'Shopping Bag | abof.com';
titles[`${appPaths.ADDRESS}`] = 'Delivery Address | abof.com';
titles[`${appPaths.PAYMENT}`] = 'Payment | abof.com';
titles[`${appPaths.REFERRAL}`] = 'abof.com | Register and get Rs 200 as instant shopping bonus. Hurry!!!';
titles[`${appPaths.REFERRAL_MAP}`] = 'abof.com | Register and get Rs 200 as instant shopping bonus. Hurry!!!';
titles[`${appPaths.SIGN_IN}`] = 'Sign In';
titles[`${appPaths.ORDER_CONFIRMATION}`] = 'Order Confirmation';
titles[`${appPaths.MYABOF}`] = 'MyAbof | abof.com';
titles[`${appPaths.PROFILE}`] = 'MyAbof | abof.com';
titles[`${appPaths.THANK_YOU}`] = 'Thank You';

export const getDocumentTitle = (route) => {
  let title;

  if (titles[route]) {
    if (route !== appPaths.BASE) {
      title = titles[route];
    } else {
      title = titles[`${appPaths.BASE}`];
    }
  }

  return title;
};
