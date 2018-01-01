import log from 'loglevel';
import { FETCH_ERROR } from '../constants/ActionTypes';
import * as AppPaths from '../constants/AppPaths';

const RequestErrorMiddleware = () => next => action => {
  if (action.type !== FETCH_ERROR) {
    return next(action);
  }
  const errors = action.payload && action.payload.errors;
  const error = errors && errors instanceof Array && errors[0] || action.payload;
  if (error && error.errorKey === '_ERR_USER_AUTHORITY' && process.env.ABOF_IS_BROWSER) {
    log.error('Reloading the page due to _ERR_USER_AUTHORITY code received');
    const isOrderConfirmationPage = location.pathname.indexOf(AppPaths.ORDER_CONFIRMATION) > -1;
    /* Skip reloading order confirmation page when err_user_authority error */
    if (!isOrderConfirmationPage) {
      window.location.reload();
    }
  }
  return next(action);
};

export default RequestErrorMiddleware;
