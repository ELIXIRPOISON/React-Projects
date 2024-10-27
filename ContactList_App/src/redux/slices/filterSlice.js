import { createSlice } from '@reduxjs/toolkit';
import { loadLocalStorage } from '../../utils/loadLocalStorage';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    contacts: loadLocalStorage(),
    filter: '',
  },
  reducers: {
    setFilter: (state, action) => {
      const { filter } = action.payload;
      state.filter = filter;
    },
  },
});

export default filterSlice.reducer;
export const { setFilter } = filterSlice.actions;
