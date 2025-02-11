import { createContext, useContext, useEffect, useReducer } from "react";

// Initial state: Load user, role, and token from localStorage if available
const initialState = {
  user: localStorage.getItem('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : null,
  role: localStorage.getItem('role') || null,
  token: localStorage.getItem('token') || null,
};

export const authContext = createContext(initialState);

// Reducer function to manage authentication state
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        role: null,
        token: null,
      };
    case "LOGIN_SUCCESS":
       // Store user details on successful login
      return {
        user:action.payload.user,
        token:action.payload.token,
        role:action.payload.role,
      };
    case "LOGOUT":
       // Clear authentication state on logout
      return {
        user: null,
        role: null,
        token: null,
      };
    default:
      return state;
  }
};

// Authentication Context Provider Component
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

   // Persist authentication state in localStorage on state updates
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
    localStorage.setItem('token', state.token);
    localStorage.setItem('role', state.role);
  },[state])

  return (
    <authContext.Provider
      value={{
        user: state.user,
        token: state.token,
        role: state.role,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
