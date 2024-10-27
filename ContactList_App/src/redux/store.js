import { configureStore } from '@reduxjs/toolkit';
import contactsSlice from './slices/contactsSlice';
import filterSlice from './slices/filterSlice';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  contactsSlice,
  filterSlice,
});
export const store = configureStore({
  reducer: reducers,
});
