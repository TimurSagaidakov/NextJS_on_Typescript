// import { Context, createWrapper } from 'next-redux-wrapper';
// import  { combineReducers, createStore, applyMiddleware, compose, Store }  from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import userReducer from './userReducer';

// const generalReducer = combineReducers({
//   userData: userReducer,
// });
// export type TGeneralReducer = typeof generalReducer;

// const __PRODUCTION__ = process.env.NODE_ENV === 'production';
// const __CLIENT__ = process.env.BROWSER;

// // @ts-ignore
// const composeEnhancers =(!__PRODUCTION__ && __CLIENT__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// // const makeStore = (context: Context) => createStore(generalReducer,composeEnhancers(thunkMiddleware));;
// const makeStore = (context: Context) => createStore(generalReducer);
// // @ts-ignore
// export const wrapper = createWrapper<Store<TGeneralReducer>>(makeStore, {debug: true});
// export an assembled wrapper
// export const wrapper = createWrapper<Store<State>>(makeStore, {debug: true});
// export const makeStore = (initialState: any) => createStore(generalReducer,composeEnhancers(initialState)); //Для подключения redux devtools chrome
// const makeStore = (initialState) => {
//   return createStore(reducer, initialState);
// };
// if (window) {
// @ts-ignore
//   window.state = store;
// }

// export default store

import { configureStore, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { Action } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { userReducer } from "./userReducer";

const makeStore = () =>
  configureStore({
    reducer: {
      [userReducer.name]: userReducer.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type TAppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  TAppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
