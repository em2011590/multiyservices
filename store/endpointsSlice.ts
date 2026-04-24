import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EndpointsState {
  endpoints: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: EndpointsState = {
  endpoints: [],
  status: 'idle',
};

const endpointsSlice = createSlice({
  name: 'endpoints',
  initialState,
  reducers: {
    setEndpoints: (state, action: PayloadAction<any[]>) => {
      state.endpoints = action.payload;
    },
    addEndpoint: (state, action: PayloadAction<any>) => {
      state.endpoints.push(action.payload);
    },
    removeEndpoint: (state, action: PayloadAction<string>) => {
      state.endpoints = state.endpoints.filter((e) => e._id !== action.payload);
    },
  },
});

export const { setEndpoints, addEndpoint, removeEndpoint } = endpointsSlice.actions;
export default endpointsSlice.reducer;
