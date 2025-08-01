import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import searchReducer from '../pages/search/searchSlice'
import contactReducer from '../components/contact/myContactsSlice';
import findContactReducer from '../components/contact/findContactsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    contact: contactReducer,
    findContact: findContactReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
