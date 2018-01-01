export const deleteCookie = cookieName => {
  document.cookie = `${cookieName}=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
};
