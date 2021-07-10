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
    image: '',
    auth: false,
    saveUrl: '',
  },

  reducers: {
    userData(state, action) {
          return {
            ...state,
            ...action.payload,
          };
    },
    saveUrl(state, action) {
      return {
        ...state,
        saveUrl: action.payload
      }
    },
    updateAvatar(state, action) {
      return {
        ...state,
        image: action.payload,
      }
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
  console.log(userDataRes);
  
  const { id, first_name: firstName, last_name: lastName, email, birthdate, image } = userDataRes;
  
  if (userDataRes) {
    dispatch(userReducer.actions.userData({id, firstName, lastName, email, birthdate, image, auth: true}));
  }
};

export const savePrevUrl = (url: string) => (dispatch:any) => {
  dispatch(userReducer.actions.saveUrl(url))
};

export const updateImage = (image: string) => (dispatch: any) => {
  dispatch(userReducer.actions.updateAvatar(image));
}
