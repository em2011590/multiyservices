import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AssetsState {
  assets: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: AssetsState = {
  assets: [],
  status: 'idle',
};

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    setAssets: (state, action: PayloadAction<any[]>) => {
      state.assets = action.payload;
    },
    addAsset: (state, action: PayloadAction<any>) => {
      state.assets.unshift(action.payload);
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      state.assets = state.assets.filter((a) => a._id !== action.payload);
    },
  },
});

export const { setAssets, addAsset, removeAsset } = assetsSlice.actions;
export default assetsSlice.reducer;
