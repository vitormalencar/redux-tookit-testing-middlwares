import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchResultsRequest } from "./homeAPI";
import { Results } from "./types";
export interface HomeState {
  query: string;
  results: Results[];
  favorites: number[];
  status: "idle" | "loading" | "failed";
}

const initialState: HomeState = {
  query: "",
  results: [],
  favorites: [],
  status: "idle",
};

export const fetchResults = createAsyncThunk<
  Results[],
  string | undefined,
  { fulfilledMeta: { analytics: { category: string } } }
>("home/fetchResults", async (_, thunkAPI) => {
  try {
    const results = await fetchResultsRequest();
    return thunkAPI.fulfillWithValue(results, {
      analytics: { category: "HOME" },
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.status = "idle";
        state.results = action.payload;
      });
  },
});

export const { setSearchQuery, addFavorite, removeFavorite } = homeSlice.actions;

export default homeSlice.reducer;
