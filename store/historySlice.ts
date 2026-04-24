import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HistoryState {
  history: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: HistoryState = {
  history: [],
  status: 'idle',
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setHistory: (state, action: PayloadAction<any[]>) => {
      state.history = action.payload;
    },
    addHistoryEntry: (state, action: PayloadAction<any>) => {
      state.history.unshift(action.payload);
    },
  },
});

export const { setHistory, addHistoryEntry } = historySlice.actions;
export default historySlice.reducer;
