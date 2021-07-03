import  { combineReducers, createStore, applyMiddleware }  from 'redux';
import thunkMiddleware from 'redux-thunk';
import userReducer from './userReducer';

const generalReducer = combineReducers({
  userData: userReducer,
});
let store = createStore(generalReducer, applyMiddleware(thunkMiddleware));

type TGeneralReducer = typeof generalReducer;
// @ts-ignore
window.state = store;

export default store