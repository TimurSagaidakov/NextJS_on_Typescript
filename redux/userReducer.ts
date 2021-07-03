// import firebase from 'firebase';
// import { getNotes } from './firebaseReducer';
import { TInferActions } from "./utils";

const LOGIN_IN_GOOGLE = 'LOGIN-IN-GOOGLE'

let initialState = {
  auth: false,
  userData: {
    userName: null,
    email: null,
    uid: null,
  },
  initialized: false,
}

const authReducer = (state= initialState, action: TActions ) =>{
  switch(action.type){
    case LOGIN_IN_GOOGLE:
      return {
        ...state,
        userData: action.payload,
        auth: true,
      }
    default:
      return state
  }}
  export const actions = {
    loginInGoogle: (userName: any,email: any,uid: any) =>({type: LOGIN_IN_GOOGLE, payload: {userName,email,uid}}),
  }
  type TActions = TInferActions<typeof actions>
// export const logout = () =>( {type: LOGOUT_GOOGLE})
// const initializeApp = () =>({type:INITIALIZED_APP})

// export const initializedApp = () =>(dispatch) =>{
//   firebase.auth().onAuthStateChanged(function(user) {                 // Получение данных пользователя 
//     if (user) {                                                       // Если пользователь залогинен,
//       dispatch(actions.loginInGoogle(user.displayName, user.email, user.uid)) // то получаем его данные 
//       let promise = dispatch(getNotes(store.getState().auth.userData.uid)) 
//       promise.then(()=>{
//       dispatch(initializeApp())                                       // и инициализируем приложение
//   })
//     } else {  
//       dispatch(initializeApp())                         //если пользователя нет, то сразу инициализируем приложение
//     }
//   });
  
// }

export default authReducer;