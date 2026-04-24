import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  profile: any | null;
  plan: 'free' | 'pro';
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
  profile: null,
  plan: 'free',
  status: 'idle',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.profile = action.payload;
      state.plan = action.payload.plan || 'free';
    },
    clearUser: (state) => {
      state.profile = null;
      state.plan = 'free';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
