import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {UserProfileState} from "./types"

const initialState: UserProfileState = {
  id:'',
  username: '',
  website: '',
  avatar_url: '',
  company: '',
  updated_at:'',
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserProfileState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearUserProfile: (state) => initialState,
  },
});

export const { setUserProfile, clearUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
