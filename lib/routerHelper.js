import * as AppPaths from '../app/constants/AppPaths.js';

// router is an instance of react-router from withRouter
export const getStepFromRouter = router => {
  let step = -1;

  if (router.isActive(`${AppPaths.BASE}/${AppPaths.BAG}`, true)) {
    step = 1;
  } else if (router.isActive(`${AppPaths.BASE}/${AppPaths.ADDRESS}`, true)) {
    step = 2;
  } else if (router.isActive(`${AppPaths.BASE}/${AppPaths.PAYMENT}`, true)) {
    step = 3;
  } else if (router.isActive(`${AppPaths.BASE}/${AppPaths.APPLY_COUPON}`, true)) {
    step = 4;
  } else if (router.isActive(`${AppPaths.BASE}/${AppPaths.INIT}`, true)) {
    step = 2;
  }

  return step;
};
