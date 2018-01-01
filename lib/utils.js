export const dateFormatter = (date) => {
  const monthNames = ['Jan', 'Feb', 'March', 'April', 'May', 'June',
    'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const newDate = new Date(date);

  const formattedDate = `${newDate.getDate()} ${monthNames[newDate.getMonth()]} ${newDate.getFullYear()}`;
  return formattedDate;
};

// generate list of years
export const generateYearOptions = (year, till) => {
  const years = [];
  for (let i = 0; i <= till; i++) {
    years.push(year + i);
  }

  return years.map(y => ({ option: `${y}`, value: `${y}` }));
};

export const isBrowser = () => process.env.ABOF_IS_BROWSER;


// document scroll functions
//
//
export const disableDocumentScroll = () => {
  const currentScrollPos = window.pageYOffset;

  document.documentElement.style.overflow = 'hidden';
  document.documentElement.style.position = 'fixed';

  // Since 'position: fixed' is needed to disable scroll on mobiles,
  // we are positioning the the the document using the current scroll position.
  document.documentElement.style.top = `-${currentScrollPos}px`;
};

export const enableDocumentScroll = () => {
  const currentScrollPos = parseInt(document.documentElement.style.top, 10);

  document.documentElement.style.overflow = '';
  document.documentElement.style.position = '';
  document.documentElement.style.top = '';

  if (currentScrollPos) {
    window.scrollTo(0, currentScrollPos * -1);
  }
};

export const isDocumentScrollDisabled = () =>
  document.documentElement.style.overflow === 'hidden' &&
  document.documentElement.style.position === 'fixed';

//
//
// document scroll functions - ends


// decode html entities back to text
export const decodeHTML = str => str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));

/**
 * Loosely based on:
 * @see https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
 */
export const formatMoney = n => {
  const x = Math.round(n).toString();
  let lastThree = x.substring(x.length - 3);
  const rest = x.substring(0, x.length - 3);
  if (rest) {
    lastThree = `,${lastThree}`;
  }

  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
};
