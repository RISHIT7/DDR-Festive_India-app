import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { CartItem, Order, Experience } from './types';
import { MOCK_EXPERIENCES } from './services/api';

type AppState = {
  cart: CartItem[];
  orders: Order[];
  globalAlert: string | null;
  userPreferences: string[];
  theme: 'light' | 'dark' | 'festive';
};

type Action =
  | { type: 'ADD_TO_CART'; payload: { experience: Experience; slot: string; qty: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { experienceId: string; slot: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'PLACE_ORDER'; payload: Order }
  | { type: 'SET_GLOBAL_ALERT'; payload: string | null }
  | { type: 'SET_USER_PREFERENCES'; payload: string[] }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' | 'festive' };

const initialState: AppState = {
  cart: [],
  orders: [],
  globalAlert: null,
  userPreferences: [],
  theme: 'light', // Default theme, will be updated on mount
};

const AppReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.cart.findIndex(
        (item) => item.experience.id === action.payload.experience.id && item.slot === action.payload.slot
      );
      if (existingItemIndex > -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].qty += action.payload.qty;
        return { ...state, cart: updatedCart };
      }
      return { ...state, cart: [...state.cart, { ...action.payload }] };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(
          item => !(item.experience.id === action.payload.experienceId && item.slot === action.payload.slot)
        ),
      };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'PLACE_ORDER':
      return { ...state, orders: [...state.orders, action.payload] };

    case 'SET_GLOBAL_ALERT':
      // This is for admin alerts. We'll use a browser CustomEvent for simplicity.
      window.dispatchEvent(new CustomEvent('global-alert', { detail: { message: action.payload } }));
      return state; // No state change needed here
    
    case 'SET_USER_PREFERENCES':
        return { ...state, userPreferences: action.payload };
    
    case 'SET_THEME':
      return { ...state, theme: action.payload };

    default:
      return state;
  }
};

const AppStateContext = createContext<AppState>(initialState);
const AppDispatchContext = createContext<Dispatch<Action>>(() => null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // FIX: Replaced JSX with React.createElement to support .ts file extension.
  // The errors indicated that JSX syntax was not being parsed correctly.
  return React.createElement(
    AppStateContext.Provider,
    { value: state },
    React.createElement(
      AppDispatchContext.Provider,
      { value: dispatch },
      children
    )
  );
};

export const useStore = () => {
  return {
    state: useContext(AppStateContext),
    dispatch: useContext(AppDispatchContext),
  };
};