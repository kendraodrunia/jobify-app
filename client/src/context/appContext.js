import React, { useReducer, useContext } from 'react';
import reducer from './reducer'
import axios from 'axios';

import { 
  DISPLAY_ALERT, 
  CLEAR_ALERT,    
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR
} from "./actions"

  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  const userLocation = localStorage.getItem('location')

 const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? user : null,
  token: token ? token : null,
  userLocation: userLocation ? userLocation: '',
  jobLocation: ''
};
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
    const clearAlert = () => {
      setTimeout(() => {
        dispatch({
          type: CLEAR_ALERT,
        });
      }, 3000);
    };

  const displayAlert = ()=>{
    dispatch({type: DISPLAY_ALERT})
    clearAlert()
  }

  const addUserToLocalStorage = ({ user, token, location }) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
  localStorage.setItem('location', location);
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('location');
};

  const registerUser = async (currentUser) => {
  dispatch({ type: REGISTER_USER_BEGIN });
  try {
    const response = await axios.post('/api/v1/auth/register', currentUser);
    console.log(response);
    const { user, token, location } = response.data;
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: {
        user,
        token,
        location,
      },
    });
    addUserToLocalStorage({
      user,
      token,
      location,
    });
    // will add later
    // addUserToLocalStorage({
    //   user,
    //   token,
    //   location,
    // })
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: REGISTER_USER_ERROR,
      payload: { message: error.response.data.message },
    });
  }
  clearAlert();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
const useAppContext = () => {
  return useContext(AppContext);
};

export {
  AppProvider, 
  initialState, 
  useAppContext 
};