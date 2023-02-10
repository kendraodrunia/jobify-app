import React, { useReducer, useContext } from 'react';
import reducer from './reducer'
import axios from 'axios';

import { 
  DISPLAY_ALERT, 
  CLEAR_ALERT,    
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER
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
  jobLocation: '',
  showSidebar: false,
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

  const setUpUser = async ({currentUser, endPoint, alertText}) => {
  dispatch({ type: SETUP_USER_BEGIN });
  try {
    const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser);
    const { user, token, location } = data;

    dispatch({
      type: SETUP_USER_SUCCESS,
      payload: { user, token, location, alertText },
    });

    addUserToLocalStorage({ user, token, location });
  } catch (error) {
    dispatch({
      type: SETUP_USER_ERROR,
      payload: { message: error.response.data.message },
    });
  }
  clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }


  const toggleSidebar= ()=>{
    dispatch({type: TOGGLE_SIDEBAR})
  }

  const updateUser = async (currentUser) => {
    console.log(currentUser)
  }
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setUpUser, 
        toggleSidebar,
        logoutUser,
        updateUser
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