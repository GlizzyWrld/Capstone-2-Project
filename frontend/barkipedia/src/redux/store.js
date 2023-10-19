import { configureStore } from "@reduxjs/toolkit";
import factReducer from "./reducers/factReducer";
import userReducer from "./reducers/userReducer";

export default configureStore({
  reducer: {
    facts: factReducer,
    user: userReducer
  }
});

