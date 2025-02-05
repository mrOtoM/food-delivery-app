import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

import { getAddress } from '@/services/apiGeocoding';

interface Position {
  latitude?: number;
  longitude?: number;
}

const getPosition = () => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const fetchAddress = createAsyncThunk('user/fetchAdress', async function () {
  const positionObj = (await getPosition()) as GeolocationPosition;
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  const addressObj = await getAddress(position);

  let address = '';

  if (addressObj) {
    const { locality, city, postcode, countryName } = addressObj;
    if (locality && city && locality === city) {
      address = `${city} ${postcode}, ${countryName}`;
    } else {
      address = `${locality}, ${city} ${postcode}, ${countryName}`;
    }
  }

  return { position, address };
});

const initialState = {
  username: '',
  status: 'idle',
  position: {} as Position,
  address: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = 'idle';
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error = 'Problem s najdenim lokacie';
      });
  },
});

export const getUsername = (state: RootState) => state.user.username;

export const { updateName } = userSlice.actions;

export default userSlice.reducer;

