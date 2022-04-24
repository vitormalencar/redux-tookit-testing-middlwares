// create an event middleware

import { AnyAction, Middleware } from "@reduxjs/toolkit";

export const analytics: Middleware =
  (store) => (next) => (action: AnyAction) => {
    if (!action.meta || !action.meta.analytics) {
      return next(action);
    }

    const { category } = action.meta.analytics;

    store.dispatch({
      type: "A-EVENT",
      payload: { category, action: action.type },
    });

    return next(action);
  };
