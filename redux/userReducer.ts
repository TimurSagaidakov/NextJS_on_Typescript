// import firebase from 'firebase';
// import { getNotes } from './firebaseReducer';
import getUser from "../modules/get/getUser";
import { TInferActions } from "./utils";
import { createSlice } from '@reduxjs/toolkit';
import {createWrapper, HYDRATE} from 'next-redux-wrapper';

export const userReducer = createSlice({
  name: 'userData',

  initialState: {
    firstName: '',
    lastName: '',
    birthdate: '',
    email: '',
    id: null,
    auth: false,
  },

  reducers: {
    userData(state, action) {
          return {
            ...state,
            ...action.payload,
          };
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
        // console.log('HYDRATE', state, action.payload);
        return {
            ...state,
            ...action.payload.userData,
        };
    },
},
});

export const actions = {
  login: (
    id: number| null,
    firstName: string| null,
    lastName: string| null,
    email: string| null,
    birthdate: string | null
  ) => ({ payload: { id, firstName, lastName, email, birthdate } } as const),
};

export type TActions = TInferActions<typeof actions>;

export const userData = (cookie: any) => async (dispatch: any) => {
  const userDataRes = await getUser(cookie);
  const { id, firstName, lastName, email, birthdate } = userDataRes;
  
  if (userDataRes) {
    dispatch(userReducer.actions.userData({id, firstName, lastName, email, birthdate, auth: true}));
  }
};
